import "antd/dist/antd.css"; //antdesign을 전역으로 적용
import Head from "next/head";
import wrapper from "../store/configStore";

//TODO _app.js는 모든 pages들의 공통 부분

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>NextNodeBird</title>
      </Head>
        {/*이곳에 공통메뉴 사용가능 - Applayout과 별개로*/}
        <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
