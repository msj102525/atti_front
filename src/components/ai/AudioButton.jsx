import React from "react";
import LottieAnimation from "../common/animation/LottieAnimation";
import soundWaveAnimation from "@/components/animationData/soundWave.json";

export default function AudioButton({
  audioValid,
  statusImage,
  onClickFunction,
  onHoverFunction,
  onLeaveFunction,
  disabled,
}) {
  return (
    <div className="flex items-center justify-center">
      <button
        className={`flex items-center justify-center p-4 text-white rounded-full shadow-lg min-h-24 min-w-24 focus:outline-none ${
          disabled
            ? "bg-gray-400 cursor-not-allowed" // 비활성화 상태
            : "bg-red-500 hover:bg-red-600 active:bg-red-700 cursor-pointer" // 활성화 상태
        }`}
        onClick={disabled ? null : onClickFunction} // 비활성화 상태일 때 클릭 이벤트 차단
        onMouseEnter={disabled ? null : onHoverFunction} // 비활성화 상태일 때 호버 이벤트 차단
        onMouseLeave={disabled ? null : onLeaveFunction} // 비활성화 상태일 때 마우스 리브 이벤트 차단
        disabled={disabled}
      >
        {console.log("audio Valid!!! : " + audioValid)}
        {audioValid ? (
          <LottieAnimation
            animationData={soundWaveAnimation}
            width={60}
            height={60}
          />
        ) : (
          <img
            className="w-10 h-10"
            src={`/audio/${statusImage}.png`}
            alt="audio status"
          />
        )}
      </button>
    </div>
  );
}
