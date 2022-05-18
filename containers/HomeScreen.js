import { useNavigation } from "@react-navigation/core";
import {
  ImageBackground,
  Text,
  FlatList,
  ScrollView,
  View,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { AntDesign } from "@expo/vector-icons";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        // console.log(response.data);

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
    console.log(ratingValue);
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
    <Text>En chargement</Text>
  ) : (
    <View style={styles.homeView}>
      <FlatList
        style={styles.flatCards}
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={styles.flatCard}>
              <View style={styles.flatImageContent}>
                <ImageBackground
                  source={{
                    uri: item.photos[0].url,
                  }}
                  alt={item.title}
                  style={styles.imageCard}
                  resizeMode="cover"
                >
                  <View style={styles.priceContentCard}>
                    <Text style={styles.priceCard}>{item.price} €</Text>
                  </View>
                </ImageBackground>
              </View>
              <View style={styles.flatContent}>
                <View style={styles.flatContentLeft}>
                  <View style={styles.flatContentTitle}>
                    <Text style={styles.flatTitle} numberOfLines={1}>
                      {item.title}
                    </Text>
                  </View>
                  <View style={styles.reviewContent}>
                    <View style={styles.reviewStarsAndReviews}>
                      <View style={styles.reviewStars}>
                        {/* <AntDesign name="star" size={24} color="black" />
                        <AntDesign name="staro" size={24} color="black" /> */}
                        <Text>{reviews(item.ratingValue)}</Text>
                      </View>
                      <Text style={styles.ratingValue}>{item.ratingValue}</Text>
                    </View>

                    <Text style={styles.reviews}>{item.reviews}</Text>
                  </View>
                </View>
                <View style={styles.flatContentRight}>
                  <Image
                    source={{
                      uri: item.user.account.photo.url,
                    }}
                    style={styles.usernameImage}
                    // alt={item.title}
                    resizeMode="cover"
                  ></Image>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  homeView: { flex: 1 },
  flatCards: { flex: 1 },
  flatCard: {
    borderColor: "green",
    marginBottom: "20%",
    borderWidth: 5,
    height: 300,
    width: "100%",
  },
  flatContent: {
    flexDirection: "row",
    height: "20%",
  },
  flatContentTitle: {
    borderWidth: 5,
    borderColor: "red",
  },
  flatTitle: {
    fontSize: 14,
  },

  flatImageContent: {
    height: "80%",
    width: "100%",
    borderWidth: 5,
    borderColor: "yellow",
  },
  imageCard: {
    height: "100%",
    width: "100%",
  },
  flatContentLeft: {
    borderColor: "blue",
    width: "80%",
    borderWidth: 5,
  },
  priceContentCard: {
    height: 40,
    justifyContent: "center",
    alignItems: "flex-center",
    width: "20%",
    top: "50%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  priceCard: { color: "white" },
  reviewContent: {
    flexDirection: "row",
  },
  reviewStarsAndReviews: {
    flexDirection: "row",
  },
  reviewStars: {
    flexDirection: "row",
  },
  ratingValue: {
    marginRight: 5,
  },
  reviews: {
    color: "grey",
  },
  flatContentRight: {
    borderColor: "black",
    width: "20%",
    borderWidth: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  usernameImage: {
    borderRadius: 50,
    height: "100%",
    width: 50,
  },
});
