
import { AppProps } from "next/dist/shared/lib/router/router";
import "./style/styles.scss";

export default function myApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}