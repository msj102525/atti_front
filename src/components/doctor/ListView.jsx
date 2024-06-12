import React from "react";

export default function ListView({ list, title, iconUrl }) {
  return (
    <div className="flex items-start mt-10">
      <div className="flex items-center mb-4 mr-20">
        {iconUrl && (
          <img src={iconUrl} alt="icon" className="w-auto h-6 mr-2" />
        )}
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <div>
        <ul className="list-disc list-inside">
          {list.map((item, index) => (
            <li key={index}>&bull; {item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
