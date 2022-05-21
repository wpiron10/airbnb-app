import { useNavigation, useRoute } from "@react-navigation/core";

import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  ScrollView,
  ImageBackground,
  FlatList,
  Button,
} from "react-native";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default function RoomScreen({ route }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lineNumber, setLineNumber] = useState(3);

  const { params } = useRoute();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${params.id}`
        );
        console.log(response.data);

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const reviews = (ratingValue) => {
    // console.log(ratingValue);
    const reviewTab = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= ratingValue) {
        reviewTab.push(
          <AntDesign name="star" size={24} color="black" key={i} />
        );
      } else {
        reviewTab.push(
          <AntDesign name="staro" size={24} color="black" key={i} />
        );
      }
    }

    return reviewTab;
  };

  return isLoading ? (
    <ActivityIndicator />
  ) : (
    <View style={styles.container}>
      <ScrollView>
        <FlatList
          horizontal={true}
          data={data.photos}
          keyExtractor={(elem) => elem._id}
          renderItem={({ item }) => {
            return (
              <View>
                <View style={styles.scrollViewImage}>
                  <Image style={styles.imageCard} source={{ uri: item.url }} />
                </View>
              </View>
            );
          }}
        />

        <View style={styles.priceContentCard}>
          <Text style={styles.priceCard}>{data?.price} €</Text>
        </View>

        <View style={styles.flatContent}>
          <View style={styles.flatContentLeft}>
            <View style={styles.flatContentTitle}>
              <Text style={styles.flatTitle} numberOfLines={1}>
                {data.title}
              </Text>
            </View>
            <View style={styles.reviewContent}>
              <View style={styles.reviewStarsAndReviews}>
                <View style={styles.reviewStars}>
                  <Text>{reviews(data.ratingValue)} </Text>
                </View>
              </View>

              <Text style={styles.reviews}>{data.reviews} reviews</Text>
            </View>
          </View>
          <View style={styles.flatContentRight}></View>
          <Text numberOfLines={lineNumber} style={styles.flatContentDesc}>
            {data.description}
          </Text>
          {lineNumber === 3 ? (
            <Text
              onPress={() => {
                setLineNumber(6);
              }}
              style={styles.flatContentShowAndHideDesc}
            >
              Show More ▼
            </Text>
          ) : (
            <Text
              onPress={() => {
                setLineNumber(3);
              }}
              style={styles.flatContentShowAndHideDesc}
            >
              Show Less ▲
            </Text>
          )}
        </View>
        <Button title="Rent it" color="#FF385C" />
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: data.location[1],
            longitude: data.location[0],
            latitudeDelta: 0.08,
            longitudeDelta: 0.08,
          }}
        >
          <MapView.Marker
            key={data.id}
            coordinate={{
              latitude: data.location[1],
              longitude: data.location[0],
            }}
          ></MapView.Marker>
        </MapView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  flatTitle: {
    fontSize: 17,
    marginBottom: 5,
  },

  imageCard: {
    height: 400,
    width: 400,
  },
  flatContentLeft: {
    marginLeft: 5,
  },
  reviews: {
    color: "grey",
    textAlign: "center",
    textAlignVertical: "center",
  },
  priceContentCard: {
    height: 40,
    justifyContent: "center",
    alignItems: "flex-center",
    width: "20%",
    top: "20%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  priceCard: { color: "white" },
  reviewContent: {
    flexDirection: "row",
  },
  flatContentDesc: { textAlign: "justify", padding: 5, marginBottom: 5 },
  flatContentShowAndHideDesc: {
    color: "grey",
    textDecorationLine: "underline",
    marginLeft: 5,
    marginBottom: 20,
  },
  map: {
    marginTop: 20,
    width: "100%",
    height: 300,
  },
});
