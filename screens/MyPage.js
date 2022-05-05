import React, { useState, useEffect } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styled from "styled-components/native";
import { myPageApi } from "./../utils/api";
import Alert from "./Alert";

const LogoutBtn = styled.Text`
  color: white;
`;

const MyPage = ({ navigation: { navigate } }) => {
  const [sessionData, setSessionData] = useState({});

  const getSession = async () => {
    const res = await myPageApi.getSession();
    setSessionData(res.data);
    console.log("session@@@@@@@@@@@@@@@@@@@@@@");
    console.log(sessionData);
    console.log("session@@@@@@@@@@@@@@@@@@@@@@");
  };

  const onLogOutBtn = async () => {
    const res = await myPageApi.logout({ sessionId: sessionData.sessionId });

    console.log("logout@@@@@@@@@@@@@@@@@@@@@@");
    console.log(res.data.success);
    console.log("logout@@@@@@@@@@@@@@@@@@@@@@");
    if (res.data.success) {
      alert(
        `로그아웃 되었습니다.\nID : ${sessionData.userId}\nSESSIONID : ${sessionData.sessionId}`
      );
      // navigate("LoginStack", { screen: "Login" });
    } else {
      alert("로그아웃 실패;");
    }
  };

  useEffect(() => {
    getSession();
  }, []);
  return (
    <>
      <LogoutBtn>createTime : {sessionData.createTime}</LogoutBtn>
      <LogoutBtn>lastAccessTime : {sessionData.lastAccessTime}</LogoutBtn>
      <LogoutBtn>sessionId : {sessionData.sessionId}</LogoutBtn>
      <LogoutBtn>userId : {sessionData.userId}</LogoutBtn>
      <TouchableOpacity
        // onPress={() => navigate("Stack", { screen: "Two" })}
        onPress={onLogOutBtn}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <LogoutBtn>로그아웃 하기</LogoutBtn>
      </TouchableOpacity>
    </>
  );
};

export default MyPage;
