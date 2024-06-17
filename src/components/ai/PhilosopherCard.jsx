export default function PhilosopherCard({ name, description, model }){
    return(
    <div className="relative w-full h-full p-4 bg-white rounded-lg shadow-lg">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full overflow-hidden">
            <img className="object-cover w-full h-full" src={`/philosopher/${model}.webp`} alt={name} />
        </div>
        <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4">{name}</h2>
            <ul className="list-disc list-inside text-left text-lg leading-relaxed px-4 text-gray-800 bg-gray-100 rounded-lg">
                {description.map((desc, index) => (
                    <li key={index} className="mb-2 tracking-tighter">◾&nbsp;{desc}</li>
                ))}
            </ul>
        </div>
    </div>)}