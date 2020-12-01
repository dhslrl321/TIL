import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.getElementById("span");

const reducer = (count = 0, action) => {
  if (action.type === "ADD") {
    return count + 12;
  } else if (action.type === "MINUS") {
    return count - 1;
  } else return count;
};
const store = createStore(reducer);

number.innerText = store.getState();

const updateText = () => {
  number.innerText = count;
};

const handleAdd = () => {
  store.dispatch({ type: "ADD" });
  updateText();
};

const handleMinus = () => {
  store.dispatch({ type: "MINUS" });
  updateText();
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
