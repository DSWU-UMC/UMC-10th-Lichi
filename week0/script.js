const todos = document.querySelector("#todo");
const todoDone = document.querySelector("#todoDone");
const todoInput = document.querySelector("#todoInput");

const todosArr = [];
const todoDoneArr = [];

function render() {
  todos.innerHTML = "";
  todoDone.innerHTML = "";

  todosArr.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "todo-item";
    div.textContent = item;

    const btn = document.createElement("button");
    btn.textContent = "완료";
    btn.addEventListener("click", () => {
      todosArr.splice(index, 1);
      todoDoneArr.push(item);
      render();
    });

    div.appendChild(btn);
    todos.appendChild(div);
  });

  todoDoneArr.forEach((item, index) => {
    const div = document.createElement("div");
    div.textContent = item;

    const btn = document.createElement("button");
    btn.textContent = "삭제";
    btn.addEventListener("click", () => {
      todoDoneArr.splice(index, 1);
      render();
    });

    div.appendChild(btn);
    todoDone.appendChild(div);
  });
}

todoInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    todosArr.push(todoInput.value);
    todoInput.value = "";
    render();
  }
});
