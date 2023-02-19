from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def _():
    return {"Message": "First FastAPI route"}

@app.get("/newroute")
def _():
  print(type({"message": "This is my second route"}))
  return {"Message": "This is my second route"}