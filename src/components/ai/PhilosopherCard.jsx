export default function PhilosopherCard({ name, description, model }) {
  return (
    <div className="relative w-full p-4 bg-white rounded-lg shadow-lg h-4/5">
      <div className="absolute top-0 w-24 h-24 overflow-hidden transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full left-1/2">
        <img
          className="object-cover w-full h-full"
          src={`/philosopher/${model}.webp`}
          alt={name}
        />
      </div>
      <div className="mt-12 text-center">
        <h2 className="mb-4 text-2xl font-bold">{name}</h2>
        <ul className="px-4 text-lg leading-relaxed text-left text-gray-800 list-disc list-inside bg-gray-100 rounded-lg">
          {description.map((desc, index) => (
            <li key={index} className="mb-2 tracking-tighter">
              ◾&nbsp;{desc}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
