const inputTodo: HTMLInputElement | null = document.querySelector("#inputTodo");
const addBtn = document.querySelector<HTMLButtonElement>(
  ".todo-container__button",
);
const todosArr: string[] = [];
const todoDoneArr: string[] = [];

// 누른 다음에 할 일 목록에 뿅! 생김
// 할 일 목록에서 완료를 누르면
// 완료 목록으로 이동
// 완료 목록에서 삭제하면
// 완전히 사라짐

function render() {
  // 할 일 목록에 생기도록
  // div 태그 - 글자 생성
  // 글자 생성하면서 버튼도 생성
  // 완료 버튼 눌렀을 때 함수를 따로 빼면 어떨까 싶음
  // 완료 목록에 생기도록
  // todosArr에 있던 걸 todoDoneArr로 옮겨지도록
  // 그 다음에 div 태그 - 글자 생성
  // 글자 생성하면서 삭제 버튼도 생성
  // 삭제 버튼 눌렀으면 todoDoneArr에서 삭제 *인덱스에 해당하는 걸로
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
