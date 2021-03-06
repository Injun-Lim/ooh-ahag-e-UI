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

  //TODO : API로 통신하여 중복 체크 해야 함, 현재는 스트링 값에 "@" 있는지만 체크함 => API 적용중
  const checkEmailValid = () => {
    if (eMailText.toString().includes("@")) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  //TODO : 특수문자, 자릿수 체크해야함, 현재는 패스워드, 확인칸 값이 맞는지만 체크함
  const checkPasswordValid = () => {
    if (passText === passValidText && passText) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  //TODO : API로 통신하여 중복 체크 해야 함, 현재는 값 있는지만 체크함
  const checkNicknameValid = () => {
    if (nicknameText) {
      setNicknameValid(true);
    } else {
      setNicknameValid(false);
    }
  };

  const onPressSignUp = async () => {
    if (emailValid && passwordValid && nicknameValid) {
      //TODO : 회원가입 API 전송, 로그인 화면으로 화면 전환
      const tempLog = await signUpApi.signUp({
        userId: eMailText,
        pw: passText,
        name: nicknameText,
      });
      // alert(
      //   `valid OK 회원가입 성공\nuserid:${eMailText}, pw:${passText}, name:${nicknameText}`
      // );
      Alert.alert("회원가입성공 (title)", "회원가입성공 (message)", [
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
      alert("이메일을 확인하세요");
    } else if (!passwordValid) {
      alert("패스워드를 확인하세요");
    } else if (!nicknameValid) {
      alert("닉네임을 확인하세요");
    }
  };

  const onPressEMailValid = async () => {
    if (eMailText.toString().includes("@")) {
      //TODO : response의 success값 확인해서 valid ok해주기
      // const tempLog = await signUpApi.eMailValidCheck({
      //   userId: eMailText,
      // });
      // console.log(tempLog);

      // if(tempLog.success) {setEmailValid(true);}
      setEmailValid(true);
    } else {
      setEmailValid(false);
      alert("이메일 형식이 아닙니다.");
    }
  };

  useEffect(() => {}, []);

  return (
    <WholeContainer>
      <SocialText>이메일로 회원가입</SocialText>
      <Hr />
      <FormArea>
        <EMailValidBtnArea>
          <TxtInput70
            placeholder={"이메일"}
            onChangeText={onChangeEmail}
            value={eMailText}
            keyboardType={"email-address"}
            style={{ borderColor: emailValid ? "green" : "red" }}
            // onEndEditing={checkEmailValid}
            autoCapitalize={"none"}
          />

          <EMailValidBtn onPress={onPressEMailValid}>
            <BtnText>중복체크</BtnText>
          </EMailValidBtn>
        </EMailValidBtnArea>

        <TxtInput
          placeholder={"비밀번호 (현재 기본값 test)"}
          onChangeText={onChangePassword}
          value={passText}
          secureTextEntry
          style={{ borderColor: passwordValid ? "green" : "red" }}
          onEndEditing={checkPasswordValid}
          autoCapitalize={"none"}
        />
        <TxtInput
          placeholder={"비밀번호 확인"}
          onChangeText={onChangePasswordValid}
          value={passValidText}
          secureTextEntry
          style={{ borderColor: passwordValid ? "green" : "red" }}
          onEndEditing={checkPasswordValid}
          autoCapitalize={"none"}
        />
        <TxtInput
          placeholder={"닉네임"}
          onChangeText={onChangeNickname}
          value={nicknameText}
          onEndEditing={checkNicknameValid}
          style={{ borderColor: nicknameValid ? "green" : "red" }}
          autoCapitalize={"none"}
        />
      </FormArea>
      <SignUpBtnArea>
        <SignUpBtn onPress={onPressSignUp}>
          <BtnText>회원가입 하기</BtnText>
        </SignUpBtn>
      </SignUpBtnArea>
    </WholeContainer>
  );
};

export default SignUp;
