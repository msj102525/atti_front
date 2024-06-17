import { useState } from "react";

export default function PollForm({ onSubmit }) {
  const [preferences, setPreferences] = useState({
    preference1: "",
    preference2: "",
    preference3: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPreferences((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(preferences);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md p-4 mt-5 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="preference1" className="block mb-1 text-sm font-semibold text-gray-800">
          선호도 1:
        </label>
        <input
          type="text"
          id="preference1"
          name="preference1"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-400"
          value={preferences.preference1}
          onChange={handleInputChange}
          placeholder="선호도 1을 입력하세요"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="preference2" className="block mb-1 text-sm font-semibold text-gray-800">
          선호도 2:
        </label>
        <input
          type="text"
          id="preference2"
          name="preference2"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-400"
          value={preferences.preference2}
          onChange={handleInputChange}
          placeholder="선호도 2을 입력하세요"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="preference3" className="block mb-1 text-sm font-semibold text-gray-800">
          선호도 3:
        </label>
        <input
          type="text"
          id="preference3"
          name="preference3"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-teal-400"
          value={preferences.preference3}
          onChange={handleInputChange}
          placeholder="선호도 3을 입력하세요"
        />
      </div>
      <div className="flex justify-center">
        {/* <button
          type="submit"
          className="w-full px-4 py-2 font-bold text-white bg-teal-400 rounded-full cursor-pointer"
        >
          제출
        </button> */}
      </div>
    </form>
  );
}
