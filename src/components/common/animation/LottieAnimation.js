import React from "react";
import Lottie from "react-lottie";
import animationData from "./firework.json";

const LottieAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={150} width={150} />;
};

export default LottieAnimation;
