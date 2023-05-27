from fastapi import FastAPI, Form, File, UploadFile

app = FastAPI()


@app.post("/form")
async def form_post(username: str = Form(...), password: str = Form(default=..., min_length=8)):
    print(username, password)
    return {"data": username}


# @app.post("/file")
# async def file_as_bytes(file: bytes = File(...)):
#     with open("file.txt", "wb") as f:
#         f.write(file)
#         f.close()
#     return {"data": "file uploaded"}

@app.post("/file")
async def file_as_upload_file(file: UploadFile = File(...)):
    contents = await file.read()
    print(contents)
    return {"data": "file uploaded"}
