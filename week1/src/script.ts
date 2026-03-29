const todos = document.querySelector<HTMLElement>("#todos");
const todoDone = document.querySelector<HTMLElement>("#todoDone");

const inputTodo: HTMLInputElement | null = document.querySelector("#inputTodo");
const addBtn = document.querySelector<HTMLButtonElement>(
  ".todo-container__button",
);
const todosArr: string[] = [];
const todoDoneArr: string[] = [];

function render() {
  // 초기화
  if (todos) todos.innerHTML = "";
  if (todoDone) todoDone.innerHTML = "";

  // 배열에 들어간 할 일을 출력
  todosArr.forEach((item, index) => {
    // div 태그 - 글자 생성
    const div = document.createElement("div");
    div.className = "render-container__todos";
    div.textContent = item;
    // 버튼 생성
    const doneBtn = document.createElement("button");
    doneBtn.textContent = "완료";
    doneBtn.addEventListener("click", () => {
      todosArr.splice(index, 1);
      todoDoneArr.push(item);
      render();
    });
    // 실제 화면에 붙이기
    div.appendChild(doneBtn);
    todos?.appendChild(div);
  });

  todoDoneArr.forEach((item, index) => {
    // div 태그, 글자 생성
    const div = document.createElement("div");
    div.className = "render-container__completed";
    div.textContent = item;
    // 버튼 생성
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "삭제";
    deleteBtn.addEventListener("click", () => {
      todoDoneArr.splice(index, 1);
      render();
    });
    // 실제 화면에 붙이기
    div.appendChild(deleteBtn);
    todoDone?.appendChild(div);
  });
}

// 입력 후 엔터 버튼 누름
inputTodo?.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.key === "Enter") {
    if (inputTodo) {
      todosArr.push(inputTodo.value);
      inputTodo.value = "";
      console.log("버튼 눌림");
      render();
    }
  }
});
// 입력 후 클릭 버튼 누름
addBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  if (inputTodo) {
    todosArr.push(inputTodo.value);
    inputTodo.value = "";
    console.log("클릭함");
    render();
  }
});
