import { useNavigation } from "@react-navigation/core";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import React, { useState, useEffect } from "react";

import axios from "axios";

import {
  Button,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [emailFilled, setEmailFilled] = useState(true);
  const [passwordFilled, setPasswordFilled] = useState(true);
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [WronGEmailOrPassword, setWronGEmailOrPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);

  return (
    <View>
      <View style={styles.mainSection}>
        <View style={styles.mainContent1}>
          <View style={styles.Content1}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
            <Text style={styles.mainTitle}>Sign In</Text>
          </View>
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
          {email.length < 1 && emailFilled === false && (
            <Text style={styles.warningtext}>Please fill an email</Text>
          )}

          <TextInput
            placeholder="Password"
            secureTextEntry={passwordVisible}
            style={styles.InputField}
            onChangeText={(text) => {
              setPassword(text);
            }}
            value={password}
          />
          <Text
            onPress={() =>
              passwordVisible === true
                ? setPasswordVisible(false)
                : setPasswordVisible(true)
            }
          >
            👁️
          </Text>
        </View>
        {password.length < 1 && passwordFilled === false && (
          <Text style={styles.warningtext}>Please fill a password</Text>
        )}
        {WronGEmailOrPassword === true && (
          <Text style={styles.warningtext}>
            Your email/password is not correct. Please try again.
          </Text>
        )}
        <View style={styles.mainContent3}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={async () => {
              // username.length === 0 && setUsernameFilled(false);
              // password.length === 0 && setPasswordFilled(false);

              if (email.length !== 0 && password.length !== 0) {
                const fetchData = async () => {
                  try {
                    const response = await axios.post(
                      "https://express-airbnb-api.herokuapp.com/user/log_in",
                      {
                        email: email,
                        password: password,
                      }
                    );
                    console.log(response.data);
                    setData(response.data);
                    const userToken = response.data.token;
                    setToken(userToken);
                    alert("Vous êtes connectés");
                  } catch (error) {
                    console.log(error.response);
                    console.log(error.message);
                    setWronGEmailOrPassword(true);
                    // contrairement au error.message d'express
                  }
                };
                fetchData();
              }
            }}
          >
            <Text style={styles.registerLink}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              {
                navigation.navigate("SignUp");
              }
            }}
          >
            <Text style={styles.registerLink}>No account ? Register </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    height: "40%",

    justifyContent: "center",
    alignItems: "center",
  },
  Content1: {
    justifyContent: "center",
    alignItems: "center",
  },
  mainContent2: {
    width: "100%",

    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContent3: {
    width: "100%",

    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  warningtext: {
    color: "red",
  },
  logo: { width: 100, height: 100 },
  InputField: {
    color: "grey",
    height: "30%",
    marginBottom: 1,
    paddingHorizontal: 5,
    marginTop: 10,
    width: "80%",
    lineHeight: 1,
    borderBottomColor: "#FF385C",
    borderBottomWidth: 1,
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
});
