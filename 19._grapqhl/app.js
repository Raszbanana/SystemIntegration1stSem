import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import fs from 'fs';

import { root } from './graphql.root.js';

const schemaString = fs.readFileSync('schema.graphql', 'utf8');
const schema = buildSchema(schemaString);

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log('GraphQL server running on http://localhost:3000/graphql');
});
