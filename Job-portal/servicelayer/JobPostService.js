import { createJob , duplicateJobPost, findJobByTitle, findjobpostById, updateJobpost} from '../dblayer/implementations/JobPostManager.js';
import Jobs from '../dblayer/models/JobPostModel.js';
import moment from 'moment';

export const registerJob = async (JobData) => {
  const existing = await findJobByTitle(JobData.Title);
  if (existing) throw new Error("Job already made");
  return await createJob(JobData);
};

export const updateJob = async (_id, updateData) => {
  const thejob = await findjobpostById(_id);
  if (!thejob);   
  return await updateJobpost(_id, updateData);
};

export const JobDuplication = async (jobId, updates) => {
  const job = await duplicateJobPost(jobId, updates);
  return job;
};

export const paginatedJobs = async (page, limit ) => {
  const skip = (page - 1) * limit;
  const jobs = await Jobs.find()
    .skip(skip)
    .limit(limit)
    .populate('companyId')
    return jobs;
};

export const getfilteredJobs = async ({ page, limit, Gender, JobType,Tags ,createdAfter }) => {
  const skip = (page - 1) * limit;
  const filter = {};
  if (Gender) {
    filter.Gender = Gender;
  }
  if (JobType) {
    filter.JobType = JobType;
  }
  if(Tags?.length){
    filter.Tags=Tags;
  }
  if (createdAfter) {
    filter.createdAt = { $gte: new Date(createdAfter) };
  }

  const jobs = await Jobs.find(filter)
    .skip(skip)
    .limit(limit)
    .populate('companyId')
  return jobs;
};
