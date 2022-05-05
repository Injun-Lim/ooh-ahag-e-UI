import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import Poster from "./Poster";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity, Text, View } from "react-native";
import { postApi } from "../utils/api";

const HorizontalMovie = styled.View`
  padding: 0px 30px;
  flex-direction: row;
  /* background-color: ${(props) =>
    props.selected
      ? "blue"
      : "red"}; => 호출할 때 던져주는 props로 분기 태우기 가능*/
  background-color: ${(props) => props.theme.MIDGREY_COLOR};
`;
const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;
const ReleaseDate = styled.Text`
  color: white;
  opacity: 0.8;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const Overview = styled.Text`
  color: white;
  opacity: 0.8;
  width: 80%;
`;

const OriginalTitle = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const BtnTouchable = styled.TouchableOpacity`
  background-color: #46c3ad;
  width: 45%;
  height: 40px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-left: 2px;
  margin-right: 2px;
`;

const BtnContainer = styled.View`
  background-color: ${(props) => props.theme.MIDGREY_COLOR};
  flex-direction: row;
  justify-content: space-between;
`;

const AllContainer = styled.View``;

const HMedia = ({
  id,
  poster_path,
  original_title,
  release_date,
  overview,
  fullData,
  like,
  likeCnt,
  commentCnt,
}) => {
  const [postLike, setPostLike] = useState(like);
  const [postLikeCnt, setPostLikeCnt] = useState(likeCnt);
  const [postCommentCnt, setPostCommentCnt] = useState(commentCnt);

  const navigation = useNavigation();
  const goToDetail = () => {
    navigation.navigate("Stack", {
      screen: "PostDetail",
      params: { ...fullData, postLike, postLikeCnt, postCommentCnt },
    });
  };

  const onPressLike = async () => {
    //TODO : 좋아요, 좋아요 취소시 API 전송 추가 필요
    if (postLike) {
      const tempLog = await postApi.postLike({ id, kind: "disLike" });

      console.log("@@@dislike@@@");
      console.log(JSON.stringify(tempLog));
      console.log("@@@dislike@@@");

      setPostLike(false);
      setPostLikeCnt(postLikeCnt - 1);
    } else {
      const tempLog = await postApi.postLike({ id, kind: "like" });

      console.log("@@@like@@@");
      console.log(JSON.stringify(tempLog));
      console.log("@@@like@@@");

      setPostLike(true);
      setPostLikeCnt(postLikeCnt + 1);
    }
  };
  const onPressComment = () => {
    goToDetail();
  };

  return (
    <AllContainer key={id}>
      <TouchableOpacity onPress={goToDetail}>
        <HorizontalMovie>
          <Poster path={poster_path} />
          <HColumn>
            <OriginalTitle>{original_title}</OriginalTitle>
            <ReleaseDate>
              {new Date(release_date).toLocaleDateString("ko")}
            </ReleaseDate>
            <Overview>
              {overview !== "" && overview.length > 140
                ? `${overview.slice(0, 140)}...`
                : overview}
            </Overview>
          </HColumn>
        </HorizontalMovie>
      </TouchableOpacity>
      <BtnContainer>
        <BtnTouchable onPress={onPressLike}>
          {postLike ? (
            <Ionicons name="heart" size={20} color="black" />
          ) : (
            <Ionicons name="heart-outline" size={20} color="black" />
          )}
          <Text> {postLikeCnt}</Text>
        </BtnTouchable>
        <BtnTouchable onPress={onPressComment}>
          <Ionicons
            name="md-chatbox-ellipses-outline"
            size={20}
            color="black"
          />
          <Text> 0</Text>
        </BtnTouchable>
      </BtnContainer>
    </AllContainer>
  );
};

export default HMedia;
