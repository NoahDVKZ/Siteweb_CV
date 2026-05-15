import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/routes.js';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`✅ Serveur en ligne sur http://localhost:${PORT}`);
});
