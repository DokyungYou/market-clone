<!-- script내에 js, main엔 html 작성 , style엔 css
한 파일내에 세가지 를 다 넣음-->

<script>
  // svelte파일을 가져오고
  import Main from "./pages/Main.svelte";
  import Login from "./pages/Login.svelte";
  import Signup from "./pages/Signup.svelte";
  import Write from "./pages/Write.svelte";
  import NOTFOUND from "./pages/NotFound.svelte";
  import Router from "svelte-spa-router"; //라우터 태그 가져오기?

  import "./css/style.css";
  import "./css/header.css";
  import "./css/main.css";
  import "./css/footer.css";

  // 해당 파일을 특정경로에 라우팅
  const routes = {
    "/": Main,
    "/signup": Signup,
    "/login": Login,
    "/write": Write,
    "*": NOTFOUND,
  };
</script>

<Router {routes} />

<!-- <main>
<div>와</div>
</main> -->

<style>
</style>
