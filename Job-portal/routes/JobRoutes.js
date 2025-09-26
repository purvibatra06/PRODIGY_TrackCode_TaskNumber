import express from 'express';
import { duplicateJob, filterJobs, getjobsbyCompany, getpaginatedJobs, isppublished, jobpost, updatejob } from '../weblayer/controllers/JobController.js';
const router = express.Router();

router.post('/postjob', jobpost);
router.patch('/updatejob/:id', updatejob);
router.post('/duplicate/:id', duplicateJob);
router.get('/published' , isppublished);
router.get('/bycompany/:companyId', getjobsbyCompany);
router.get('/paginatedjob',getpaginatedJobs);
router.post('/filteredjobs',filterJobs);
export default router;
