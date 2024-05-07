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
  } else if (second >= 0) {
    return `${second}초 전`;
  } else {
    return "방금 전";
  }
};

const renderData = (data) => {
  const main = document.querySelector("main");

  // 가벼운 클론코딩이라 데이터를 한꺼번에 가져오고 reverse하는 방식 사용
  data.reverse().forEach((object) => {
    // 순수 html, js로만 구현하기때문에 수작업
    const itemDiv = document.createElement("div"); //js에서 직접 동적으로 HTML 요소생성
    itemDiv.className = "item-list";

    const itemImageDiv = document.createElement("div");
    itemImageDiv.className = "item-list__img";

    const itemImage = document.createElement("img");
    itemImage.src = object.image; //임시

    const itemInfoDiv = document.createElement("div");
    itemInfoDiv.className = "item-list__info";

    const itemInfoTitleDiv = document.createElement("div");
    itemInfoTitleDiv.className = "item-list__info-title";
    itemInfoTitleDiv.innerText = object.title;

    const itemInfoMetaDiv = document.createElement("div");
    itemInfoMetaDiv.className = "item-list__info-meta";
    itemInfoMetaDiv.innerText =
      object.place + " " + getTimeDelta(object.created_at);

    const itemInfoPriceDiv = document.createElement("div");
    itemInfoPriceDiv.className = "item-list__info-price";
    itemInfoPriceDiv.innerText = object.price;

    itemInfoDiv.appendChild(itemInfoTitleDiv);
    itemInfoDiv.appendChild(itemInfoMetaDiv);
    itemInfoDiv.appendChild(itemInfoPriceDiv);

    itemImageDiv.appendChild(itemImage);
    itemDiv.appendChild(itemImageDiv);
    itemDiv.appendChild(itemInfoDiv);

    main.appendChild(itemDiv); // main 아래에 동적으로 만든 div를 자식요소로 추가
  });
};

const fetchList = async () => {
  const response = await fetch("/items");
  const data = await response.json();
  //   console.log(data);

  renderData(data);
};

// 첫화면이 뜨면서 item리스트 노출
fetchList();
