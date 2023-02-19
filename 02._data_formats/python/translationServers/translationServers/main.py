from flask import Flask, request, jsonify
import csv
import json
import yaml
import xmltodict

app = Flask(__name__)

# TXT FILES
@app.route('/send/txt', methods=['POST'])
def send_txt():
    if not request.headers['Content-Type'] or not request.headers['Content-Type'].startswith('text/plain'):
        return jsonify({'error': 'Invalid content type'}), 400

    file_contents = request.data.decode('utf-8')
    lines = file_contents.strip().split('\n')
    jsonData = json.dumps(lines)
    return jsonData


# CSV FILES
@app.route('/send/csv', methods=['POST'])
def send_csv():
    if not request.headers['Content-Type'] or not request.headers['Content-Type'].startswith('text/csv'):
        return jsonify({'error': 'Invalid content type'}), 400

    results = []
    reader = csv.DictReader(
        request.files['file'].read().decode('utf-8').splitlines())

    for row in reader:
        results.append(row)

    jsonData = json.dumps(results)
    return jsonData


# JSON FILES
@app.route('/send/json', methods=['POST'])
def send_json():
    if not request.headers['Content-Type'] or not request.headers['Content-Type'].startswith('application/json'):
        return jsonify({'error': 'Invalid content type'}), 400

    jsonData = request.data.decode('utf-8')
    results = json.loads(jsonData)
    return jsonify(results)


# YAML FILES
@app.route('/send/yaml', methods=['POST'])
def send_yaml():
    if not request.headers['Content-Type'] or not request.headers['Content-Type'].startswith('text/yaml'):
        return jsonify({'error': 'Invalid content type'}), 400

    yamlData = request.data.decode('utf-8')
    results = yaml.safe_load(yamlData)
    return jsonify(results)

# XML FILES
@app.route('/send/xml', methods=['POST'])
def send_xml():
    # if not request.headers['Content-Type'] or not request.headers['Content-Type'].startswith('text/xml'):
    #     return jsonify({'error': 'Invalid content type'}), 400

    xmlData = request.data.decode('utf-8')
    results = xmltodict.parse(xmlData)
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)