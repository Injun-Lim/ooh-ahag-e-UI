import React from "react";
import { TouchableOpacity, View, Text } from "react-native";

const Search = ({ navigation: { navigate } }) => (
  <TouchableOpacity
    onPress={() => navigate("Stack", { screen: "Three" })}
    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
  >
    <Text>Search</Text>
  </TouchableOpacity>
);

export default Search;
