import { useRoute } from "@react-navigation/core";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Button } from "react-native-paper";
import React, { useState } from "react";

export default function ProfileScreen() {
  const { params } = useRoute();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  return (
    <View style={styles.mainView}>
      <View style={styles.mainSection}>
        <View style={styles.mainContent1}>
          <Text style={styles.mainTitle}>Sign Up </Text>
        </View>
        <View style={styles.mainContent2}>
          <TextInput
            placeholder="Email"
            style={styles.InputField}
            onChangeText={(text) => {
              setEmail(text);
            }}
            value={email}
          />

          <TextInput
            placeholder="username"
            style={styles.InputField}
            onChangeText={(text) => {
              setUsername(text);
            }}
            value={username}
          />

          <TextInput
            placeholder="Describe yourself in a few words..."
            style={styles.InputFieldDesc}
            multiline
            numberOfLines={3}
            maxLength={50}
            onChangeText={(text) => {
              setDescription(text);
            }}
            value={description}
          />

          <TextInput
            placeholder="Password"
            style={styles.InputField}
            // secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
            value={password}
          />

          <TextInput
            placeholder="Confirm your Password"
            style={styles.InputField}
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
            value={confirmpassword}
          />
        </View>
        <View style={styles.mainContent3}>
          <TouchableOpacity title="Sign up" style={styles.submitButton}>
            <Text>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainView: {
    height: "100%",
    width: "100%",
  },
  mainSection: {
    height: "100%",
    width: "100%",

    alignItems: "center",
    marginBottom: "10%",
    backgroundColor: "white",
  },
  mainTitle: {
    marginTop: 10,
    fontSize: 20,
  },

  mainContent1: {
    width: "100%",
    height: "20%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  mainContent2: {
    width: "100%",
    padding: 5,
    height: "55%",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContent3: {
    width: "100%",

    height: "15%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },

  logo: { width: 100, height: 100 },
  InputField: {
    color: "grey",
    height: "15%",
    padding: 5,
    width: "80%",
    lineHeight: 1,
    borderBottomColor: "#FF385C",
    borderBottomWidth: 1,
  },
  InputFieldDesc: {
    color: "grey",
    height: "30%",
    marginTop: 10,

    width: "80%",

    borderColor: "#FF385C",
    borderWidth: 1,
  },

  submitButton: {
    width: 200,
    borderWidth: 3,
    borderRadius: 30,
    height: 50,
    borderColor: "#FF385C",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  registerLink: {
    color: "grey",
  },
  warningtext: {
    color: "red",
  },
  warningPassword: { color: "red", fontSize: 10 },
});
