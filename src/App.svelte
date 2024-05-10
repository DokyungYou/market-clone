<!-- script내에 js, main엔 html 작성 , style엔 css
한 파일내에 세가지 를 다 넣음-->
<!-- 최상단 svelte파일 -->

<script>
  // svelte파일을 가져오고
  import Main from "./pages/Main.svelte";
  import Login from "./pages/Login.svelte";
  import Signup from "./pages/Signup.svelte";
  import Write from "./pages/Write.svelte";
  import NOTFOUND from "./pages/NotFound.svelte";
  import Router from "svelte-spa-router"; //라우터 태그 가져오기?
  import {
    GoogleAuthProvider,
    signInWithCredential,
    getAuth,
  } from "firebase/auth";
  import { user$ } from "./store";

  import "./css/style.css";
  import "./css/header.css";
  import "./css/main.css";
  import "./css/footer.css";
  import { onMount } from "svelte";

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  let isLoading = true;

  const checkLogin = async () => {
    console.log("매번 로그인상태 체크");
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return (isLoading = true); //access토큰이 없다면 리턴

    const credential = GoogleAuthProvider.credential(null, accessToken);
    const result = await signInWithCredential(auth, credential);
    const user = result.user;
    user$.set(user);
    isLoading = false;
  };

  //인증 제공업체에 요청하고자 하는 OAuth 2.0 범위를 지정
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

  // 해당 파일을 특정경로에 라우팅
  const routes = {
    "/": Main,
    "/signup": Signup,
    "/login": Login,
    "/write": Write,
    "*": NOTFOUND,
  };

  //렌더링될때마다 checkLogin함수 실행
  onMount(() => checkLogin());
</script>

<!-- 로그인 상태가 아니라면 login페이지 보여줌 -->
<!-- user값이 들어있지 않다면 로그인 페이지 이동-->
{#if isLoading}<div>로딩중</div>
{:else if !$user$}
  <Login />
{:else}
  <Router {routes} />
{/if}

<style>
</style>
