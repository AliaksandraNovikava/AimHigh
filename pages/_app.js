import GlobalStyle from "../styles";
import { goals, categoryColors } from "../lib/data.js";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} goals={goals} categoryColors={categoryColors} />
    </>
  );
}
