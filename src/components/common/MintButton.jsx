import styles from "@/styles/common/mintButton.module.css";

export default function MintButton(props) {
  // size 속성을 props에서 추출하여 기본값을 medium으로 설정합니다.
  const { onClick, text, sizeW, sizeH, fontSize } = props;

  return (
    <button
      onClick={onClick}
      className={`bg-teal-400 hover:bg-mint-700 text-white font-bold ${styles.roundedBetween} ${sizeW} ${sizeH} ${fontSize}`}
    >
      {text}
    </button>
  );
}
