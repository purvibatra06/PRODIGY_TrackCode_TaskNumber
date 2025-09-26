import jwt from 'jwt-simple';
import moment from 'moment';
import {createEmployer,findEmployerByEmail,findEmployerById,updateEmployer} from '../dblayer/implementations/EmployerManager.js';
import bcrypt from 'bcrypt';
const secret = 'help';
const generateToken = (employer) => {
  const payload = {
    id: employer._id,
    email: employer.email,
    exp: moment().add(1, 'd').unix()
   };
  return jwt.encode(payload, secret);
};
const saltRounds = 10;

export const registerEmployer = async (employerData) => {
  const existing = await findEmployerByEmail(employerData.email);
  if (existing) throw new Error("Employer already exists");
  const hashedPassword = await bcrypt.hash(employerData.password, saltRounds);
  employerData.password = hashedPassword;
  return await createEmployer(employerData);
};

export const loginEmployer = async (email, password) => {
  const employer = await findEmployerByEmail(email);
  if (!employer || employer.password !== password);  
  const isMatch = await bcrypt.compare(password, employer.password);
  if (!isMatch) throw new Error("Invalid credentials");
  const token = generateToken(employer);
  return {employer,token};
};

export const updateEmployerProfile = async (_id, updateData) => {
  const employer = await findEmployerById(_id);
  if (!employer)
  return new Error("Invalid Request");   
  else{
  return await updateEmployer(_id, updateData);
   }
};
