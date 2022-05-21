import {
  Button,
  Text,
  TextInput,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import React, { useState } from "react";

// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [passwordConfirmationOK, setPasswordConfirmationOK] = useState(true);
  const [usernameFilled, setUsernameFilled] = useState(true);
  const [emailFilled, setEmailFilled] = useState(true);
  const [descFilled, setDescFilled] = useState(true);
  const [passwordFilled, setPasswordFilled] = useState(true);
  const [confirmPasswordFilled, setConfirmPasswordFilled] = useState(true);
  const [WronGEmailOrPassword, setWronGEmailOrPassword] = useState(true);
  const [errorMesage, setErrorMessage] = useState("");

  return (
    // <KeyboardAwareScrollView>
    <ScrollView style={styles.mainView}>
      <View style={styles.mainSection}>
        <View style={styles.mainContent1}>
          <View>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
          </View>
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
          {email.length < 1 && emailFilled === false && (
            <Text style={styles.warningtext}>Please provide a email</Text>
          )}

          <TextInput
            placeholder="username"
            style={styles.InputField}
            onChangeText={(text) => {
              setUsername(text);
            }}
            value={username}
          />
          {username.length < 1 && usernameFilled === false && (
            <Text style={styles.warningtext}>Please provide a username</Text>
          )}

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
          {description.length < 1 && descFilled === false && (
            <Text style={styles.warningtext}>Please provide a description</Text>
          )}
          <TextInput
            placeholder="Password"
            style={styles.InputField}
            // secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
            }}
            value={password}
          />
          {password.length < 1 && passwordFilled === false && (
            <Text style={styles.warningtext}>Please provide a password</Text>
          )}
          <TextInput
            placeholder="Confirm your Password"
            style={styles.InputField}
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
            value={confirmpassword}
          />
          {confirmpassword.length < 1 && confirmPasswordFilled === false && (
            <Text style={styles.warningtext}>
              Please provide the confirmation
            </Text>
          )}

          {passwordConfirmationOK === false && (
            <Text style={styles.warningPassword}>
              Your password and the confirmation password are not the same.
              Please try again.
            </Text>
          )}
          {WronGEmailOrPassword === true && (
            <Text style={styles.warningtext}>{errorMesage}</Text>
          )}
        </View>
        <View style={styles.mainContent3}>
          {/* <Text>Sign In </Text> */}
          <TouchableOpacity
            title="Sign up"
            onPress={async () => {
              email.length === 0 && setEmailFilled(false);
              username.length === 0 && setUsernameFilled(false);
              description.length === 0 && setDescFilled(false);
              password.length === 0 && setPasswordFilled(false);
              confirmpassword.length === 0 && setConfirmPasswordFilled(false);
              if (
                email.length !== 0 &&
                username.length !== 0 &&
                description.length !== 0 &&
                password.length !== 0 &&
                confirmpassword.length !== 0
              ) {
                if (confirmpassword !== password) {
                  setPasswordConfirmationOK(false);
                } else {
                  const fetchData = async () => {
                    try {
                      const response = await axios.post(
                        "https://express-airbnb-api.herokuapp.com/user/sign_up",
                        {
                          username: username,
                          email: email,
                          description: description,
                          password: email,
                          confirmpassword: confirmpassword,
                        }
                      );
                      // console.log(response.data);
                      setPasswordConfirmationOK(true);
                      setErrorMessage("");
                      const userToken = "secret-token";
                      setToken(userToken);
                      alert("Vous êtes connectés");
                    } catch (error) {
                      console.log(error.response);
                      console.log(error.message);
                      alert("Error");
                      setWronGEmailOrPassword(true);
                      setErrorMessage(error.response.data.error);
                    }
                  };
                  fetchData();
                }
              }
            }}
            style={styles.submitButton}
          >
            <Text>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={styles.registerLink}>
              Already an account ? Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    // </KeyboardAwareScrollView>
  );
}

// { width: 100, height: 100 }
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
