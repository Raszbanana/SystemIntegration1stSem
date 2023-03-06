import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
const app = express();
const cars = [
  { id: 1, model: 'M3', brand: 'BMW', price: '200.000$', color: 'blue' },
  { id: 2, model: '911', brand: 'Porsche', price: '250.000$', color: 'red' },
  {
    id: 3,
    model: 'Mustang',
    brand: 'Ford',
    price: '100.000$',
    color: 'yellow',
  },
  {
    id: 4,
    model: 'Corvette',
    brand: 'Chevrolet',
    price: '150.000$',
    color: 'black',
  },
  { id: 5, model: 'GTR', brand: 'Nissan', price: '300.000$', color: 'silver' },
  {
    id: 6,
    model: 'Chiron',
    brand: 'Bugatti',
    price: '3.000.000$',
    color: 'blue',
  },
  {
    id: 7,
    model: 'Aventador',
    brand: 'Lamborghini',
    price: '400.000$',
    color: 'green',
  },
  {
    id: 8,
    model: 'Veyron',
    brand: 'Bugatti',
    price: '2.500.000$',
    color: 'orange',
  },
  {
    id: 9,
    model: 'Camaro',
    brand: 'Chevrolet',
    price: '70.000$',
    color: 'yellow',
  },
  { id: 10, model: 'A8', brand: 'Audi', price: '150.000$', color: 'black' },
];
/**
 * @openapi
 * /cars:
 *   get:
 *     summary: Returns a list of cars
 *     responses:
 *       200:
 *         description: A list of cars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 */
app.get('/cars', (req, res) => {
  console.log(cars);
  res.json(cars);
});

/**
 * @swagger
 * /cars/{id}:
 *   get:
 *     summary: Returns a car by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the car to retrieve
 *     responses:
 *       200:
 *         description: The car with the specified ID
 *         content:
 *           application/json:
 *       404:
 *         description: Car not found
 */
app.get('/cars/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const car = cars.find((c) => c.id === id);
  if (car) {
    res.json(car);
  } else {
    res.status(404).json({ message: 'Car not found' });
  }
});

/**
 * @swagger
 * /cars/color/{color}:
 *   get:
 *     summary: Returns a list of all cars with the specified color
 *     parameters:
 *       - name: color
 *         in: path
 *         description: Color of the cars to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of cars with the specified color
 *       404:
 *         description: No cars found with that color
 */
app.get('/cars/color/:color', (req, res) => {
  const color = req.params.color;
  const matchingCars = cars.filter((c) => c.color === color);
  if (matchingCars.length > 0) {
    res.json(matchingCars);
  } else {
    res.status(404).json({ message: 'No cars found with that color' });
  }
});

/**
 * @swagger
 * /cars/model/{model}:
 *   get:
 *     summary: Returns a list of all cars with the specified model
 *     parameters:
 *       - name: model
 *         in: path
 *         description: model of the cars to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of cars with the specified model
 *       404:
 *         description: No cars found with that model
 */
app.get('/cars/model/:model', (req, res) => {
  const model = req.params.model;
  const matchingCars = cars.filter((c) => c.model === model);
  if (matchingCars.length > 0) {
    res.json(matchingCars);
  } else {
    res.status(404).json({ message: 'No cars found with that model' });
  }
});

/**
 * @openapi
 * /cars/brand/{brand}:
 *   get:
 *     summary: Returns a list of all cars with the specified brand
 *     parameters:
 *       - name: brand
 *         in: path
 *         description: Brand of the cars to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of cars with the specified brand
 *       404:
 *         description: No cars found with that brand
 */
app.get('/cars/brand/:brand', (req, res) => {
  const brand = req.params.brand;
  const matchingCars = cars.filter((c) => c.brand === brand);
  if (matchingCars.length > 0) {
    res.json(matchingCars);
  } else {
    res.status(404).json({ message: 'No cars found with that brand' });
  }
});

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'OpenAPI Example API',
    version: '1.0.0',
    description: 'A simple Express API that utilizes OpenAPI',
  },
};

const options = {
  swaggerDefinition,
  apis: ['./app.js'],
};

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
