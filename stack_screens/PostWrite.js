import React, { useEffect, useState } from "react";
import { Text, Alert } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { postApi } from "../utils/api";
import { useQueryClient } from "react-query";

const WholeContainer = styled.View`
  flex: 1;
  background-color: white;
  padding-left: 10%;
  padding-right: 10%;
  justify-content: center;
`;

const TxtTitle = styled.TextInput`
  border-width: 1px;
  border-color: gray;
  width: 100%;
  height: 40px;
  padding-left: 5px;
  padding-right: 5px;
  margin-bottom: 20px;
`;

const TxtInput = styled.TextInput`
  border-width: 1px;
  border-color: gray;
  width: 100%;
  height: 160px;
  padding-left: 5px;
  padding-right: 5px;
  margin-bottom: 20px;
`;

const FormArea = styled.View`
  width: 100%;
  flex: 0.5;
`;

const BtnBoardSelect = styled.TouchableOpacity`
  align-items: center;
  margin-bottom: 15px;
`;

const TxtBoardSelect = styled.Text`
  text-align: center;
  font-size: 20px;
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

const BoardSelectContainer = styled.View`
  flex: 0.1;
  width: 100%;
  border-color: black;
`;

const PostWrite = ({ navigation: { navigate } }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postContents, setPostContents] = useState("");
  // const [boardSelect, setBoardSelect] = useState("");
  // const [boardIndex, setBoardIndex] = useState("");

  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const onChangePostTitle = (event) => {
    setPostTitle(event);
  };
  const onPostContent = (event) => {
    setPostContents(event);
  };

  const onPressWrite = async () => {
    if (postTitle && postContents) {
      const tempLog = await postApi.writePost({
        title: postTitle,
        content: postContents,
      });

      console.log("(@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@)");
      console.log(JSON.stringify(tempLog));
      console.log("(@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@)");

      if (tempLog.data.success === true) {
        Alert.alert(
          "??? ?????? ??????",
          `??????:${postTitle} \n??????:${postContents}`,
          [
            {
              text: "OK",
              onPress: async () => {
                await queryClient.refetchQueries(["postListData"]);
                navigation.navigate("Tabs", {
                  screen: "Home",
                  // params: { ...fullData, postLike, postLikeCnt, postCommentCnt },
                });
              },
            },
          ]
        );
      } else {
        Alert.alert("????????? ??????", `??????:${postTitle} \n??????:${postContents}`);
      }
      console.log("================================================");
      console.log(tempLog);
      console.log("================================================");
    } else if (!postTitle) {
      alert("????????? ???????????????.");
    } else if (!postContents) {
      alert("????????? ???????????????.");
    }
  };

  //TODO : ?????? ????????? ?????? ?????? ????????? ?????? API??? ????????????, ????????? ???????????????(boardSelect)
  useEffect(() => {}, []);

  // const onChangeBoard = (itemValue, itemIndex) => {
  //   setBoardSelect(itemValue);
  //   setBoardIndex(itemIndex);
  // };

  return (
    <WholeContainer>
      <TxtTitle
        placeholder={"??? ??????"}
        onChangeText={onChangePostTitle}
        value={postTitle}
        autoCapitalize={"none"}
        autoCorrect={false}
      />
      <Hr />
      <FormArea>
        <TxtInput
          placeholder={"??? ??????"}
          onChangeText={onPostContent}
          value={postContents}
          autoCapitalize={"none"}
          multiline={true}
          autoCorrect={false}
        />
      </FormArea>
      <SignUpBtnArea>
        <SignUpBtn onPress={onPressWrite}>
          <Text>??? ??????</Text>
        </SignUpBtn>
      </SignUpBtnArea>
    </WholeContainer>
  );
};

export default PostWrite;
