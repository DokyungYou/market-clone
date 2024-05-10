<script>
  import { getDatabase, ref, push } from "firebase/database";
  import {
    getStorage,
    ref as refImage,
    uploadBytes,
    getDownloadURL,
  } from "firebase/storage";

  import Footer from "../components/Footer.svelte";

  let title;
  let price;
  let description;
  let place;
  let imagefiles;

  const storage = getStorage(); //Firebase Storage 참조 생성 (루트참조)
  const db = getDatabase();

  const uploadImageFile = async () => {
    const imagefile = imagefiles[0];
    const name = imagefile.name;
    const imageRef = refImage(storage, name); // 루트 참조에서 하위 참조를 생성하여 파일 업로드
    await uploadBytes(imageRef, imagefile); // 이미지 업로드 (하위 참조와 실제 파일)

    return await getDownloadURL(imageRef);
  };

  function writeItemData(imageUrl) {
    push(ref(db, "items/"), {
      //push는 고유key 자동새성
      title,
      price,
      description,
      place,
      createdAt: new Date().getTime(),
      imageUrl,
    });

    // 글쓰기 완료 시 메인페이지 이동
    window.location.hash = "/";
  }

  const handleSubmit = async () => {
    writeItemData(await uploadImageFile());
  };
</script>

<!-- <button on:click={() => console.log(title, price, description, place)}
  >테스트</button
> -->

<form id="write-form" on:submit|preventDefault={handleSubmit}>
  <div>
    <label for="image">이미지</label>
    <!-- files로 바인드 해야하는데 왠지는 기억안나는데 values 바인드해서 에러떳얶ㅆ다 -->
    <input type="file" id="image" name="image" bind:files={imagefiles} />
  </div>

  <div>
    <label for="title">제목</label>
    <input
      type="text"
      id="title"
      name="title"
      placeholder="글 제목"
      bind:value={title}
    />
  </div>

  <div>
    <label for="price">가격</label>
    <input
      type="number"
      id="price"
      name="price"
      placeholder="가격(선택사항)"
      bind:value={price}
    />
  </div>

  <div>
    <label for="description">설명</label>
    <input
      type="text"
      id="description"
      name="description"
      placeholder="~~ 동에 올릴 게시글 내용을 작성해주세요."
      bind:value={description}
    />
  </div>

  <div>
    <label for="place">장소</label>
    <input
      type="text"
      id="place"
      name="place"
      placeholder="장소"
      bind:value={place}
    />
  </div>
  <button class="write-enter" type="submit"> 업로드</button>
</form>
<Footer location="write" />
<div class="media-info-msg">화면 사이즈를 줄여주세요.</div>

<style>
  .write-enter {
    background-color: rgb(253, 139, 63);
    margin: 10px;
    border-radius: 10px;
    padding: 5px, 12px, 5px, 12px;
    color: white;
    cursor: pointer;
  }
</style>
