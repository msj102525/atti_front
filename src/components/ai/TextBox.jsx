export default function TextBox({ textList }) {
    while (textList.length < 3) {
        textList.push('\u00A0');
    }

    return (
        <div className="text-center mb-8 max-w-screen-lg mx-auto">
            {textList.map((text, i) => (
                <p key={i} className="text-xl m-5">{text}</p>
            ))}
        </div>
    );
}
