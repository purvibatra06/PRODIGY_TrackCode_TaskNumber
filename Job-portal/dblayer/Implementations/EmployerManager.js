import mongoose from 'mongoose';
import Employer from '../models/EmployerModel.js';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('Connection Error:', err);
    process.exit(1);
  }
};
export default connectDB;

export const createEmployer = async (data) => {
  const employer = new Employer(data);
  return await employer.save();
};

export const findEmployerByEmail = async (email) => {
  return await Employer.findOne({ email });
};

export const findEmployerById = async (_id) => {
  return await Employer.findOne({ _id });
};

export const updateEmployer = async (_id, updateData) => {
  return await Employer.findOneAndUpdate({ _id }, updateData, { new: true });
};

export const findByIdAndDelete = async(_id) => {
  return await Employer.findOneAndDelete({_id});
};
