import { useNavigation } from "@react-navigation/core";
import {
  ImageBackground,
  Text,
  FlatList,
  ActivityIndicator,
  ScrollView,
  View,
  Button,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { React } from "react";

import { useState, useEffect } from "react";
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
    <View style={styles.homeView}>
      <FlatList
        style={styles.flatCards}
        data={data}
        keyExtractor={(elem) => elem._id}
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
                  <View>
                    <Text style={styles.flatTitle} numberOfLines={1}>
                      {item.title}
                    </Text>
                  </View>
                  <View style={styles.reviewContent}>
                    <View style={styles.reviewStarsAndReviews}>
                      <View style={styles.reviewStars}>
                        <Text>{reviews(item.ratingValue)}</Text>
                      </View>
                    </View>

                    <Text style={styles.reviews}>{item.reviews} reviews</Text>
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
              <Button
                title="See more Details"
                color="#FF385C"
                onPress={() =>
                  navigation.navigate("RoomScreen", { id: item._id })
                }
              />
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
    marginBottom: "20%",

    height: 300,
    width: "100%",
  },
  flatContent: {
    flexDirection: "row",
    height: "20%",
    marginBottom: 10,
  },

  flatTitle: {
    fontSize: 17,
    marginBottom: 10,
  },

  flatImageContent: {
    height: "80%",
    width: "100%",
  },
  imageCard: {
    height: "100%",
    width: "100%",
  },
  flatContentLeft: {
    width: "80%",
    marginLeft: 5,
  },
  priceContentCard: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
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
    textAlign: "center",
    textAlignVertical: "center",
    marginLeft: 5,
  },
  flatContentRight: {
    width: "20%",

    alignItems: "center",
    justifyContent: "center",
  },
  usernameImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});
