import React from "react";
import styled from "styled-components";

const CircularProgressBar = () => {
  return (
    <CircularProgressBarWrapper>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </CircularProgressBarWrapper>
  );
};

const CircularProgressBarWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 30px;
  height: 30px;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 24px;
    height: 24px;
    margin: 3px;
    border: 3px solid #000;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #000 transparent transparent transparent;
  }

  div:nth-child(1) {
    animation-delay: -0.45s;
  }

  div:nth-child(2) {
    animation-delay: -0.3s;
  }

  div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default CircularProgressBar;
