import mongoose from 'mongoose';
import Employer from './EmployerModel.js';
import Skills from './SkillsModel.js';

const JobSchema = new mongoose.Schema({
  Title: { type: String, required: true, unique: true },
  companyId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: Employer,  
  required: true
  },
  description: String,
  Responsibilities : [String],
  Qualifications : [String],
  Skills : [{
    type : mongoose.Schema.Types.ObjectId,
    ref: Skills,
    required: true
  }],
  SalaryRange : String,
  JobType : {
    type: String,
    enum: {
    values: ["Remote Work", "Regular Work", "Contract Work"],
    message: "{VALUE} is not supported. Choose Remote Work, Regular Work, or Contract Work."
        },
    required: true
  },
  Openings: Number,
  Gender: {
    type : String, 
    enum : ["Male" , "Female" , "Transgender" , "No Preference"],
    required : true
  },
  Tags: {
    type : [String], 
    enum : ["Urgent" , "Hot Job" , "Experienced" , "Be an Early Applicant" , "Others"],
    required : false
  },
  Jobstatus : {
    type : String, 
    enum : ["Active" , "Inactive" , "Expired"],
    required : true
  }, 
expiryDate: {
  type: Date,
  required: true,
  index: { expires: 0 } //"expiryDate": "2025-07-09T18:00:00Z"
},
isPublished: {
  type: Boolean,
  default: false
}
},{timestamps : true});

const Jobs = mongoose.model('Job-Postings', JobSchema);
export default Jobs;
