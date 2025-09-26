import { findEmployerById , findByIdAndDelete } from '../../dblayer/implementations/EmployerManager.js';
import {registerEmployer,loginEmployer,updateEmployerProfile} from '../../servicelayer/EmployerService.js';

export const register = async (req, res) => {
  try {
    const employerData = req.body;
    if (req.file) {
      employerData.logoUrl = `/images/uploads/company-logo/${req.file.filename}`;
    }
    const employer = await registerEmployer(employerData);
    res.status(201).json(employer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const {employer,token} = await loginEmployer(email, password);
    res.status(200).json({employer,token});
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const companyid = req.params.id;
    const { ...updateData } = req.body;
    if (req.file) {
      updateData.logoUrl = `/images/uploads/company-logo/${req.file.filename}`;
    }
    const updated = await updateEmployerProfile(companyid, updateData);
    res.status(200).json(updated);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

export const profile = async (req, res) => {
  const employerId = req.employer.id;
  const employerData = await findEmployerById(employerId);
  res.json({
    message: 'Profile found successfully',
    employer: employerData
  });
};

export const delete1 = async (req, res) => {
  const companyid = req.params.id;
  try {
    if (!companyid) {
      return res.json({ message: "User not found" });
    }
    const removedEmployer = await findByIdAndDelete(companyid, req.body, { new: true });
    res.json({message: "User deleted successfully", employer: removedEmployer
    });
  } catch (err) {
    res.json({ message: "Something went wrong", error: err.message });
  }
};
