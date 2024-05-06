const writeForm = document.getElementById("write-form");

const handleSubmitForm = async (event) => {
  event.preventDefault(); // submit의 reload 방지 (submit이벤트는 실행 뒤 reload하는 특성때문에 콘솔에 떳다가 바로 사라짐)

  await fetch("/items", {
    method: "POST",
    body: new FormData(writeForm),
  });
  console.log("제출 테스트 성공");
};

writeForm.addEventListener("submit", handleSubmitForm);
