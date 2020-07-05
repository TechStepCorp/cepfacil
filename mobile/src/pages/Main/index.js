import React, { useEffect, useState } from 'react';

import { StyleSheet, View, Text } from 'react-native';

import MapView, { Marker } from 'react-native-maps';

import { FAB, Portal, ActivityIndicator, Dialog } from 'react-native-paper';

import api from '../../services/api';

import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';

export default function Main() {
  const [currentRegion, setCurrentRegion] = useState(null);
  const [currentCep, setCurrentCep] = useState({});
  const [mapview, setMapview] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadInitialPosition() {
      await handleUserPosition();
    }

    loadInitialPosition();
  }, []);

  async function handleMapClick({ nativeEvent }) {
    setLoading(true);
    const { coordinate } = nativeEvent;

    const { latitude, longitude } = coordinate;

    const { data } = await api.get('/cep', {
      params: {
        latitude,
        longitude,
      },
    });

    setLoading(false);

    setCurrentCep(data);

    setCurrentRegion({
      latitude,
      longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  }

  function transformCep(cep) {
    if (cep) {
      return cep.slice(0, 5) + '-' + cep.slice(5);
    }
  }

  async function handleUserPosition() {
    setLoading(true);
    const { granted } = await requestPermissionsAsync();

    if (granted) {
      const { coords } = await getCurrentPositionAsync({
        enableHighAccuracy: true,
      });

      const { latitude, longitude } = coords;

      if (
        currentRegion &&
        currentRegion.latitude.toFixed(4) === latitude.toFixed(4) &&
        currentRegion.longitude.toFixed(4) === longitude.toFixed(4)
      ) {
        setLoading(false);

        if (mapview) {
          mapview.animateToRegion(
            {
              latitude,
              longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            },
            1000
          );
        }

        return;
      }

      const { data } = await api.get('/cep', {
        params: {
          latitude,
          longitude,
        },
      });

      if (mapview) {
        mapview.animateToRegion(
          {
            latitude,
            longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          },
          1000
        );
      }

      setLoading(false);

      setCurrentCep(data);

      setCurrentRegion({
        latitude,
        longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    }
  }

  if (!currentRegion)
    return (
      <ActivityIndicator
        style={{ flex: 1, justifyContent: 'center' }}
        animating={true}
        size='large'
      />
    );

  return (
    <View style={styles.container}>
      <MapView
        ref={(e) => setMapview(e)}
        onPress={handleMapClick}
        initialRegion={currentRegion}
        style={styles.map}
      >
        <Marker
          coordinate={{
            latitude: currentRegion.latitude,
            longitude: currentRegion.longitude,
          }}
        />
      </MapView>
      <View style={styles.cepContainer}>
        <View style={styles.cepWrapper}>
          <Text style={styles.cep}>{transformCep(currentCep.cep)}</Text>
        </View>
      </View>

      <Portal>
        <Dialog visible={loading}>
          <ActivityIndicator
            style={{ flex: 1, justifyContent: 'center' }}
            color={'#3598FE'}
            animating={true}
            size='large'
          />
        </Dialog>
      </Portal>

      <Portal>
        <FAB.Group
          visible={!loading}
          fabStyle={{ backgroundColor: '#655FFF' }}
          icon={'crosshairs-gps'}
          actions={[]}
          onStateChange={handleUserPosition}
        />
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,

    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  container: {
    flex: 1,
  },

  cepContainer: {
    position: 'absolute',

    bottom: 0,
    width: '100%',
    maxHeight: 100,
  },

  cepWrapper: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 'auto',
    marginRight: 'auto',

    backgroundColor: '#072B4F',

    width: 150,
    padding: 10,
    borderTopEndRadius: 5,
    borderTopLeftRadius: 5,

    justifyContent: 'center',
  },

  cep: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
