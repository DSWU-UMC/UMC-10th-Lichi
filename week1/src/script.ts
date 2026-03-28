// const todos = document.querySelector<HTMLElement>(".render-container__todos");
// const todoDone = document.querySelector("render-container__completed");

const inputTodo: HTMLInputElement | null = document.querySelector("#inputTodo");
const addBtn = document.querySelector<HTMLButtonElement>(
  ".todo-container__button",
);
const todosArr: string[] = [];
const todoDoneArr: string[] = [];

// 먼저 할 일을 입력하겠지
// 입력하고 나서 엔터를 누르거나 추가 버튼을 누르겠지 둘 중 하나
// -> 여기서는 addEventListener을 사용해서
// 누른 다음에 할 일 목록에 뿅! 생김
// 할 일 목록에서 완료를 누르면
// 완료 목록으로 이동
// 완료 목록에서 삭제하면
// 완전히 사라짐

// 입력 후 엔터 혹은 추가 버튼 누르는 코드
inputTodo?.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.key === "Enter") {
    if (inputTodo) {
      todosArr.push(inputTodo.value);
      inputTodo.value = "";
      console.log("버튼 눌림");
    }
  }
});
