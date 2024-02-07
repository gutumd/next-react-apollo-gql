import dynamic from "next/dynamic";
import Image from "next/image";

import styled from "styled-components";

import logo from "../../assets/images/new-point-logo.svg";

const Feed = dynamic(() => import("../../components/Feed"));

const NewsFeed = () => {
  return (
    <Section>
      <Image
        src={logo}
        width={200}
        height={60}
        alt={"Point.md"}
        className="logo"
      />
      <h1>Today News:</h1>
      <Feed />
    </Section>
  );
};

const Section = styled.section`
  padding: 24px;
  border-radius: 8px;
  background-color: rgb(255, 255, 255);
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 984px;
  margin: 48px 0;

  @media screen and (max-width: 380px) {
    padding: 16px;
  }

  img.logo {
    margin: 0 auto;
    width: 200px;
    margin-top: 15px;
  }
`;

export default NewsFeed;
