import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";

export default function Logo() {
  return <Image source={require("../assets/logo.png")} style={styles.logo} />;
}

const styles = StyleSheet.create({
  logo: {
    height: 35,
    width: 35,
  },
});
