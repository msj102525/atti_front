import styles from "@/styles/common/mintButton.module.css";

export default function MintButton(props) {
  // props에서 필요한 속성을 추출합니다.
  const {
    onClick,
    text,
    text2,
    sizeW,
    sizeH,
    fontSize,
    visible = true,
    className, // 추가된 className 속성
  } = props;

  return (
    <button
      onClick={onClick}
      className={`bg-teal-400 hover:bg-teal-600 text-white font-bold ${
        styles.roundedBetween
      } ${sizeW} ${sizeH} ${fontSize} ${visible ? "" : "hidden"} ${className}`}
    >
      {text}
      <br />
      {text2}
    </button>
  );
}
