"use strict";
const todos = document.querySelector("#todos");
const todoDone = document.querySelector("#todoDone");
const inputTodo = document.querySelector("#inputTodo");
const addBtn = document.querySelector(".todo-container__button");
const todosArr = [];
const todoDoneArr = [];
function render() {
    if (todos)
        todos.innerHTML = "";
    if (todoDone)
        todoDone.innerHTML = "";
    todosArr.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "render-container__todos";
        div.textContent = item;
        const doneBtn = document.createElement("button");
        doneBtn.textContent = "완료";
        doneBtn.addEventListener("click", () => {
            todosArr.splice(index, 1);
            todoDoneArr.push(item);
            render();
        });
        div.appendChild(doneBtn);
        todos === null || todos === void 0 ? void 0 : todos.appendChild(div);
    });
    todoDoneArr.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "render-container__completed";
        div.textContent = item;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "삭제";
        deleteBtn.className = "render-container__deleteBtn";
        deleteBtn.addEventListener("click", () => {
            todoDoneArr.splice(index, 1);
            render();
        });
        div.appendChild(deleteBtn);
        todoDone === null || todoDone === void 0 ? void 0 : todoDone.appendChild(div);
    });
}
inputTodo === null || inputTodo === void 0 ? void 0 : inputTodo.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        if (inputTodo) {
            todosArr.push(inputTodo.value);
            inputTodo.value = "";
            console.log("버튼 눌림");
            render();
        }
    }
});
addBtn === null || addBtn === void 0 ? void 0 : addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (inputTodo) {
        todosArr.push(inputTodo.value);
        inputTodo.value = "";
        console.log("클릭함");
        render();
    }
});
