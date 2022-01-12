import "../styles/globals.css";
import "../styles/app.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
const client = new ApolloClient({
  uri: "http://127.0.0.1:8000/graphql",
  cache: new InMemoryCache(),
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
