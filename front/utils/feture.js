//어떻게 swr을 불러올지 정하는
// 함수 -> url로 useSWR(args)가 들어옴
//withCredentials : true -> 서버와 도메인이 다를경우 쿠키전달을 위함
import axios from "axios";

export const fetcher = (url) =>
  axios.get(url, { withCredentials: true }).then((result) => result.data);
