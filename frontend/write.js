const writeForm = document.getElementById("write-form");

const handleSubmitForm = async (event) => {
  event.preventDefault(); // submit의 reload 방지 (submit이벤트는 실행 뒤 reload하는 특성때문에 콘솔에 떳다가 바로 사라짐)

  try {
    const response = await fetch("/items", {
      method: "POST",
      body: new FormData(writeForm),
    });
    const data = await response.json();

    // 저장성공시 메인화면으로 이동
    if (data === 200) {
      window.location.pathname = "/";
    }
  } catch (e) {
    console.error(e);
  }
};

writeForm.addEventListener("submit", handleSubmitForm);
