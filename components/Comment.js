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
const TxtNickname = styled.Text`
  font-size: 14px;
`;
const TxtContents = styled.Text`
  font-size: 18px;
`;
const BtnLike = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  /* justify-content: center; */
  /* justify-content: space-between; */
`;

const Comment = ({
  title,
  overview,
  fullData,
  like,
  liked,
  createDate,
  comment_id,
}) => {
  const [isLiked, setIsLiked] = useState(liked);

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
  return (
    <WholeContainer>
      <TxtNickname>
        {title} {createDate}
      </TxtNickname>
      <TxtContents>{overview}</TxtContents>
      <BtnLike onPress={onLikeTouched}>
        {isLiked ? (
          <Ionicons name="heart" size={14} color="black" />
        ) : (
          <Ionicons name="heart-outline" size={14} color="black" />
        )}
        <Text>{isLiked ? like + 1 : like}</Text>
      </BtnLike>
    </WholeContainer>
  );
};

export default Comment;
