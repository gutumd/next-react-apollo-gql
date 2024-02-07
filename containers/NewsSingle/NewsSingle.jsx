import Image from "next/image";

import { MEDIA_BUCKET_URL } from "../../constants/constants";
import styled from "styled-components";

const NewsSingle = ({ data, loading }) => {
  if (loading) {
    return (
      <SkeletonSinglePage>
        <div></div>
        <div>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </SkeletonSinglePage>
    );
  }

  return (
    <section>
      <h1>{data?.title?.short}</h1>
      <Image
        src={`${MEDIA_BUCKET_URL}news/900x900/${data?.thumbnail}`}
        alt={data?.title?.short}
        width={900}
        height={900}
      />
      <div dangerouslySetInnerHTML={{ __html: data?.description?.long }} />
    </section>
  );
};

const SkeletonSinglePage = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 100px;

  div {
    width: 100%;
  }

  div:first-child {
    width: 900px;
    height: 500px;
    margin-bottom: 32px;
    animation: skeleton-loading-main-elem 1s linear infinite alternate;
  }

  span {
    display: flex;
    width: 100%;
    height: 25px;
    margin-bottom: 16px;
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

export default NewsSingle;
