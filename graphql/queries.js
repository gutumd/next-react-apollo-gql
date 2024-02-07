import { gql } from "@apollo/client";

export const GET_NEWS = gql`
  query GetNews($skip: Int = 0) {
    contents(
      project_id: "5107de83-f208-4ca4-87ed-9b69d58d16e1"
      lang: "ru"
      skip: $skip
      take: 10
    ) {
      id
      dates {
        posted
      }
      description {
        intro
      }
      thumbnail
      title {
        short
      }
      url
      parents {
        attachment
        type
        id
      }
      cparent {
        id
        url {
          ru
        }
      }
    }
  }
`;

export const GET_NEWS_SINGLE = gql`
  query GetNewsSingle($articleSlug: String!) {
    content(
      id: ""
      project_id: "5107de83-f208-4ca4-87ed-9b69d58d16e1"
      full_url: $articleSlug
    ) {
      title {
        short
      }
      description {
        intro
        long
      }
      thumbnail
    }
  }
`;
