const form = document.querySelector("#signup-form");

const checkPassword = (formData) => {
  const password1 = formData.get("password1");
  const password2 = formData.get("password2");

  if (password1 === password2) {
    return true;
  } else {
    return false;
  }
};

const handleSubmit = async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const div = document.querySelector("#signup_info");

  // 비밀번호, 비밀번호확인 값이 같다면
  if (checkPassword(formData)) {
    // 입력한 비밀번호를 해시화하여 다시 세팅해준다.
    const sha256Password = sha256(formData.get("password1"));
    formData.set("password", sha256Password);

    console.log(`해시화한 비밀번호: ${formData.get("password1")}`);

    const response = await fetch("/signup", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data == 200) {
      // div.innerText = "회원가입에 성공했습니다";
      // div.style.color = "blue";
      alert("회원가입에 성공했습니다.");

      window.location.pathname = "/login.html";
    }
  } else {
    div.innerText = "비밀번호가 같지 않습니다!";
    div.style.color = "red";
  }
};

form.addEventListener("submit", handleSubmit);
