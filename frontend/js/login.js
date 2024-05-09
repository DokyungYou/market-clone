const form = document.querySelector("#login-form");

// let access_token = null;

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
    //로컬스토리지에 저장해보자!
    const accessToken = jsonData.access_token;
    window.localStorage.setItem("token", accessToken);

    const infoDiv = document.querySelector("#login_info");
    infoDiv.innerText = "로그인되었습니다!";

    window.location.pathname = "/";

    // const button = document.createElement("button");
    // button.innerText = "상품 가져오기";
    // button.addEventListener("click", async () => {
    //   const response = await fetch("/items", {
    //     headers: { Authorization: `Bearer ${accessToken}` },
    //   });
    //   const data = await response.json();
    //   console.log(data);
    // });
    // infoDiv.appendChild(button);
  } else if (status >= 400) {
    alert("id또는 password가 일치하지 않습니다.");
  }
};

form.addEventListener("submit", handleSubmit);
