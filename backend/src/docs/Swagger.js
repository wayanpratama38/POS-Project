import swaggerAutogen from 'swagger-autogen';

const options = {
	info: {
		title: 'REST API POS',
		description: 'Description',
	},
	host: 'localhost:3000',
	swagger: '2.0',
};

const outputFile = './swagger-output.json';
const routes = [
	'../routes/Order.js',
	'../routes/Auth.js',
	'../routes/Product.js',
];

swaggerAutogen({swagger: '2.0'})(outputFile, routes, options);
