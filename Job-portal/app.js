import express from 'express';
import dotenv from 'dotenv';
import connectDB from './dblayer/implementations/EmployerManager.js';
import connectDB1 from './dblayer/implementations/JobPostManager.js';
import connectDB2 from './dblayer/implementations/SkillsManager.js';
import employerRoutes from './routes/EmployerRoutes.js';
import jobRoutes from './routes/JobRoutes.js';
import skillRoutes from './routes/SkillRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use('/api/company', employerRoutes);
app.use('/api/jobposts', jobRoutes);
app.use('/api/skills', skillRoutes);
app.use('/images', express.static(path.join(__dirname, 'public/images')));

Promise.all([connectDB(), connectDB1() , connectDB2]).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
  });
});
