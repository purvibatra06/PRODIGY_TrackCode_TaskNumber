import { insertSkills } from '../../servicelayer/SkillService.js';
import mongoose from "mongoose";

const connectDB2 = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('Connection Error:', err);
    process.exit(1);
  }
};
export default connectDB2;

export const addSkills = async (skillsArray) => {
  return await insertSkills(skillsArray);
};
