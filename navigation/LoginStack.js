import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, TouchableOpacity } from "react-native";
import Login from "../screens/Login";

const NativeStack = createNativeStackNavigator();

const LoginStack = () => (
  <NativeStack.Navigator screenOptions={{}}>
    <NativeStack.Screen name="Login" component={Login} />
  </NativeStack.Navigator>
);

export default LoginStack;
