const swaggerOutput = {
	swagger: '2.0',
	info: {
		title: 'REST API POS',
		description: 'Description',
		version: '1.0.0',
	},
	host: 'localhost:3000',
	basePath: '/',
	schemes: ['http'],
	paths: {
		'/api/orders': {
			post: {
				description: '',
				responses: {
					201: {
						description: 'Created',
					},
				},
			},
			get: {
				description: '',
				responses: {
					200: {
						description: 'OK',
					},
				},
			},
		},
		'/api/orders/{id}': {
			get: {
				description: '',
				parameters: [
					{
						name: 'id',
						in: 'path',
						required: true,
						type: 'string',
					},
				],
				responses: {
					200: {
						description: 'OK',
					},
				},
			},
		},
		'/api/users/register': {
			post: {
				description: '',
				parameters: [
					{
						name: 'body',
						in: 'body',
						schema: {
							type: 'object',
							properties: {
								fullname: {
									example: 'any',
								},
								username: {
									example: 'any',
								},
								password: {
									example: 'any',
								},
							},
						},
					},
				],
				responses: {
					201: {
						description: 'Created',
					},
				},
			},
		},
		'/api/users/login': {
			post: {
				description: '',
				parameters: [
					{
						name: 'body',
						in: 'body',
						schema: {
							type: 'object',
							properties: {
								username: {
									example: 'any',
								},
								password: {
									example: 'any',
								},
							},
						},
					},
				],
				responses: {
					200: {
						description: 'OK',
					},
				},
			},
		},
		'/api/products': {
			post: {
				description: '',
				parameters: [
					{
						name: 'body',
						in: 'body',
						schema: {
							type: 'object',
							properties: {
								name: {
									example: 'any',
								},
								image: {
									example: 'any',
								},
								price: {
									example: 'any',
								},
								type: {
									example: 'any',
								},
							},
						},
					},
				],
				responses: {
					201: {
						description: 'Created',
					},
				},
			},
			get: {
				description: '',
				responses: {
					200: {
						description: 'OK',
					},
				},
			},
		},
		'/api/products/bulk': {
			post: {
				description: '',
				responses: {
					201: {
						description: 'Created',
					},
				},
			},
		},
		'/api/products/{id}': {
			get: {
				description: '',
				parameters: [
					{
						name: 'id',
						in: 'path',
						required: true,
						type: 'string',
					},
				],
				responses: {
					200: {
						description: 'OK',
					},
				},
			},
			patch: {
				description: '',
				parameters: [
					{
						name: 'id',
						in: 'path',
						required: true,
						type: 'string',
					},
				],
				responses: {
					200: {
						description: 'OK',
					},
				},
			},
			delete: {
				description: '',
				parameters: [
					{
						name: 'id',
						in: 'path',
						required: true,
						type: 'string',
					},
				],
				responses: {
					200: {
						description: 'OK',
					},
				},
			},
		},
		'/refresh': {
			post: {
				description: '',
				responses: {
					201: {
						description: 'Created',
					},
				},
			},
		},
	},
};

export default swaggerOutput;
