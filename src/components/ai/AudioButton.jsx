import React from "react";
import LottieAnimation from "../common/animation/LottieAnimation";
import soundWaveAnimation from "@/components/animationData/soundWave.json";

export default function AudioButton({ audioValid, statusImage, onClickFunction, onHoverFunction, onLeaveFunction }) {
    return (
        <div
            className='flex justify-center items-center mt-10'
        >
            <button className="p-4 min-h-24 min-w-24 rounded-full bg-red-500 text-white shadow-lg hover:bg-red-600 active:bg-red-700 focus:outline-none flex justify-center items-center" onClick={onClickFunction} onMouseEnter={onHoverFunction}
                onMouseLeave={onLeaveFunction}>
                {audioValid ? (
                    <LottieAnimation animationData={soundWaveAnimation} width={60} height={60} />
                ) : (
                    <img className="w-10 h-10" src={`/audio/${statusImage}.png`} alt="audio status" />
                )}
            </button>
        </div>
    );
}
