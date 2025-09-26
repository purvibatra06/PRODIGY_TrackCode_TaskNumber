import { findjobsbycompanyId, ifpublished } from "../../dblayer/implementations/JobPostManager.js";
import { getfilteredJobs, JobDuplication, paginatedJobs, registerJob, updateJob } from "../../servicelayer/JobPostService.js";
import moment from "moment";

export const jobpost = async (req, res) => {
  try {
    const JobData = req.body;
    const job = await registerJob(JobData);
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updatejob = async (req, res) => {
  try {
    const jobid = req.params.id;
    const  {...updateData}  = req.body;
    const updated = await updateJob(jobid, updateData);
    res.status(200).json(updated);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const duplicateJob = async (req, res) => {
  const jobId = req.params.id;
  const updates = req.body;
  const duplicatedJob = await JobDuplication(jobId, updates);
  if (!duplicatedJob) {
    return res.status(404).json({ success: false, message: "Job not found" });
  }
  res.status(201).json({ success: true, job: duplicatedJob });
};

export const isppublished = async (req, res) => {
  const isPublished = req.query.isPublished === true;
  const Jobs = await ifpublished(isPublished);
  res.status(200).json({ Jobs });
};

export const getjobsbyCompany = async (req, res) => {
  const companyId = req.params.companyId;
  const jobs = await findjobsbycompanyId(companyId);
  res.status(200).json({ success: true, jobs });
};

export const getpaginatedJobs = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 1;
  const jobs = await paginatedJobs(page, limit );
  res.status(200).json(jobs);
};

export const filterJobs = async (req, res) => {
  const { page = 1, limit = 1, Gender, JobType,Tags, createdAfter } = req.body;
  const result = await getfilteredJobs({
    page: parseInt(page),
    limit: parseInt(limit),
    Gender,
    JobType,
    Tags,
    createdAfter
  });
  res.status(200).json(result);
};
