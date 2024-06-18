export default function TextBox({ textList }) {
  while (textList.length < 3) {
    textList.push("\u00A0");
  }

  return (
    <div className="max-w-screen-lg mx-auto mb-8 text-center">
      {textList.map((text, i) => (
        <p key={i} className="m-5 text-xl">
          {text}
        </p>
      ))}
    </div>
  );
}
