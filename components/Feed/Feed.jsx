import { Fragment } from "react";
import { Waypoint } from "react-waypoint";

import dynamic from "next/dynamic";

import { useQuery } from "@apollo/client";
import { GET_NEWS } from "../../graphql/queries";
import styled from "styled-components";

const FeedItem = dynamic(() => import("../../components/FeedItem"));
const CircularProgressBar = dynamic(() =>
  import("../../components/CircularProgressBar")
);

const Feed = () => {
  const { data, error, loading, fetchMore, networkStatus } = useQuery(GET_NEWS);

  if (error) {
    return;
  }

  if (loading) {
    return (
      <div>
        {[...new Array(10)].map((item, index) => {
          return (
            <Skeleton key={index}>
              <div></div>
              <div>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </Skeleton>
          );
        })}
      </div>
    );
  }

  return (
    <FeedWrapper>
      {data?.contents?.map(
        (
          { id, dates, description, thumbnail, title, url, parents, cparent },
          index
        ) => {
          if (description && thumbnail && title) {
            return (
              <Fragment key={id}>
                <FeedItem
                  diffInMilliseconds={dates.posted} // Don't know exactly what comes here, so, tried to guess... :(
                  description={description?.intro?.replace(
                    /[\u2018-\u201F\u275B-\u275E]/g,
                    ""
                  )}
                  thumbnail={thumbnail}
                  title={title?.short?.replace(
                    /[\u2018-\u201F\u275B-\u275E]/g,
                    ""
                  )}
                  url={url}
                  parents={parents}
                  category={cparent?.url?.ru}
                />
                {index === data?.contents?.length - 1 && (
                  <Waypoint
                    onEnter={() =>
                      fetchMore({
                        variables: {
                          skip: data?.contents?.length + 10,
                        },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!fetchMoreResult) {
                            return prev;
                          }

                          return {
                            contents: [
                              ...prev.contents,
                              ...fetchMoreResult.contents,
                            ],
                          };
                        },
                      })
                    }
                  />
                )}
              </Fragment>
            );
          }
        }
      )}

      {networkStatus === 3 && <CircularProgressBar />}
    </FeedWrapper>
  );
};

const Skeleton = styled.div`
  width: 100%;
  height: 130px;
  display: flex;
  margin: 0px 0px 24px;

  div {
    width: 100%;
  }

  div:first-child {
    margin-right: 16px;
    width: 240px;
    height: 130px;
    animation: skeleton-loading-main-elem 1s linear infinite alternate;
  }

  span {
    display: flex;
    width: 100%;
    height: 25px;
    margin-bottom: 10px;
    animation: skeleton-loading-main-elem 1s linear infinite alternate;
  }

  @keyframes skeleton-loading-main-elem {
    0% {
      background-color: hsl(200, 20%, 85%);
    }
    100% {
      background-color: hsl(200, 20%, 90%);
    }
  }
`;

const FeedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Feed;
