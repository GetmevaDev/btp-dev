import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/globals.css";
import { AppWrapper } from "../context/state";

function MyApp({ Component, pageProps }) {
  return (
    <AppWrapper>
      <Head>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
          crossorigin="anonymous"
        />
      </Head>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </AppWrapper>
  );
}

export default MyApp;
