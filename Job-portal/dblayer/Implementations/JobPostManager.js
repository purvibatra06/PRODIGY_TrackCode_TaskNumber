import mongoose from 'mongoose';
import Jobs from '../models/JobPostModel.js';

const connectDB1 = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('Connection Error:', err);
    process.exit(1);
  }
};
export default connectDB1;

export const createJob = async (data) => {
  const Job = new Jobs(data);
  return await Job.save();
};

export const findJobByTitle = async (Title) => {
  return await Jobs.findOne({ Title });
};

export const findjobpostById = async (_id) => {
  return await Jobs.findOne({ _id });
};

export const updateJobpost = async (_id, updateData) => {
  return await Jobs.findOneAndUpdate({ _id }, updateData, { new: true });
};

export const duplicateJobPost = async (jobId, updates = {}) => {
  const original = await Jobs.findById(jobId).lean();
  if (!original) return null;
  delete original._id;
  const newJobData = { ...original, ...updates };
  const newJob = await Jobs.create(newJobData);
  return newJob;
};

export const ifpublished = async (isPublished) => {
  if (isPublished === true) {
    const jobs = await Jobs.find({ isPublished: true });
    return jobs;
  } else {
    return Jobs.find({ isPublished: false});
  }
};


export const findjobsbycompanyId = async (companyId) => {
  const id = new mongoose.Types.ObjectId(companyId);
  return await Jobs.find({ companyId : id });
};
