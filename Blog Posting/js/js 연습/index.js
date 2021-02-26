const button = document.getElementById("todo-button");
const input = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");
const connectGetBtn = document.getElementById("connect-get");
const connectPostBtn = document.getElementById("connect-post")

button.addEventListener("click", (e) => {
  let todoItem = document.createElement("li");

  todoItem.innerText = input.value;
  input.value = "";
  todoList.appendChild(todoItem);
});

/*connectGetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const server = "https://api.github.com/";
  fetch(server).then((response) => {
    return response.json();
  }).then((resData) => {

    const { code_search_url: target } = resData;
    console.log("Code_Search Url => ", target);
  }).catch((error) => {
    console.log("통신 실패");
  });
});*/

connectGetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const server = "http://127.0.0.1:8080/api/todo";

  const option = {
    credentials: "include",
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
      "mode": "no-cors",
      "Origin": "*"
    }
  }
  console.log(option.headers);

  fetch(server, option)
    .then((response) => {
      return response.json();
    }).then((resData) => {
      console.log(resData);
    }).catch((error) => {
      console.log("통신 실패");
    });
});

connectPostBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const server = "http://localhost:8080/api/todo";
  const option = {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }
  fetch(server, option)
    .then((response) => {
      console.log("호출 성공");
      console.log(response);
      console.log(response.json);
    })
    .catch((error) => {

    });

});