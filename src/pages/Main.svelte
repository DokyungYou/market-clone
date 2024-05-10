<script>
  import { onMount } from "svelte";
  import Footer from "../components/Footer.svelte";
  import { getDatabase, ref, onValue } from "firebase/database";

  const db = getDatabase();
  const itemsRef = ref(db, "items/");

  let hour = new Date().getHours();
  let minute = new Date().getMinutes();

  $: items = []; // 반응형 변수로 선언

  //onMount 함수는 컴포넌트가 화면에 처음으로 렌더링될 때 실행
  //onValue 함수가 호출되면, 해당 데이터베이스 참조(itemsRef)의 변경 사항을 관찰
  //onValue 함수 내에서 데이터베이스의 변경 사항을 감지하고, 데이터베이스의 내용이 변경될 때마다 콜백 함수가 실행
  //콜백 함수 내에서는 데이터베이스에서 가져온 데이터를 업데이트하여 반응형 변수인 items에 할당
  //따라서 items 변수는 데이터베이스의 변경 사항에 따라 업데이트되며, 이를 화면에 실시간으로 랜더링할 수 있음
  //파이어베이스의 실시간 데이터베이스는 클라이언트와 서버 간의 실시간 소켓 연결을 통해 동작
  //따라서 데이터베이스의 내용이 변경되면 서버에서 클라이언트로 실시간으로 데이터가 전송되어 화면이 업데이트
  onMount(() =>
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val(); //db에 있는 데이터 가져옴
      // console.log(Object.values(data));

      // db에서 가져오면 데이터 업데이트
      items = Object.values(data).reverse();
    })
  );

  const getTimeDelta = (timestamp) => {
    //받을 때 세계시간 기준으로 만들기
    const currentTime = new Date().getTime() - 9 * 60 * 60 * 1000;

    const timeDelta = new Date(currentTime - timestamp);
    const hour = timeDelta.getTime();
    const minute = timeDelta.getMinutes();
    const second = timeDelta.getSeconds();

    // 시간이 NaN으로 나오는 이슈가 있었다.
    // 숫자로 변환할 수 없는 문자열을 숫자로 변환하려고 시도할 때 NaN 나오는 것
    // 한참 헤매다가  getTime함수에 ()를 빼먹은 것을 발견
    // console.log(`${hour}시간 + ${minute}분 + ${second}초`);

    if (hour > 0) {
      return `${hour}시간 전`;
    } else if (minute > 0) {
      return `${minute}분 전`;
    } else if (second > 0) {
      return `${second}초 전`;
    } else {
      return "방금 전";
    }
  };
</script>

<header>
  <div class="info-bar">
    <div class="info-bar__time">{hour}:{minute}</div>
    <div class="info-bar__icons">
      <img src="assets/chart-bar.svg" alt="chart-bar" />
      <img src="assets/wifi.svg" alt="wifi" />
      <img src="assets/battery.svg" alt="battery" />
    </div>
  </div>
  <div class="menu-bar">
    <div class="menu-bar__location">
      <div>역삼1동</div>
      <div class="menu-bar__location-icon">
        <img src="assets/arrow-down.svg" alt="arrow-down" />
      </div>
    </div>
    <div class="menu-bar__icons">
      <img src="assets/search.svg" alt="serch" />
      <img src="assets/menu.svg" alt="menu" />
      <img src="assets/alert.svg" alt="alert" />
    </div>
  </div>
</header>
<main>
  {#each items as item}
    <div class="item-list">
      <div class="item-list__img">
        <img src={item.imageUrl} alt={item.title} />
      </div>
      <div class="item-list__info">
        <div class="item-list__info-title">{item.title}</div>
        <div class="item-list__info-meta">
          {item.place}
          {getTimeDelta(item.createdAt)}
        </div>
        <div class="item-list__info-price">{item.price}</div>
        <div class="">{item.description}</div>
      </div>
    </div>
  {/each}
  <!-- a태그: 특정태그로 이동시켜주는 대표태그 -->
  <a class="write-btn" href="#/write">+ 글쓰기</a>
</main>

<!-- 본래 있던 footer태그를 Footer 라는 이름으로  별도의 파일로 빼서 가져옴 -->
<Footer location="home" />

<div class="media-info-msg">화면 사이즈를 줄여주세요.</div>

<style>
  .info-bar__time {
    color: red;
  }
</style>
