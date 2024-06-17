export default function Button(props) {
    return (
        <button onClick={props.onClick} className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded transition
        transform hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            {props.text}
        </button>
    );
}