/* eslint-disable react/prop-types */
import { useContext } from "react";
import { quizOptions } from ".";
import MyContext from "../contexts/Context";
import { Link } from "react-router-dom";

const StartPage = () => {
  const { handleStart, handleSelect } = useContext(MyContext);

  return (
    <div className="relative px-8 py-6 bg-white shadow-lg rounded-lg max-w-4xl mx-auto mt-8 border border-gray-300">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Quiz App</h1>
      <ul className="space-y-4">
        {/* maps through question preference options  */}
        {quizOptions.map((quiz) => (
          <li key={quiz.title} className="flex flex-col gap-2">
            <label
              htmlFor={`dropdown-${quiz.title}`}
              className="text-lg font-medium text-gray-700"
            >
              {quiz.title}
            </label>
            <div className="relative">
              <select
                id={`dropdown-${quiz.title}`}
                name="dropdown"
                onChange={(e) => handleSelect(quiz.type, e)}
                defaultValue={quiz.options[0]}
                className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none w-full"
              >
                {quiz.options.map((option) => (
                  <option
                    key={option}
                    value={option}
                    className="bg-white hover:bg-gray-200 focus:bg-gray-200 transition-colors py-3"
                  >
                    {option}
                  </option>
                ))}
              </select>
              <svg
                className="absolute top-1/2 right-3 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 text-center">
        <div>
          <button
            onClick={handleStart}
            className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg focus:outline-none transform hover:scale-105 hover:shadow-2xl transition duration-300 ease-in-out not-overflow">
            <span className="relative z-10 text-xl">START</span>
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 animate-brilliant"></div>
          </button>
        </div>
        <div className="mt-3">
          <Link 
          to="/history"
          className="bg-lime-500 hover:bg-lime-400 hover:scale-105 focus:bg-lime-400 text-white text-lg px-3 py-1 rounded-md shadow-md transition-all"
          >
            History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
