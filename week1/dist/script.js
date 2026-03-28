"use strict";
const inputTodo = document.querySelector("#inputTodo");
const addBtn = document.querySelector(".todo-container__button");
const todosArr = [];
const todoDoneArr = [];
inputTodo === null || inputTodo === void 0 ? void 0 : inputTodo.addEventListener("keydown", (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
        if (inputTodo) {
            todosArr.push(inputTodo.value);
            inputTodo.value = "";
            console.log("버튼 눌림");
        }
    }
});
addBtn === null || addBtn === void 0 ? void 0 : addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (inputTodo) {
        todosArr.push(inputTodo.value);
        inputTodo.value = "";
        console.log("클릭함");
    }
});
