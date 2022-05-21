import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/core";

export default function AroundMeScreen() {
  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [coords, setCoords] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        console.log(status);
        let response;
        if (status === "granted") {
          // console.log(response.data);
          const location = await Location.getCurrentPositionAsync();
          console.log(location);
          setLatitude(location.coords.latitude);
          response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around?latitude=${location.coords.latitude}&longitude=${location.coords.longitude}`
          );
        } else {
          response = await axios.get(
            `https://express-airbnb-api.herokuapp.com/rooms/around`
          );
        }

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: latitude ? latitude : 48.86,
          longitude: longitude ? longitude : 2.335,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
        showsUserLocation={true}
      >
        {data.map((marker, index) => {
          console.log(data);
          return (
            <MapView.Marker
              key={marker._id}
              coordinate={{
                latitude: marker.location[1],
                longitude: marker.location[0],
              }}
              onPress={() =>
                navigation.navigate(`RoomScreen`, { id: marker._id })
              }
            />
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
