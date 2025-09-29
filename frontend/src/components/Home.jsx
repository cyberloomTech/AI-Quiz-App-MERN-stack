import { questionsData } from ".";
import Quiz from "./Quiz";
import StartPage from "./StartPage";
import MyContext from "../contexts/Context";
import { useReducer } from "react";
import { reducer, initialValue } from "../reducers/Reducer";
import { useEffect } from "react";
import axios from "axios";

const Home = () => {

  // Add questions to mongodb

  // questionsData.map(async(question)=>{
  //   try{

  //     let object = {
  //       title: question.query,
  //       explanation: question.explanation,
  //       answer: question.answer,
  //       choices:question.choices,
  //       category:question.info.categorie,
  //       mode:question.info.mode
  //     }

  //     const res = await axios.post('/api/question', object);

  //   }catch(err){
  //     console.log(err)
  //   }
  // });

  // uses useReducer to manage state across the app
  const [state, dispatch] = useReducer(reducer, initialValue);

  // this function accepts the selected preferences
  const handleSelect = (key, e) => {
    const selected = e.target.value;
    dispatch({ type: "setoptions", key: key, selected: selected });
  };

  // this initiates quiz after selection of preferences
  const handleStart = async () => {

    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');

      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Instantiate Web3
        const web3 = new Web3(window.ethereum);

        // Get the current account
        const account = accounts[0];
        console.log('Connected account:', account);

        dispatch({ type: "getWalletAccount", payload: account });

        // sets the started value to true
        dispatch({ type: "isStarted" });
        // filters the questions based on users choices
        const res = await axios.get('/api/question', {
          params: {
            category: state.options.categorie,
            mode: state.options.mode,
            quantity: state.options.quantity
          }
        });
        // updates the default question data
        dispatch({ type: "filteredQuestion", filterData: res.data });

      } catch (error) {
        console.error('User denied account access or error:', error);
      }
    } else {
      alert('MetaMask is not installed. Please install it to use this app.');
    }
  };

  // handles next question button click
  const handleSubmit = (selected) => {
    // checks user's choice with the answer
    let res = false;
    if (
      selected ===
      state.filteredQuestion[state.currentQuestionIndex].answer
    ) {
      res = true;
    }

    // updates users answer
    dispatch({
      type: "userAnswer",
      answer: {
        id: state.currentQuestionIndex,
        answer: state.userChoice,
        result: res,
      },
    });

    // resets the previous question choice
    dispatch({ type: "resetChoice" });
    // updates the question index to go to the next
    dispatch({ type: "updatecurrentQuestionIndex" });
  };

  // resets the quiz to take again
  const handleRetryBtn = () => {
    dispatch({ type: "reset" });
  };

  // handles checking the answers
  const handleCheckBtn = () => {
    dispatch({ type: "checkBtn" });
  };

  return (
    <div>
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="font-bold text-3xl">Quiz App</h1>
        </div>
      </header>

      {/* if start button is clicked render Quiz component else StartPage */}
      {state.isStarted ? (
        <MyContext.Provider
          value={{
            handleSubmit,
            handleRetryBtn,
            handleCheckBtn,
            state,
          }}
        >
          <Quiz />
        </MyContext.Provider>
      ) : (
        <MyContext.Provider value={{ handleStart, handleSelect }}>
          <StartPage />
        </MyContext.Provider>
      )}
    </div>
  );
};

export default Home;
