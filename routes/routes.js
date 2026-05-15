import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

router.get('/experience', (req, res) => {
  res.sendFile(path.join(__dirname, './experience.html'));
});

// Page formation
router.get('/formation', (req, res) => {
  res.sendFile(path.join(__dirname, './formation.html'));
});


export default router;