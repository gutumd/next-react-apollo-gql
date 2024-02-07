import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { useQuery } from "@apollo/client";
import { GET_NEWS_SINGLE } from "../../../graphql/queries";

import { MEDIA_BUCKET_URL } from "../../../constants/constants";

const NewsSingle = dynamic(() => import("../../../containers/NewsSingle"));

const NewsItemPage = () => {
  const router = useRouter();
  const { slug, category } = router.query;
  const { data, error, loading } = useQuery(GET_NEWS_SINGLE, {
    variables: {
      articleSlug: slug,
    },
  });

  if (error) {
    return;
  }

  return (
    <>
      <Head>
        <title>{`${data?.content?.title?.short} - Point.md`}</title>
        <meta name="description" content={data?.content?.description?.intro} />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="article" />
        <meta
          property="og:title"
          content={`${data?.content?.title?.short} - Point.md`}
        />
        <meta
          property="og:description"
          content={data?.content?.description?.intro}
        />
        <meta
          property="og:image"
          content={`${MEDIA_BUCKET_URL}news/900x900/${data?.content?.thumbnail}`}
        />
        <meta
          property="og:url"
          content={`https://www.point.md/ru/novosti/${category}/${slug}`}
        />
        <meta property="og:site_name" content="Point.md" />
        <meta
          name="twitter:title"
          content={`${data?.content?.title?.short} - Point.md`}
        />
        <meta
          name="twitter:description"
          content={data?.content?.description?.intro}
        />
        <meta
          name="twitter:image"
          content={`${MEDIA_BUCKET_URL}news/900x900/${data?.content?.thumbnail}`}
        />
      </Head>
      {data && <NewsSingle data={data?.content} loading={loading} />}
    </>
  );
};

export default NewsItemPage;
