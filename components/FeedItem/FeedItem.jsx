import Image from "next/image";
import Link from "next/link";

import styled from "styled-components";

import fromNow from "../../helpers/utils";

import { MEDIA_BUCKET_URL } from "../../constants/constants";

const FeedItem = ({
  diffInMilliseconds,
  description,
  thumbnail,
  title,
  url,
  parents,
  category,
}) => {
  return (
    <NewItemWrapper>
      <Link href={`/news/${category}/${url}`}>
        <ImageWrapper>
          <Image
            src={`${MEDIA_BUCKET_URL}news/370x194/${thumbnail}`}
            width={240}
            height={125}
            alt={title}
          />
        </ImageWrapper>
      </Link>
      <TextWrapper>
        <Link href={`/news/${category}/${url}`}>
          <h3>{title}</h3>
        </Link>
        <p>
          {description.length > 150
            ? `${description.slice(0, 155)}...`
            : description}
        </p>
        <SourceWrapper>
          {parents &&
          parents?.filter(({ type }) => type === "source").length > 0 &&
          parents?.filter(({ type }) => type === "source")[0].attachment ? (
            <Image
              src={`${MEDIA_BUCKET_URL}logo/${
                parents?.filter(({ type }) => type === "source")[0].attachment
              }`}
              width={16}
              height={16}
              alt="Article Source"
            />
          ) : (
            <SourceLogoPlaceholder />
          )}
          {/* I made it like that because it shows the closest time (I guess...) */}
          {/* Don't give much sense to this */}
          <time>{fromNow(parseInt(diffInMilliseconds.slice(-4)))}</time>
        </SourceWrapper>
      </TextWrapper>
    </NewItemWrapper>
  );
};

const NewItemWrapper = styled.article`
  display: flex;
  margin: 0px 0px 24px;
`;

const ImageWrapper = styled.span`
  width: 240px;
  height: 125px;
  text-decoration: none;
  outline: none;

  @media screen and (max-width: 485px) {
    width: 144px;
    height: 75px;
  }

  img {
    width: 100%;
    height: 100%;
    min-width: 240px;
    min-height: 125px;

    @media screen and (max-width: 485px) {
      min-width: 144px;
      min-height: 75px;
    }
  }
`;

const TextWrapper = styled.div`
  margin-left: 16px;

  h3 {
    font-size: 24px;
    line-height: 26px;
    color: rgb(15, 23, 42);
    letter-spacing: 0px;
    margin: -2.5px 0px 8px;
    font-weight: 500;

    @media screen and (max-width: 560px) {
      font-size: 16px;
      line-height: 20px;
    }

    @media screen and (max-width: 485px) {
      font-size: 14px;
      line-height: 18px;
    }
  }

  p {
    line-height: 20px;
    font-size: 16px;
    font-weight: 400;
    margin: 0px 0px 10px;
    color: rgb(15, 23, 42);

    @media screen and (max-width: 800px) {
      display: none;
    }
  }
`;

const SourceLogoPlaceholder = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 2px;
  color: rgb(255, 255, 255);
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  font-size: 11px;
  background-color: rgb(128, 128, 128);
  font-weight: 500;
  -webkit-box-align: center;
  align-items: center;
  position: relative;
  margin-right: 8px;

  &::after {
    width: 10px;
    height: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgb(255, 255, 255);
    border-radius: 50%;
    content: "";
  }
`;

const SourceWrapper = styled.div`
  display: flex;
  align-items: center;

  img {
    margin-right: 8px;
  }

  time {
    font-size: 14px;
    color: rgb(128, 128, 128);
    line-height: 0;
    width: max-content;
  }
`;

export default FeedItem;
