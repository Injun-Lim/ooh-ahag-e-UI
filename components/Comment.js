import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import Poster from "./Poster";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text, View } from "react-native";
import { boardApi } from "./../utils/api";
import moment from "moment";

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

const TxtDeletedComment = styled.Text`
  font-size: 24px;
`;

const ReplyContainer = styled.View`
  padding-left: 5%;
  /* background-color: lightgray; */
`;

const ReplyElementContainer = styled.View`
  /* padding-left: 5%; */
`;

const HSeparator = styled.View`
  /* border-bottom-color: gray;
  border-bottom-width: 1px; */
  margin-bottom: 5px;
  margin-top: 5px;
`;

const Comment = ({
  memberId,
  overview,
  fullData,
  like,
  liked,
  createDate,
  commentId,
  parentId,
  userName,
  postId,
  childComment,
  deleteYN,
  onClickDeleteComment,
  onClickReplyComment,
}) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [replyText, setReplyText] = useState("");

  const onLikeTouched = async (commentId) => {
    setIsLiked(!isLiked);
    const tempLog = await boardApi.likeComments({
      id: commentId,
      likeFlag: isLiked,
    });

    console.log("(@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@)");
    console.log(JSON.stringify(tempLog));
    console.log("(@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@)");
  };

  const onPressDelete = async (commentId, postId) => {
    // PostDetail.js??? callback?????? API ??????
    onClickDeleteComment(commentId, postId);
  };

  const onReplyTouched = () => {
    // alert();
    onClickReplyComment(commentId, userName);
    childComment.map((item) => console.log(item));
  };

  const onChangeReplyText = (event) => {
    setReplyText(event);
  };

  return (
    <WholeContainer>
      {deleteYN === "Y" ? (
        <TxtDeletedComment>????????? ???????????????.</TxtDeletedComment>
      ) : (
        <>
          <TopContainer>
            <TxtNickname>
              {userName} {`(${moment(createDate).fromNow()})`}
              {/* TODO : ?????????????????? ?????? ?????? ?????? */}
            </TxtNickname>
            <BtnDeleteComment onPress={() => onPressDelete(commentId, postId)}>
              <Ionicons name="close-outline" size={14} color="black" />
            </BtnDeleteComment>
          </TopContainer>
          <TxtContents>{overview}</TxtContents>
          <BtnContainer>
            <BtnOpacity onPress={() => onLikeTouched(commentId)}>
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
              <Text>?????? ??????</Text>
            </BtnOpacity>
          </BtnContainer>
          {/* ????????? ?????? */}
          <ReplyContainer>
            {childComment.map((item) =>
              item.deleteYN === "Y" ? (
                <TxtDeletedComment>????????? ???????????????.</TxtDeletedComment>
              ) : (
                <ReplyElementContainer key={item.id}>
                  <HSeparator />
                  <TopContainer>
                    <TxtNickname>
                      {item.userName} {`(${moment(item.createDate).fromNow()})`}
                      {/* TODO : ?????????????????? ?????? ?????? ?????? */}
                    </TxtNickname>
                    <BtnDeleteComment
                      onPress={() => onPressDelete(item.id, postId)}
                    >
                      <Ionicons name="close-outline" size={14} color="black" />
                    </BtnDeleteComment>
                  </TopContainer>
                  <TxtContents>{item.content}</TxtContents>
                  <BtnContainer>
                    <BtnOpacity onPress={() => onLikeTouched(item.commentId)}>
                      {isLiked ? (
                        <Ionicons name="heart" size={14} color="black" />
                      ) : (
                        <Ionicons
                          name="heart-outline"
                          size={14}
                          color="black"
                        />
                      )}
                      <Text>
                        {/* TODO : ????????? ????????? ?????? ?????? */}
                        {isLiked ? item.likeCnt + 1 : item.likeCnt}
                        {`     `}
                      </Text>
                    </BtnOpacity>
                    <BtnOpacity onPress={onReplyTouched}>
                      <Text>?????? ??????</Text>
                    </BtnOpacity>
                  </BtnContainer>
                </ReplyElementContainer>
              )
            )}
          </ReplyContainer>
        </>
      )}
    </WholeContainer>
  );
};

export default Comment;
