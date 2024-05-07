from fastapi import FastAPI, UploadFile,Form
from fastapi.staticfiles import StaticFiles
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





# 매번 잊으면 fastapi static 으로 공식문서 검색하자
# 실수했던 부분: mount경로를 /static로 해놓고 웹에 왜 not found지 하고 십몇분 낭비했음

# root경로("/")로 액세스하면 frontend 디렉토리 내의 index.html파일로 리디렉션 된다.
app.mount("/", StaticFiles(directory="frontend", html= True), name="frontend")


