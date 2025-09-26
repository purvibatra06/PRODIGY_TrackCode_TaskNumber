import express from 'express';
const router = express.Router();
import { insertSkills } from '../weblayer/controllers/SkillController.js';

router.post('/', insertSkills);
export default router;
