from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

app = FastAPI()

# 매번 잊으면 fastapi static 으로 공식문서 검색하자
# 실수했던 부분 mount경로를 /static로 해놓고 웹에 왜 not found지 하고 십몇분 낭비 ㅋㅋㅋㅋㅋ

# root경로("/")로 액세스하면 frontend 디렉토리 내의 index.html파일로 리디렉션 된다.
app.mount("/", StaticFiles(directory="frontend", html= True), name="frontend")


