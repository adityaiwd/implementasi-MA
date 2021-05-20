import "../styles/globals.css";
import React from "react";
import NextApp from "next/app";
import { ToastProvider } from "react-toast-notifications";

// function MyApp({ Component, pageProps }) {

//   return <Component {...pageProps} />
// }

// export default MyApp

class MyApp extends NextApp {
  componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode)
      jssStyles.parentNode.removeChild(jssStyles);
  }
  render() {
    const { Component, pageProps } = this.props;
    return (
      <ToastProvider autoDismiss>
        <Component {...pageProps} />
      </ToastProvider>
    );
  }
}

export default MyApp;
