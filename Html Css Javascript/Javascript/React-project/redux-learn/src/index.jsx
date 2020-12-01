import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.getElementById("span");

const reducer = () => {
  return "hello";
};
const store = createStore();

console.log(store);

let count = 0;

number.innerText = count;

const updateText = () => {
  number.innerText = count;
};

const handleAdd = () => {
  count = count + 1;
  updateText();
};

const handleMinus = () => {
  count = count - 1;
  updateText();
  console.log("hello");
};

add.addEventListener("click", handleAdd);
minus.addEventListener("click", handleMinus);
