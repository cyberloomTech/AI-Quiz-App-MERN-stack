import Result from "./Result";
import { useRef, useState } from "react";
import MyContext from "../contexts/Context";
import { useContext, useEffect } from "react";
import TimeProgressBar from "./TimeProgressBar";

const Quiz = () => {
  const { handleSubmit, state } = useContext(MyContext);
  const [isSeleted, setIsSeleted] = useState(false);
  const [score, setScore] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [timer, setTimer] = useState(0);
  const intervalRef = useRef(null);

  const showResult = (e, answer) => {
    setIsSeleted(true);
    if (answer !== e.target.value) {
      e.target.className = "flex items-start gap-4 text-lg bg-red-500 border text-gray-50 px-6 py-3 rounded-md shadow-sm transition-all text-left w-full";
    } else {
      setScore(num => num + 1);
    }

    setTimeout(() => {
      e.target.className = buttonClass;
      setIsSeleted(false);
      handleSubmit(e.target.value);
      setTimer(e => e + 1);
      setSeconds(30);
    }, 1000)
  }

  useEffect(() => {
    if (seconds === 0) {
      setTimer(e => e + 1);
      console.log(timer);
      setSeconds(30);
      setScore(num => num - 1);
      handleSubmit();
    }
    if (state.currentQuestionIndex === state.filteredQuestion.length) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [seconds]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds(sec => sec - 1);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  let buttonClass = "flex items-start gap-4 text-lg bg-sky-100 border hover:border-blue-500 text-gray-800 px-6 py-3 rounded-md shadow-sm transition-all text-left w-full";
  let rightClass = "flex items-start gap-4 text-lg bg-green-500 text-gray-50 border px-6 py-3 rounded-md shadow-sm transition-all text-left w-full";

  if (!state.filteredQuestion || state.filteredQuestion.length === 0) return;


  return (
    <div className="text-center py-8 items-center flex flex-col gap-4">
      {/* this is basically if index of the filtered question is not equals the currentQuestionIndex which means it is and ended, it renders the question else renders results page */}
      {state.currentQuestionIndex !== state.filteredQuestion.length ? (
        <div className="w-full h-full max-w-4xl mx-auto mt-8 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
          <div className="p-6 flex flex-col">
            <div className="flex">
              <p className="text-slate-500 text-3xl font-semibold text-left mb-4">
                Question {state.currentQuestionIndex + 1}</p>
              <div className="text-xl ml-auto">
                <p>Score: {score}</p>
              </div>
            </div>
            <span className="text-gray-700 text-2xl font-medium text-left block mb-6">
              {state.filteredQuestion[state.currentQuestionIndex][0].title}
            </span>
            <div className="flex flex-col gap-4 mb-6">
              {state.filteredQuestion[state.currentQuestionIndex][0].choices.map(
                (choice) => (
                  <button
                    key={choice.selected}
                    className={isSeleted && (state.filteredQuestion[state.currentQuestionIndex][0].answer === choice.selected) ? rightClass : buttonClass}
                    value={choice.selected}
                    onClick={(e) => {
                      showResult(e, state.filteredQuestion[state.currentQuestionIndex][0].answer);
                    }}
                  >
                    {choice.selected.toUpperCase() + ". " + choice.a}
                  </button>
                )
              )}
            </div>
          </div>
          <TimeProgressBar duration={30000} reset={timer} seconds={seconds} />
        </div>
      ) : (
        <Result score={score} />
      )}
    </div>
  );
};

export default Quiz;
