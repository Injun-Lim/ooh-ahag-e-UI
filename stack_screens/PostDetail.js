import React, { useState, useEffect } from "react";
import { Dimensions, Text, View, Keyboard, Alert } from "react-native";
import { useQuery, useQueryClient, useInfiniteQuery } from "react-query";
import styled from "styled-components/native";
import { DARKGREY_COLOR } from "../color";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, FlatList } from "react-native";
import Comment from "./../components/Comment";
import { boardApi, postApi } from "./../utils/api";
import { moviesApi } from "./../utils/api";
import HMedia from "./../components/HMedia";
import Loader from "./../components/Loader";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const WholeContainer = styled.View`
  background-color: white;
  flex: 1;
  align-items: center;
`;

const FlatListView = styled.View`
  height: 90%;
`;

const TxtTitleContainer = styled.View`
  width: 100%;
  padding-left: 5%;
  padding-right: 5%;
  margin-top: 20px;
`;

const TxtTitle = styled.Text`
  font-size: 24px;
`;

const TxtNickname = styled.Text`
  font-size: 14px;
`;

const TxtInputContainer = styled.View`
  width: 100%;
  padding-left: 5%;
  padding-right: 5%;
  margin-bottom: 20px;
`;

const TxtInput = styled.Text`
  font-size: 20px;
`;

const Hr = styled.View`
  border-bottom-color: black;
  border-bottom-width: 1px;
  margin-bottom: 15px;
  margin-top: 15px;
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
  flex-direction: row;
  justify-content: space-between;
  padding-left: 5%;
  padding-right: 5%;
`;

const HSeparator = styled.View`
  border-bottom-color: gray;
  border-bottom-width: 1px;
  margin-bottom: 5px;
  margin-top: 5px;
`;

const BottomReplyBox = styled.View`
  width: 100%;
  height: 10%;
  bottom: 10%;
  border-width: 1px;
  border-color: grey;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  position: absolute;
  background-color: grey;
  padding-left: 3%;
`;

const BottomReplyBoxText = styled.Text`
  font-size: 18px;
  color: white;
`;

const BottomView = styled.View`
  width: 100%;
  height: 10%;
  /* background-color: #ee5407; */
  border-width: 1px;
  border-color: grey;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  padding-left: 3%;
`;

const BottomInputBox = styled.TextInput`
  font-size: 20px;
  /* border-width: 1px;
  border-color: gray; */
  width: 85%;
  height: 100%;
`;

const BottomBtn = styled.TouchableOpacity`
  width: 15%;
  height: 100%;
  justify-content: center;
`;
const BottomBtnText = styled.Text`
  font-size: 20px;
`;

const PostDetail = ({
  navigation: { navigate, setOptions },
  route: { params },
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [postLike, setPostLike] = useState(params.postLike);
  const [postLikeCnt, setPostLikeCnt] = useState(params.postLikeCnt);
  const [postCommentCnt, setPostCommentCnt] = useState(params.postCommentCnt);
  const [commentText, setCommentText] = useState("");
  const [selectedCommentId, setSelectedCommentId] = useState(-1);

  const [replyBoxText, setReplyBoxText] = useState("????????? ?????? ????????? ???");

  const queryClient = useQueryClient();

  const {
    isLoading: commentLoading,
    data: commentData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(["comments", params.id], boardApi.getComments, {
    // getNextPageParam??? ?????? api?????? pageParam ????????? ?????? ??? ??????, ?????? api??? ????????? ???????????? ??????. ????????? ?????? moviesApi.upcoming??? ?????? ?????????.
    getNextPageParam: (currentPage) => {
      //????????? 2?????? ?????? ??? ??????. (?????? ?????????, ????????? ??????) Movie API??? ?????? ??? ???????????? ????????? ?????? 1?????? ????????? ???.
      console.log("==pageparam====pageparam====pageparam====pageparam==");
      console.log(
        "currentPage.nowPage : " +
          currentPage.nowPage +
          " currentPage.lastPage : " +
          currentPage.lastPage
      );
      console.log("==pageparam====pageparam====pageparam====pageparam==");
      if (currentPage.nowPage + 1 > currentPage.lastPage) {
        return null;
      }
      return currentPage.nowPage + 1;
    },
  });
  // console.log(commentData?.pages);

  const isLoading = commentLoading || refreshing;
  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["comments"]);
    setRefreshing(false);
  };

  const onChangeCommentText = (event) => {
    setCommentText(event);
  };

  const onPressLike = async () => {
    //TODO : ?????????, ????????? ????????? HOME????????? ?????? ????????? ???. (?????? ????????? ???????????? ????????? ????????? ??????)
    if (postLike) {
      const tempLog = await postApi.postLike({
        id: params.id,
        kind: "disLike",
      });

      console.log("@@@dislike@@@");
      console.log(JSON.stringify(tempLog));
      console.log("@@@dislike@@@");

      setPostLike(false);
      setPostLikeCnt(postLikeCnt - 1);
    } else {
      const tempLog = await postApi.postLike({ id: params.id, kind: "like" });

      console.log("@@@like@@@");
      console.log(JSON.stringify(tempLog));
      console.log("@@@like@@@");

      setPostLike(true);
      setPostLikeCnt(postLikeCnt + 1);
    }
  };

  const onPressComment = () => {};

  const onPressWriteComment = async () => {
    Keyboard.dismiss();
    const tempLog = await boardApi.writeComment({
      id: params.id,
      memberId: 2,
      content: commentText,
      parentId: selectedCommentId,
    });
    setCommentText("");
    setSelectedCommentId(-1);

    console.log("(@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@)");
    console.log(JSON.stringify(tempLog));
    console.log("(@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@)");

    if (tempLog.data === 200) {
      Alert.alert("?????? ?????? ??????", `??????:${commentText}`, [
        {
          text: "OK",
        },
      ]);
      // onRefresh(); ????????? ?????? ?????? refresh?????? ?????? ????????????????????????
      await queryClient.refetchQueries(["comments"]);
    } else {
      Alert.alert("?????? ?????? ??????", `??????:${commentText}`);
    }
    console.log("================================================");
    console.log(tempLog);
    console.log("================================================");
  };

  const ShareButton = () => (
    <TouchableOpacity onPress={onShareBtn}>
      <Ionicons name="share-outline" color="white" size={24} />
    </TouchableOpacity>
  );

  const onShareBtn = () => {
    //TODO : ???????????? ????????? ??????
    alert("???????????? ?????? ?????????");
  };

  const onClickDeleteComment = (delCommentId, delPostId) => {
    Alert.alert("?????? ????????????", "????????? ?????????????????????????", [
      {
        text: "OK",
        onPress: async () => {
          const tempLog = await boardApi.deleteComments({
            commentId: delCommentId,
            postId: delPostId,
          });

          console.log("(@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@)");
          console.log(JSON.stringify(tempLog));
          console.log("(@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@)");
          await queryClient.refetchQueries(["comments"]);
        },
      },
      { text: "NO" },
    ]);
  };

  const onClickReplyComment = (commentId, userName) => {
    // selectedCommentId
    setSelectedCommentId(commentId);
    setReplyBoxText(`${userName}????????? ?????? ????????? ???`);
  };

  const renderComments = ({ item }) => {
    return (
      <Comment
        memberId={item.memberId}
        overview={item.content}
        fullData={item}
        like={item.likeCnt}
        liked={item.likeCheck}
        createDate={item.createDate}
        commentId={item.id}
        parentId={item.parentId}
        userName={item.userName}
        postId={params.id}
        deleteYN={item.deleteYN}
        childComment={item.childComment}
        onClickDeleteComment={onClickDeleteComment}
        onClickReplyComment={onClickReplyComment}
      />
    );
  };

  const commentKeyExtractor = (item) => {
    return item.id;
  };

  const onPressReplyX = () => {
    setSelectedCommentId(-1);
  };

  const voidFnc = () => {};

  //TODO : ?????? ????????? ?????? ?????? ????????? ?????? API??? ????????????, ????????? ???????????????(boardSelect)
  // useEffect(() => {
  //   setOptions({
  //     title: "title" in params ? params.title : "@????????????@",
  //     headerRight: () => <ShareButton />,
  //   });
  // }, [params]);

  // useEffect(() => {
  //   if (commentData) {
  //     console.log("commentData.pages.flat()");
  //     console.log(commentData.pages.flat());
  //     console.log("commentData.pages.flat()");
  //   }
  // }, [commentData]);

  return isLoading ? (
    <Loader />
  ) : (
    <WholeContainer>
      <FlatListView>
        <FlatList
          onEndReached={loadMore} /* ??????????????? - function ?????? */
          onEndReachedThreshold={
            0.8
          } /* ??????????????? - function ????????? ?????? ?????? */
          refreshing={refreshing}
          onRefresh={onRefresh}
          ListHeaderComponent={
            <>
              <TxtTitleContainer>
                <TxtTitle> {params.title} </TxtTitle>
                <TxtNickname> {params.auth} </TxtNickname>
                <TxtNickname> {params.modifiedDate} </TxtNickname>
              </TxtTitleContainer>
              <Hr />
              <TxtInputContainer>
                <TxtInput> {params.content} </TxtInput>
              </TxtInputContainer>
              <Hr />
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
                  <Text> {postCommentCnt}</Text>
                </BtnTouchable>
              </BtnContainer>
              <Hr />
            </>
          }
          data={commentData.pages.map((page) => page.result).flat()}
          renderItem={renderComments}
          keyExtractor={commentKeyExtractor}
          ItemSeparatorComponent={HSeparator}
        />
      </FlatListView>
      {selectedCommentId === -1 ? null : (
        <BottomReplyBox>
          <BottomReplyBoxText>{replyBoxText}</BottomReplyBoxText>
          <BottomBtn onPress={onPressReplyX}>
            <Ionicons name="close-outline" size={20} color="black" />
          </BottomBtn>
        </BottomReplyBox>
      )}
      <BottomView>
        <BottomInputBox
          placeholder={"????????? ??????????????????."}
          onChangeText={onChangeCommentText}
          value={commentText}
          // keyboardType={"email-address"}
          // style={{ borderColor: emailValid ? "green" : "red" }}
          // onEndEditing={checkEmailValid}
          autoCapitalize={"none"}
        ></BottomInputBox>
        <BottomBtn onPress={onPressWriteComment} disabled={!commentText}>
          <BottomBtnText>??????</BottomBtnText>
        </BottomBtn>
      </BottomView>
    </WholeContainer>
  );
};

export default PostDetail;
