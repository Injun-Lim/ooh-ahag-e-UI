import React, { useState, useEffect } from "react";
import { Dimensions, Text, View, Keyboard } from "react-native";
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

const BottomView = styled.View`
  width: 100%;
  height: 10%;
  /* background-color: #ee5407; */
  border-width: 1px;
  border-color: gray;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: absolute;
  bottom: 0;
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

  const queryClient = useQueryClient();

  const {
    isLoading: commentLoading,
    data: commentData,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(["comments", params.id], boardApi.getComments, {
    // getNextPageParam을 쓰면 api에서 pageParam 인자를 받을 수 있고, 이를 api에 그대로 넘겨주면 된다. 이번의 경우 moviesApi.upcoming에 이걸 활용함.
    getNextPageParam: (currentPage) => {
      //인자는 2개를 받을 수 있음. (현재 페이지, 페이지 모두) Movie API는 이게 잘 구현되어 있어서 인자 1개로 한다고 함.
      if (currentPage.page + 1 > currentPage.total_pages) {
        return null;
      }
      return currentPage.page + 1;
    },
  });
  // console.log(commentData?.pages);

  const isLoading = commentLoading;
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
    //TODO : 좋아요, 좋아요 취소시 HOME화면에 콜백 해줘야 함. (현재 디테일 화면에서 누른거 적용이 안됨)
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
    });
    setCommentText("");

    console.log("(@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@)");
    console.log(JSON.stringify(tempLog));
    console.log("(@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@)");

    if (tempLog.data.success === true) {
      Alert.alert("댓글 작성 완료", `내용:${commentText}`, [
        {
          text: "OK",
          onPress: async () => {
            await queryClient.refetchQueries(["comments"]);
          },
        },
      ]);
    } else {
      Alert.alert("댓글 작성 에러", `내용:${commentText}`);
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
    //TODO : 공유하기 이벤트 추가
    alert("공유하기 버튼 이벤트");
  };

  const renderComments = ({ item }) => (
    <Comment
      title={item.content}
      overview={item.content}
      fullData={item}
      like={0}
      liked={false}
    />
  );

  const commentKeyExtractor = (item) => {
    return item.id;
  };

  const voidFnc = () => {};

  //TODO : 화면 로딩시 권한 있는 게시판 목록 API로 가져오기, 기본값 세팅해주기(boardSelect)
  useEffect(() => {
    setOptions({
      title: "title" in params ? params.title : "@게시판명@",
      headerRight: () => <ShareButton />,
    });
  }, [params]);

  useEffect(() => {
    if (commentData) {
      console.log("commentData.pages.flat()");
      console.log(commentData.pages.flat());
      console.log("commentData.pages.flat()");
    }
  }, [commentData]);

  return isLoading ? (
    <Loader />
  ) : (
    <WholeContainer>
      <FlatListView>
        <FlatList
          onEndReached={loadMore} /* 무한스크롤 - function 실행 */
          onEndReachedThreshold={
            0.8
          } /* 무한스크롤 - function 실행할 시점 설정 */
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
                  <Text> {params.likeCnt}</Text>
                </BtnTouchable>
                <BtnTouchable onPress={onPressComment}>
                  <Ionicons
                    name="md-chatbox-ellipses-outline"
                    size={20}
                    color="black"
                  />
                  <Text> {params.commentCnt}</Text>
                </BtnTouchable>
              </BtnContainer>
              <Hr />
            </>
          }
          data={commentData.pages.map((page) => page).flat()}
          renderItem={renderComments}
          keyExtractor={commentKeyExtractor}
          ItemSeparatorComponent={HSeparator}
        />
      </FlatListView>
      <BottomView>
        <BottomInputBox
          placeholder={"댓글을 남겨주세요."}
          onChangeText={onChangeCommentText}
          value={commentText}
          // keyboardType={"email-address"}
          // style={{ borderColor: emailValid ? "green" : "red" }}
          // onEndEditing={checkEmailValid}
          autoCapitalize={"none"}
        ></BottomInputBox>
        <BottomBtn onPress={onPressWriteComment}>
          <BottomBtnText>게시</BottomBtnText>
        </BottomBtn>
      </BottomView>
    </WholeContainer>
  );
};

export default PostDetail;
