import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import MapView from "react-native-maps";

class ph {
  public remove() {
    return;
  }
}

export default function Map() {
  const [permission, setPermission] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject>({
    coords: {
      latitude: 0,
      longitude: 0,
      altitude: 0,
      accuracy: 0,
      altitudeAccuracy: 0,
      heading: 0,
      speed: 0,
    },
    timestamp: 0,
  });

  const [subsciption, setSubscription] =
    useState<Location.LocationSubscription>();

  useEffect(() => {
    const askPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status == "granted") {
        setPermission(true);
      } else {
        console.log("Permission denied!");
      }
    };
    askPermission();
  }, []);

  useEffect(() => {
    const getLocation = async () => {
      const subs: Location.LocationSubscription =
        await Location.watchPositionAsync(
          {},
          (locationData: Location.LocationObject) => {
            setLocation(locationData);
          }
        );
      setSubscription(subs);
    };
    getLocation();
    if (subsciption) {
      return () => {
        subsciption.remove();
      };
    }
  }, [permission]);

  return location.coords.longitude != null &&
    location.coords.latitude != null ? (
    <MapView
      showsTraffic={true}
      showsUserLocation={true}
      style={{ height: 400 }}
    ></MapView>
  ) : (
    <View>
      <Text>Permission denied</Text>
    </View>
  );
}
