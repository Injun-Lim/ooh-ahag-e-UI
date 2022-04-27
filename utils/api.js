import AxiosUtil from "./AxiosUtil";

const API_KEY = "4bcbfabbc30b44ceca30afb09d315286";
const BASE_URL_MOVIE = "https://api.themoviedb.org/3";
const BASE_URL = "http://13.125.219.60:8080";

// const trending = () =>
//   fetch(`${BASE_URL_MOVIE}/trending/movie/week?api_key=${API_KEY}`).then((res) =>
//     res.json()
//   );

// const upcoming = () =>
//   fetch(
//     `${BASE_URL_MOVIE}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
//   ).then((res) => res.json());

// const nowPlaying = () =>
//   fetch(
//     `${BASE_URL_MOVIE}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
//   ).then((res) => res.json());

export const signUpApi = {
  signUp: (params) => {
    console.log("------------------------------------------------------");
    console.log(params);
    console.log("------------------------------------------------------");
    return AxiosUtil.post("/api/v1/signup", {
      userId: params.userId,
      pw: params.pw,
      name: params.name,
    });
  },
};

export const postApi = {
  writePost: (params) => {
    console.log("------------------------------------------------------");
    console.log(params);
    console.log("------------------------------------------------------");
    return AxiosUtil.post(`/api/post?tag=고정값테스트`, {
      title: params.title,
      content: params.content,
    });
  },
};

export const boardApi = {
  comment: ({ pageParam, queryKey }) => {
    const [_, id] = queryKey;
    console.log(
      "queryKey : " +
        `${BASE_URL_MOVIE}/movie/${id}/recommendations?api_key=${API_KEY}&language=ko-KR&page=${
          pageParam ? pageParam : 1
        }`
    );
    return fetch(
      `${BASE_URL_MOVIE}/movie/${id}/recommendations?api_key=${API_KEY}&language=ko-KR&page=${
        pageParam ? pageParam : 1
      }`
    ).then((res) => res.json());
  },
};

export const moviesApi = {
  trending: () =>
    fetch(`${BASE_URL_MOVIE}/trending/movie/week?api_key=${API_KEY}`).then(
      (res) => res.json()
    ),
  upcoming: ({ pageParam }) =>
    fetch(
      `${BASE_URL_MOVIE}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${pageParam}`
    ).then((res) => res.json()),
  nowPlaying: () =>
    fetch(
      `${BASE_URL_MOVIE}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    ).then((res) => res.json()),
  search: ({ queryKey }) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL_MOVIE}/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${query}`
    ).then((res) => res.json());
  },
  detail: ({ queryKey }) => {
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL_MOVIE}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,images`
    ).then((res) => res.json());
  },
};

export const tvApi = {
  trending: () =>
    fetch(`${BASE_URL_MOVIE}/trending/tv/week?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  airingToday: () =>
    fetch(`${BASE_URL_MOVIE}/tv/airing_today?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  topRated: () =>
    fetch(`${BASE_URL_MOVIE}/tv/top_rated?api_key=${API_KEY}`).then((res) =>
      res.json()
    ),
  search: ({ queryKey }) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL_MOVIE}/search/tv?api_key=${API_KEY}&language=en-US&page=1&query=${query}`
    ).then((res) => res.json());
  },
  detail: ({ queryKey }) => {
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL_MOVIE}/tv/${id}?api_key=${API_KEY}&append_to_response=videos,images`
    ).then((res) => res.json());
  },
};
