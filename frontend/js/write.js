// == 422 error POST ===================================================================
// const writeForm = document.getElementById("write-form");

// const handleSubmitForm = async (event) => {
//   event.preventDefault(); // submit의 reload 방지 (submit이벤트는 실행 뒤 reload하는 특성때문에 콘솔에 떳다가 바로 사라짐)

//   // form 에 제출된 데이터 + 현재시간추가
//   const body = new FormData(writeForm);
//   body.append("created_at", new Date().getTime());
//   // body.append("created_at", Date.now());

//   try {
//     const response = await fetch("/items", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       // body: JSON.stringify(Object.fromEntries(body)),
//       // body: JSON.stringify(body),
//       body, // Js에선 객체의 key와 value가 동일한 경우 축약가능 (body: body)
//     });
//     const data = await response.json();

//     // 저장성공시 메인화면으로 이동
//     if (data === 200) {
//       window.location.pathname = "/";
//     }
//   } catch (e) {
//     console.error(e);
//   }
// };

// writeForm.addEventListener("submit", handleSubmitForm);

// == 200 POST ==============================================================
const writeForm = document.getElementById("write-form");

const handleSubmitForm = async (event) => {
  event.preventDefault();
  const body = new FormData(writeForm);
  body.append("created_at", new Date().getTime());
  try {
    const response = await fetch("/items", {
      method: "POST",
      body,
    });
    const data = await response.json();
    if (data === 200) window.location.pathname = "/";
  } catch (e) {
    console.error(e);
  }
};

writeForm.addEventListener("submit", handleSubmitForm);

//====================================================================================
