export default function Button(props) {
    return (
        <button onClick={props.onClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
            {props.text}
        </button>
    );
}