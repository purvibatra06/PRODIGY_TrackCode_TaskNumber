import mongoose from 'mongoose';
import uploadLogo from '../../weblayer/middlewares/uploadLogoMiddleware.js';

const employerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  Name: String,
  about: String,
  vision: String,
  Links: {
    website: String,
    instagram: String,
    facebook: String,
    linkedin: String
  },
  headOffice:{
    address: String,
    city: String,
    state: String,
    country: String,
    pincode: Number
  },
  industry: String,
  subIndustry: String,
  employeeCount: Number,
  yearFounded: Number,
  awards: [String],
  activeJobPosts: [String],
  logoUrl: { type: String , ref: uploadLogo}
});

const Employer = mongoose.model('Employer', employerSchema);
export default Employer;
