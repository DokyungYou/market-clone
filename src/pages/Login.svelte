<!-- <form id="login-form" action="/login" method="POST">
  <div>로그인하기</div>
  <div>
    <label for="id">아이디</label>
    <input type="text" id="id" name="id" />
  </div>
  <div>
    <label for="password">비밀번호</label>
    <input type="text" id="password" name="password" />
  </div>
  <div><button type="submit">로그인</button></div>
  <div id="login_info"></div>
</form> -->

<script>
  import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  import { user$ } from "../store";

  const auth = getAuth();
  auth.languageCode = "it";

  const provider = new GoogleAuthProvider();

  // 버튼 클릭시 구글로그인팝업창을 띄우기
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;

      //모듈화 해놓은 store.js 에 있는 user$ 에 값을 세팅
      user$.set(user);
      localStorage.setItem("accessToken", accessToken);
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    }
  };
</script>

<div>
  <!-- 변수 앞에 $를 붙여줘야 그 안에 있는 값을 보여줄 수 있음 -->
  <!-- 변수 뒤에 ? 붙여서 에러처리해줬음 -->
  {#if !$user$}
    <div>{$user$?.displayName} 로그인됨</div>
  {/if}
  <div>로그인하기</div>
  <button class="login-btn-google" on:click={loginWithGoogle}>
    <div>
      <img
        class="google-img"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png"
        alt="구글마크"
      />
    </div>

    <div>Google로 로그인하기</div>
  </button>
</div>

<style>
  .login-btn-google {
    display: flex;
    justify-content: space-between;
    align-content: center;

    width: 200px;
    height: 50px;
    padding: 10px, 5px, 0px, 5px;

    background-color: white;

    border: 1px solid gray;
    border-radius: 5px;
    cursor: pointer;
  }

  .login-btn-google div {
    margin-top: 13px;
  }

  .google-img {
    width: 20px;
    height: 20px;
  }
</style>
