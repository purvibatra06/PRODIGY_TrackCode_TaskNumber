import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
    required: true
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    required: true
  }
});

const Skills = mongoose.model('Skills', SkillSchema);
export default Skills;
