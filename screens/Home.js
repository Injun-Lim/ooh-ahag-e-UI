import React, { useState, useEffect } from "react";
import {
  Dimensions,
  FlatList,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import { useQuery, useQueryClient, useInfiniteQuery } from "react-query";
import styled from "styled-components/native";
import { moviesApi, postApi } from "./../utils/api";
import { Ionicons } from "@expo/vector-icons";
import Loader from "./../components/Loader";
import HMedia from "../components/HMedia";

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const CommingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const HSeparator = styled.View`
  height: 10px;
`;

const Home = ({ navigation: { navigate, setOptions } }) => {
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();

  // const [isPostLoading, setIsPostLoading] = useState(true);
  // const [postListData, setPostListData] = useState(false);

  const { isLoading: isPostLoading, data: postListData } = useQuery(
    ["postListData"],
    postApi.getPostList
  );
  // const {
  //   isLoading: upcomingLoading,
  //   data: upcomingData,
  //   hasNextPage,
  //   fetchNextPage,
  // } = useInfiniteQuery(["movies", "upcoming"], postApi.getPostList, {
  //   // getNextPageParam을 쓰면 api에서 pageParam 인자를 받을 수 있고, 이를 api에 그대로 넘겨주면 된다. 이번의 경우 moviesApi.upcoming에 이걸 활용함.
  //   getNextPageParam: (currentPage) => {
  //     //인자는 2개를 받을 수 있음. (현재 페이지, 페이지 모두) Movie API는 이게 잘 구현되어 있어서 인자 1개로 한다고 함.
  //     if (currentPage.page + 1 > currentPage.total_pages) {
  //       return null;
  //     }
  //     return currentPage.page + 1;
  //   },
  // });
  const renderHMedia = ({ item }) => (
    <HMedia
      id={item.id}
      original_title={item.title}

      // poster_path={item.poster_path}
      // original_title={item.original_title}
      // release_date={item.release_date}
      // overview={item.overview}
      // fullData={item}
      // like={false}
      // likeCnt={0}
      // commentCnt={0}
    />
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["movies"]);
    setRefreshing(false);
  };

  const loading = isPostLoading;

  const loadMore = (hasNextPage) => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  const movieKeyExtractor = (item) => {
    return item.id;
  };

  const WriteBtn = () => (
    <TouchableOpacity
      onPress={() => navigate("Stack", { screen: "one" })} //네비게이터간 이동은 ROOT에서 지정한 네비게이터 이름과 스크린명을 모두 지정해줘야 함
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
      }}
    >
      <Ionicons name="add-outline" size={24} color="white" />
    </TouchableOpacity>
  );
  // const getApiData = async () => {
  //   const jsonn = await fetch("http://13.125.219.60:8080/api/post/index").then(
  //     (res) => res.json()
  //   );
  //   console.log("#####################################");
  //   console.log(jsonn);
  //   setPostListData(jsonn);
  //   setIsPostLoading(false);
  //   console.log("#####################################");
  // };

  useEffect(() => {
    // getApiData();
    setOptions({
      headerRight: () => <WriteBtn />,
    });
  }, []);

  useEffect(() => {
    console.log("postListData---------------------------------------");
    console.log(postListData);
    // console.log(JSON.stringify(postListData));
    console.log("postListData---------------------------------------");
  }, [postListData]);

  return loading ? (
    <Loader />
  ) : (
    <>
      {postListData.map((item) => (
        <HMedia
          key={item.id}
          id={item.id}
          poster_path={null}
          original_title={item.title}
          release_date={item.modifiedDate}
          overview={"게시글내용이들어갈자리임"}
          fullData={item}
          like={false}
          likeCnt={item.viewCnt}
          commentCnt={item.commentCnt}
        />
      ))}
    </>
    // <FlatList
    //   onEndReached={loadMore} /* 무한스크롤 - function 실행 */
    //   // onEndReachedThreshold={0.4} /* 무한스크롤 - function 실행할 시점 설정 */
    //   refreshing={refreshing}
    //   onRefresh={onRefresh}
    //   ListHeaderComponent={
    //     <>{/* <CommingSoonTitle>Coming Soon</CommingSoonTitle> */}</>
    //   }
    //   data={upcomingData.pages.map((page) => page.results).flat()}
    //   keyExtractor={movieKeyExtractor}
    //   ItemSeparatorComponent={HSeparator}
    //   renderItem={renderHMedia}
    // />
  );
};

export default Home;
