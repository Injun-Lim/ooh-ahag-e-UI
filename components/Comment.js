import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import Poster from "./Poster";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text, View } from "react-native";
import { boardApi } from "./../utils/api";

const WholeContainer = styled.View`
  padding-left: 5%;
  padding-right: 5%;
`;
const TopContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const BtnDeleteComment = styled.TouchableOpacity`
  align-items: center;
`;
const TxtNickname = styled.Text`
  font-size: 14px;
`;
const TxtContents = styled.Text`
  font-size: 18px;
`;
const BtnOpacity = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  /* justify-content: center; */
  /* justify-content: space-between; */
`;

const BtnContainer = styled.View`
  flex-direction: row;
`;

const ReplyInputBox = styled.TextInput`
  font-size: 20px;
  /* border-width: 1px;
  border-color: gray; */
  width: 85%;
  height: 10%;
`;

const Comment = ({
  memberId,
  overview,
  fullData,
  like,
  liked,
  createDate,
  comment_id,
  parentId,
  userName,
}) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [replyText, setReplyText] = useState("");

  const onLikeTouched = async () => {
    setIsLiked(!isLiked);
    const tempLog = await boardApi.likeComments({
      id: comment_id,
      likeFlag: isLiked,
    });

    console.log("(@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@)");
    console.log(JSON.stringify(tempLog));
    console.log("(@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@)");
  };

  const onPressDelete = async () => {
    //TODO : API 문서 수정되면 API 수정해야함
    const tempLog = await boardApi.deleteComments({
      id: comment_id,
    });

    console.log("(@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@)");
    console.log(JSON.stringify(tempLog));
    console.log("(@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@)");
  };

  const onReplyTouched = () => {
    alert("답글 달기 이벤트");
  };

  const onChangeReplyText = (event) => {
    setReplyText(event);
  };

  return (
    <WholeContainer>
      <TopContainer>
        <TxtNickname>
          {userName} {`(${createDate})`}
          {/* TODO : 조회시점부터 지난 시간 표시 */}
        </TxtNickname>
        <BtnDeleteComment onPress={onPressDelete}>
          <Ionicons name="close-outline" size={14} color="black" />
        </BtnDeleteComment>
      </TopContainer>
      <TxtContents>{overview}</TxtContents>
      <BtnContainer>
        <BtnOpacity onPress={onLikeTouched}>
          {isLiked ? (
            <Ionicons name="heart" size={14} color="black" />
          ) : (
            <Ionicons name="heart-outline" size={14} color="black" />
          )}
          <Text>
            {isLiked ? like + 1 : like}
            {`     `}
          </Text>
        </BtnOpacity>
        <BtnOpacity onPress={onReplyTouched}>
          <Text>답글 달기</Text>
        </BtnOpacity>
      </BtnContainer>
      {/* 대댓글 부분 */}
      {parentId !== 0 ? (
        <>
          <TxtNickname>
            {userName} {`(${createDate})`}
            {/* TODO : 조회시점부터 지난 시간 표시 */}
          </TxtNickname>
          <TxtContents>{overview}</TxtContents>
          <BtnContainer>
            <BtnOpacity onPress={onLikeTouched}>
              {isLiked ? (
                <Ionicons name="heart" size={14} color="black" />
              ) : (
                <Ionicons name="heart-outline" size={14} color="black" />
              )}
              <Text>
                {isLiked ? like + 1 : like}
                {`     `}
              </Text>
            </BtnOpacity>
            <BtnOpacity onPress={onReplyTouched}>
              <Text>답글 달기</Text>
            </BtnOpacity>
          </BtnContainer>
        </>
      ) : null}
    </WholeContainer>
  );
};

export default Comment;
