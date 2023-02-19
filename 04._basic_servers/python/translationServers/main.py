from fastapi import FastAPI, Request, Response, HTTPException
from fastapi.responses import JSONResponse, PlainTextResponse
import csv
import json
import yaml
import xmltodict

app = FastAPI()

# TXT FILES
@app.post('/send/txt')
async def send_txt(request: Request):
    content_type = request.headers.get('Content-Type')
    if not content_type or not content_type.startswith('text/plain'):
        raise HTTPException(status_code=400, detail='Invalid content type')

    file_contents = await request.body()
    lines = file_contents.decode('utf-8').strip().split('\n')
    jsonData = json.dumps(lines)
    return JSONResponse(content=jsonData)


# CSV FILES
@app.post('/send/csv')
async def send_csv(request: Request):
    content_type = request.headers.get('Content-Type')
    if not content_type or not content_type.startswith('text/csv'):
        raise HTTPException(status_code=400, detail='Invalid content type')

    results = []
    body = await request.body()
    reader = csv.DictReader(body.decode('utf-8').splitlines())

    for row in reader:
        results.append(row)

    jsonData = json.dumps(results)
    return JSONResponse(content=jsonData)


# JSON FILES
@app.post('/send/json')
async def send_json(request: Request):
    content_type = request.headers.get('Content-Type')
    if not content_type or not content_type.startswith('application/json'):
        raise HTTPException(status_code=400, detail='Invalid content type')

    jsonData = await request.json()
    return JSONResponse(content=jsonData)


# YAML FILES
@app.post('/send/yaml')
async def send_yaml(request: Request):
    content_type = request.headers.get('Content-Type')
    if not content_type or not content_type.startswith('text/yaml'):
        raise HTTPException(status_code=400, detail='Invalid content type')

    yamlData = await request.body()
    results = yaml.safe_load(yamlData.decode('utf-8'))
    return JSONResponse(content=results)

# XML FILES
@app.post('/send/xml')
async def send_xml(request: Request):
    # if not request.headers['Content-Type'] or not request.headers['Content-Type'].startswith('text/xml'):
    #     return JSONResponse({'error': 'Invalid content type'}, status_code=400)

    xmlData = await request.body()
    results = xmltodict.parse(xmlData.decode('utf-8'))
    return JSONResponse(content=results)
