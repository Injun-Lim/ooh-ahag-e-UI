import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Button,
  Image,
  Alert,
} from "react-native";
import styled from "styled-components/native";
import { DARKGREY_COLOR } from "../color";
import { Ionicons } from "@expo/vector-icons";
import { signUpApi } from "./../utils/api";
import { useNavigation } from "@react-navigation/native";

const WholeContainer = styled.View`
  flex: 1;
  background-color: white;
  padding-left: 10%;
  padding-right: 10%;
  justify-content: center;
`;

const TxtInput = styled.TextInput`
  border-width: 1px;
  border-color: gray;
  width: 100%;
  height: 40px;
  padding-left: 5px;
  padding-right: 5px;
  margin-bottom: 20px;
`;

const TxtInput70 = styled(TxtInput)`
  width: 70%;
`;

const FormArea = styled.View`
  width: 100%;
  flex: 0.5;
`;

const SocialText = styled.Text`
  text-align: center;
  font-size: 30px;
  margin-bottom: 15px;
`;

const Hr = styled.View`
  border-bottom-color: black;
  border-bottom-width: 1px;
  margin-bottom: 15px;
`;

const SignUpBtnArea = styled.View`
  width: 100%;
  flex: 0.1;
`;

const SignUpBtn = styled.TouchableOpacity`
  background-color: #46c3ad;
  width: 100%;
  height: 40px;
  justify-content: center;
  align-items: center;
`;
const BtnText = styled.Text`
  color: white;
`;

const EMailValidBtnArea = styled.View`
  /* align-items: flex-end; */
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
`;
const EMailValidBtn = styled(SignUpBtn)`
  width: 25%;
`;

const SignUp = ({ navigation: { navigate } }) => {
  const [eMailText, setEMailText] = useState("");
  const [passText, setPassText] = useState("test");
  const [passValidText, setPassValidText] = useState("test");
  const [nicknameText, setnicknameText] = useState("test");

  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [nicknameValid, setNicknameValid] = useState(false);

  const navigation = useNavigation();

  const onChangeEmail = (event) => {
    setEmailValid(false);
    setEMailText(event);
  };
  const onChangePassword = (event) => {
    setPasswordValid(false);
    setPassText(event);
  };
  const onChangePasswordValid = (event) => {
    setPasswordValid(false);
    setPassValidText(event);
  };
  const onChangeNickname = (event) => {
    setNicknameValid(false);
    setnicknameText(event);
  };

  //TODO : API??? ???????????? ?????? ?????? ?????? ???, ????????? ????????? ?????? "@" ???????????? ????????? => API ?????????
  const checkEmailValid = () => {
    if (eMailText.toString().includes("@")) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  //TODO : ????????????, ????????? ???????????????, ????????? ????????????, ????????? ?????? ???????????? ?????????
  const checkPasswordValid = () => {
    if (passText === passValidText && passText) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  //TODO : API??? ???????????? ?????? ?????? ?????? ???, ????????? ??? ???????????? ?????????
  const checkNicknameValid = () => {
    if (nicknameText) {
      setNicknameValid(true);
    } else {
      setNicknameValid(false);
    }
  };

  const onPressSignUp = async () => {
    if (emailValid && passwordValid && nicknameValid) {
      //TODO : ???????????? API ??????, ????????? ???????????? ?????? ??????
      const tempLog = await signUpApi.signUp({
        userId: eMailText,
        pw: passText,
        name: nicknameText,
      });
      // alert(
      //   `valid OK ???????????? ??????\nuserid:${eMailText}, pw:${passText}, name:${nicknameText}`
      // );
      Alert.alert("?????????????????? (title)", "?????????????????? (message)", [
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("LoginStack", {
              screen: "Login",
              // params: { ...fullData, postLike, postLikeCnt, postCommentCnt },
            });
          },
        },
      ]);
      console.log("================================================");
      console.log(tempLog);
      console.log("================================================");
    } else if (!emailValid) {
      alert("???????????? ???????????????");
    } else if (!passwordValid) {
      alert("??????????????? ???????????????");
    } else if (!nicknameValid) {
      alert("???????????? ???????????????");
    }
  };

  const onPressEMailValid = async () => {
    if (eMailText.toString().includes("@")) {
      //TODO : response??? success??? ???????????? valid ok?????????
      // const tempLog = await signUpApi.eMailValidCheck({
      //   userId: eMailText,
      // });
      // console.log(tempLog);

      // if(tempLog.success) {setEmailValid(true);}
      setEmailValid(true);
    } else {
      setEmailValid(false);
      alert("????????? ????????? ????????????.");
    }
  };

  useEffect(() => {}, []);

  return (
    <WholeContainer>
      <SocialText>???????????? ????????????</SocialText>
      <Hr />
      <FormArea>
        <EMailValidBtnArea>
          <TxtInput70
            placeholder={"?????????"}
            onChangeText={onChangeEmail}
            value={eMailText}
            keyboardType={"email-address"}
            style={{ borderColor: emailValid ? "green" : "red" }}
            // onEndEditing={checkEmailValid}
            autoCapitalize={"none"}
          />

          <EMailValidBtn onPress={onPressEMailValid}>
            <BtnText>????????????</BtnText>
          </EMailValidBtn>
        </EMailValidBtnArea>

        <TxtInput
          placeholder={"???????????? (?????? ????????? test)"}
          onChangeText={onChangePassword}
          value={passText}
          secureTextEntry
          style={{ borderColor: passwordValid ? "green" : "red" }}
          onEndEditing={checkPasswordValid}
          autoCapitalize={"none"}
        />
        <TxtInput
          placeholder={"???????????? ??????"}
          onChangeText={onChangePasswordValid}
          value={passValidText}
          secureTextEntry
          style={{ borderColor: passwordValid ? "green" : "red" }}
          onEndEditing={checkPasswordValid}
          autoCapitalize={"none"}
        />
        <TxtInput
          placeholder={"?????????"}
          onChangeText={onChangeNickname}
          value={nicknameText}
          onEndEditing={checkNicknameValid}
          style={{ borderColor: nicknameValid ? "green" : "red" }}
          autoCapitalize={"none"}
        />
      </FormArea>
      <SignUpBtnArea>
        <SignUpBtn onPress={onPressSignUp}>
          <BtnText>???????????? ??????</BtnText>
        </SignUpBtn>
      </SignUpBtnArea>
    </WholeContainer>
  );
};

export default SignUp;
