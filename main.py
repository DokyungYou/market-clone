from fastapi import FastAPI, UploadFile,Form, Response
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from typing import Annotated  ###18:50


import sqlite3
con = sqlite3.connect('database.db', check_same_thread=False) #
cur = con.cursor() #

app = FastAPI()



### API를 만들 때는 app.mount 윗단에 만들어 주어야한다.
### "/" 경로에 해당하는 모든 요청을 "frontend" 디렉토리 내의 파일로 리디렉션
### 만약 이 코드가 app 객체를 생성하는 코드 이후에 위치한다면,
### 이것은 모든 경로를 "/frontend"로 리디렉션하여 FastAPI가 제공하는 모든 API 엔드포인트를 무시하고 모든 요청을 "frontend" 디렉토리로 보낼 것
#그래서 저번에 404랑 405뜬 건가..

### 윗단에 api가 있다면 특정 api가 실행될때는 아랫단에 있는 app.mount는 실행되지 않는다. 



#'Annotated'를 사용하여 변수를 지정 시 변수의 타입에 대한 추가적인 정보 제공가능
# 코드의 가독성 향상, 변수사용벙에 대한 명확한 이해
@app.post('/items')
async def create_item(image:UploadFile, 
                title:Annotated[str,Form()], # title정보는 form data형식으로 문자열로 받는다는 뜻
                price:Annotated[int,Form()],
                description:Annotated[str,Form()],
                place:Annotated[str,Form()],
                created_at:Annotated[int,Form()]
                ):
    print(image, title, price, description, place)
    
    #이미지 데이터는 BLOB타입으로 크게 오기때문에 데이터를 읽을 시간이 필요함
    image_bytes = await image.read()
    cur.execute(f"""
                INSERT INTO items(title, image, price, description, place, created_at)
                VALUES('{title}','{image_bytes.hex()}',{price},'{description}','{place}',{created_at})
                """)
    
    
    
    con.commit()
    return 200


@app.get("/items")
async def get_itmes():
    
    # 여기선 왜 cursor를 또 새로 만들지? post에서는 전역변수로 선언한거 썼는데
    cur = con.cursor()
    
    
    # 컬럼명도 같이 가져오게 함
    # ex) {1,'노트북''삼성'}    ->   {id: 1, title: '노트북', company: '삼성'}
    con.row_factory = sqlite3.Row
    rows = cur.execute(f"""
                       SELECT * FROM items;
                       """).fetchall()  # SQL 쿼리 결과에서 모든 행을 가져오는 메서드
    
    # for row in rows: 데이터베이스에서 가져온 각 행을 순회
    # dict(row): 각 행을 Python 사전(dictionary) 객체로 변환
    # jsonable_encoder(): Pydantic의 함수로, Python 객체를 JSON으로 직렬화할 수 있는 형태로 변환
    # JSONResponse(): FastAPI의 함수로, JSON 형식의 데이터를 반환하는 응답을 생성
    
    #데이터베이스에서 가져온 행(row)들을 JSON 형식으로 변환하여 반환하는 작업을 수행
    return JSONResponse(jsonable_encoder(dict(row) for row in rows)) 



@app.get('/images/{item_id}')
async def get_image(item_id):
    cur = con.cursor()
    
    #현재 가져온 데이터는 16진법
    image_bytes = cur.execute(f"""
                              SELECT image FROM items WHERE id = {item_id}
                              """).fetchone()[0]

    #이진화 후 리턴
    return Response(content=bytes.fromhex(image_bytes))





@app.post('/signup')
def signup(id:Annotated[str,Form()],password: Annotated[str,Form()]):
    print(password)
    return 200
    

#============================================================================================================================
# 매번 잊으면 fastapi static 으로 공식문서 검색하자
# 실수했던 부분: mount경로를 /static로 해놓고 웹에 왜 not found지 하고 십몇분 낭비했음

# root경로("/")로 액세스하면 frontend 디렉토리 내의 index.html파일로 리디렉션 된다.
app.mount("/", StaticFiles(directory="frontend", html= True), name="frontend")


