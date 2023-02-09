// PARSING FILES WITH JAVASCRIPT
//
import * as fs from 'fs';

// PARSE TXT FILE
fs.readFile('../data/me.txt', 'utf-8', (err, data) => {
  if (err) throw err;

  const stringOftest = data;

  const [name, age, hobbies] = stringOftest.split('\n').map((x) => x.trim());

  const meObject = {
    name,
    age,
    hobbies: hobbies.split(', '),
  };

  console.log('meObject by txt', meObject);
});

// PARSE JSON FILE
fs.readFile('../data/me.json', 'utf-8', (err, data) => {
  if (err) throw err;

  const jsontest = JSON.parse(data);
  const meObject = {
    ...jsontest,
  };

  console.log('meObject by json', meObject);
});

// PARSE CSV
import Papa from 'papaparse';

fs.readFile('../data/me.csv', 'utf-8', (err, data) => {
  if (err) throw err;

  const results = Papa.parse(data, {
    header: true,
  });

  const meObject = results.data.map((row) => ({
    ...row,
    hobbies: row.hobbies.split(','),
  }));

  console.log('meObject by csv', meObject);
});

// PARSE XML
import xml2js from 'xml2js';

fs.readFile('../data/me.xml', 'utf-8', (err, data) => {
  if (err) throw err;

  xml2js.parseString(data, (err, result) => {
    if (err) throw err;

    const meObject = {
      name: result.me.name[0],
      age: result.me.age[0],
      hobbies: result.me.hobbies[0].hobby,
    };

    console.log('meObject by xml', meObject);
  });
});

// PARSE YAML
import * as jsYaml from 'js-yaml';

fs.readFile('../data/me.yaml', 'utf-8', (err, data) => {
  if (err) throw err;

  const meObject = jsYaml.load(data);

  console.log('meObject by yaml', meObject);
});
