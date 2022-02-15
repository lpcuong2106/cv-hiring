import "../styles/globals.css";
import "../styles/app.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import { AuthProvider } from "../components/AuthProvider";
import {
  ApolloLink,
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
} from "@apollo/client";
import createUploadLink from "apollo-upload-client/public/createUploadLink.js";
import { Provider } from "react-redux";
import { store } from "../store/index";

const httpLink = createUploadLink({ uri: "http://127.0.0.1:8000/graphql" });

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token = localStorage.getItem("token");

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const client = new ApolloClient({
  // @ts-ignore
  link: authLink.concat(httpLink), // Chain it with the HttpLink
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div id="wrapp_app">
      <Provider store={store}>
        <ApolloProvider client={client}>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </ApolloProvider>
      </Provider>
    </div>
  );
}

export default MyApp;
