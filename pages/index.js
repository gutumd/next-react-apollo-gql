import Head from "next/head";
import dynamic from "next/dynamic";

import { initializeApollo, addApolloState } from "../apollo/apolloClient";

import { GET_NEWS } from "../graphql/queries";

const NewsFeed = dynamic(() => import("../containers/NewsFeed"));

export default function Home() {
  return (
    <>
      <Head>
        <title>News</title>
      </Head>
      <NewsFeed />
    </>
  );
}

export async function getServerSideProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_NEWS,
  });

  return addApolloState(apolloClient, {
    props: {},
  });
}
