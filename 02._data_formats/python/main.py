# PARSING FILES WITH PYTHON
#
# PARSE TXT FILE
with open("../data/me.txt") as file:
    stringOftest = file.read()

    name, age, hobbies = stringOftest.strip().split("\n")

    meObject = {
        "name": name,
        "age": age,
        "hobbies": hobbies.split(", "),
    }

    print("meObject by txt:", meObject)

# PARSE JSON FILE
import json
with open("../data/me.json") as file:
    jsontest = json.load(file)

    meObject = jsontest

    print("meObject by json:", meObject)

# PARSE CSV FILE
import csv
with open("../data/me.csv") as file:
    reader = csv.DictReader(file)

    meObject = [
        {
            "name": row["name"],
            "age": row["age"],
            "hobbies": row["hobbies"].split(","),
        }
        for row in reader
    ]

    print("meObject by csv:", meObject)

# PARSE XML FILE
import xml.etree.ElementTree as ET
with open("../data/me.xml") as file:
    rootElement = ET.fromstring(file.read())

me = {
"name": rootElement.find("name").text,
"age": rootElement.find("age").text,
"hobbies": [hobby.text for hobby in rootElement.find("hobbies")],
}

print("meObject by xml", me)

# PARSE YAML FILE
import yaml
with open("../data/me.yaml") as file:
    meObject = yaml.load(file, Loader=yaml.FullLoader)

    print("meObject by yaml:", meObject)