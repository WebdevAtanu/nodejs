import app from './app.js';
import databaseConnection from './database/db.js';
import { swaggerDocs } from './swagger.js';

const port = process.env.PORT || 5000;

async function startServer() {
	try {
		await databaseConnection();

		app.listen(port, () => {
			console.log(`Server running: http://localhost:${port}`);
			swaggerDocs(app);
		});

	} catch (error) {
		console.error('Failed to start server:', error.message);
		process.exit(1);
	}
}

startServer();
