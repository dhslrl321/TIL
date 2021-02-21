const button = document.getElementById("todo-button");
const input = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");


button.addEventListener("click", (e) => {
  let todoItem = document.createElement("li");
  let removeBtn = document.createElement("button");

  todoItem.innerText = input.value;
  input.value = "";
  removeBtn.setAttribute("id")
  todoList.appendChild(todoItem).appendChild(removeBtn);
})