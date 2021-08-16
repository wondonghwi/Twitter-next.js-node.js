import "antd/dist/antd.css"; //antdesign을 전역으로 적용
import Head from "next/head";
import wrapper from "../store/configStore";

//TODO 빌드시 람다 = SSR된 페이지들, 검은동그라미는 SSG, 흰동그라미는 그냥 정적페이지(Html) ->  용량은 1Mb만 안넘으면 됨

//TODO _app.js는 모든 pages들의 공통 부분
//next-redux-wrapper 에서 자동으로 Provider store={store}를 해줘서 적으면 안됨!
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>NextNodeBird</title>
      </Head>
      {/*이곳에 공통메뉴 사용가능 - AppLayout과 별개로*/}
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
