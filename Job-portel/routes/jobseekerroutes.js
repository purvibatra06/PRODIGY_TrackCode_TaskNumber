const express = require('express');
const router = express.Router();
const  upload  = require('../weblayer/Middlewares/authmiddleware.js');
const { createUser,deleteProfile,getProfileById,getAllProfiles,updateProfile} = require('../weblayer/controllers/jobseekercontroller.js');

const cpUpload = upload.single('resume');
router.post('/profile', cpUpload, createUser);
router.delete('/delete/:id', deleteProfile);
router.get('/get/:id', getProfileById);
router.get('/AllProfiles', getAllProfiles);
router.put('/updateProfile/:id', updateProfile);

module.exports = router;
