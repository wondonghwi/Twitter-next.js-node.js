import "antd/dist/antd.css";
import Head from "next/head";

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

export default MyApp;
