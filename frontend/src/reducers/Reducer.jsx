export const initialValue = {
  userChoice: "",
  currentQuestionIndex: 0,
  isCheck: false,
  userAnswer: [],
  isStarted: false,
  options: {
    categorie: "javascript",
    quantity: 5,
    mode: "easy",
  },
  filteredQuestion: [],
  walletAccount:"",
};


export const reducer = (state, action) => {
  switch (action.type) {
    case "setoptions":
      return {
        ...state,
        options: {
          ...state.options,
          [action.key]: action.selected,
        },
      };
    case "isStarted":
      return {
        ...state,
        isStarted: true,
      };
    case "getWalletAccount":
      return {
        ...state,
        walletAccount: action.payload,
      };
    case "filteredQuestion":
      return {
        ...state,
        filteredQuestion: action.filterData,
      };
    case "resetChoice":
      return {
        ...state,
        userChoice: "",
      };
    case "userAnswer":
      return {
        ...state,
        userAnswer: [...state.userAnswer, action.answer],
      };
    case "checkBtn":
      return {
        ...state,
        isCheck: true,
      };
    case "updatecurrentQuestionIndex":
      return {
        ...state,
        currentQuestionIndex: ++state.currentQuestionIndex,
      };
    case "reset":
      return initialValue;
    default:
      throw new Error(`unknown action type: ${action.type}`);
  }
};