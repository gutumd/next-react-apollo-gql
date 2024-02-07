import Head from "next/head";

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo/apolloClient";

import StyledComponentsRegistry from "../lib/registry";
import styled from "styled-components";

import "../styles/global.css";

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <StyledComponentsRegistry>
        <Main>
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </Main>
      </StyledComponentsRegistry>
    </>
  );
}

const Main = styled.main`
  width: 100%;
  margin: 0 auto;
  max-width: 1240px;
`;
