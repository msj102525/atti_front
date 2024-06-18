import styles from "@/styles/common/mintButton.module.css";

export default function MintButton(props) {
  // size 속성을 props에서 추출하여 기본값을 medium으로 설정합니다.
  const {
    onClick,
    text,
    text2,
    sizeW,
    sizeH,
    fontSize,
    visible = true,
  } = props;

  return (
    <button
      onClick={onClick}
      className={`bg-teal-400 hover:bg-teal-600 text-white font-bold ${
        styles.roundedBetween
      } ${sizeW} ${sizeH} ${fontSize} ${visible ? "" : "hidden"}`}
    >
      {text}
      <br />
      {text2}
    </button>
  );
}
