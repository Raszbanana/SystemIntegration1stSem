import express from 'express';
import Papa from 'papaparse';
import xml2js from 'xml2js';
import * as jsYaml from 'js-yaml';

const app = express();

// TXT FILES
app.post('/send/txt', (req, res, next) => {
  if (
    !req.headers['content-type'] ||
    !req.headers['content-type'].startsWith('text/plain')
  ) {
    const error = new Error('Invalid content type');
    error.statusCode = 400;
    return next(error);
  }

  let fileContents = '';

  req.on('data', (chunk) => {
    fileContents += chunk.toString();
  });

  req.on('end', () => {
    const lines = fileContents.trim().split('\n');
    const jsonData = JSON.stringify(lines);

    res.json(jsonData);
  });
});

// CSV FILES
app.post('/send/csv', (req, res, next) => {
  if (
    !req.headers['content-type'] ||
    !req.headers['content-type'].startsWith('text/csv')
  ) {
    const error = new Error('Invalid content type');
    error.statusCode = 400;
    return next(error);
  }

  const results = [];

  Papa.parse(req, {
    header: true,
    step: (row) => {
      results.push(row.data);
    },
    complete: () => {
      const jsonData = JSON.stringify(results);
      res.json(jsonData);
    },
    error: (err) => {
      next(err);
    },
  });

  req.on('error', (err) => {
    next(err);
  });
});

// JSON FILES
app.post('/send/json', (req, res, next) => {
  if (
    !req.headers['content-type'] ||
    !req.headers['content-type'].startsWith('application/json')
  ) {
    const error = new Error('Invalid content type');
    error.statusCode = 400;
    return next(error);
  }

  let jsonData = '';

  req.on('data', (chunk) => {
    jsonData += chunk;
  });

  req.on('end', () => {
    const results = JSON.parse(jsonData);
    res.json(results);
  });

  req.on('error', (err) => {
    next(err);
  });
});

// YAML FILES
app.post('/send/yaml', (req, res, next) => {
  if (
    !req.headers['content-type'] ||
    !req.headers['content-type'].startsWith('text/yaml')
  ) {
    const error = new Error('Invalid content type');
    error.statusCode = 400;
    return next(error);
  }
  let yamlData = '';

  req.on('data', (chunk) => {
    yamlData += chunk;
  });

  req.on('end', () => {
    try {
      const results = jsYaml.load(yamlData);
      res.json(results);
    } catch (err) {
      err.statusCode = 400;
      next(err);
    }
  });

  req.on('error', (err) => {
    next(err);
  });
});

// XML FILES
app.post('/send/xml', (req, res, next) => {
  // Gets error with postman even when it is a valid XML file? investigate
  //
  // if (!req.headers['content-type'] || !req.headers['content-type'].startsWith('text/xml')) {
  //   const error = new Error('Invalid content type');
  //   error.statusCode = 400;
  //   return next(error);
  // }

  let xmlData = '';

  req.on('data', (chunk) => {
    xmlData += chunk;
  });

  req.on('end', () => {
    xml2js.parseString(xmlData, (err, results) => {
      if (err) {
        err.statusCode = 400;
        return next(err);
      }

      res.json(results);
    });
  });

  req.on('error', (err) => {
    next(err);
  });
});

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
