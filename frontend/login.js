const form = document.querySelector("#login-form");

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  formData.set("password", sha256(formData.get("password")));
  // console.log("아이디:" + formData.get("id"));
  // console.log("암호화 된 비밀번호:" + formData.get("password"));

  const response = await fetch("/login", {
    method: "POST",
    body: formData,
  });

  const jsonData = await response.json();
  const status = await response.status;
  if (status === 200) {
    console.log("accessToken: " + jsonData);
    alert("로그인에 성공했습니다.");

    window.location.pathname = "/index.html";
  } else if (status >= 400) {
    alert("id또는 password가 일치하지 않습니다.");
  }
};

form.addEventListener("submit", handleSubmit);
