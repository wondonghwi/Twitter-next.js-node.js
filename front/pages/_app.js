import "antd/dist/antd.css";
import Head from "next/head";
import wrapper from "../store/configStore";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>NextNodeBird</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
