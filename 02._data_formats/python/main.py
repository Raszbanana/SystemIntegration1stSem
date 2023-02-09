# PARSING FILES WITH PYTHON
#
# PARSE TXT FILE
with open("../data/me.txt", "r") as f:
    stringOftest = f.read()

    name, age, hobbies = stringOftest.strip().split("\n")

    meObject = {
        "name": name,
        "age": age,
        "hobbies": hobbies.split(", "),
    }

    print("meObject by txt:", meObject)

# PARSE JSON FILE
import json
with open("../data/me.json", "r") as f:
    jsontest = json.load(f)

    meObject = jsontest

    print("meObject by json:", meObject)

# PARSE CSV FILE
import csv
with open("../data/me.csv", "r") as f:
    reader = csv.DictReader(f)

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
with open("../data/me.xml", "r") as file:
    xml_root = ET.fromstring(file.read())

me = {
"name": xml_root.find("name").text,
"age": xml_root.find("age").text,
"hobbies": [hobby.text for hobby in xml_root.find("hobbies")],
}

print("meObject by xml", me)

# PARSE YAML FILE
import yaml
with open("../data/me.yaml", "r") as f:
    meObject = yaml.load(f, Loader=yaml.FullLoader)

    print("meObject by yaml:", meObject)