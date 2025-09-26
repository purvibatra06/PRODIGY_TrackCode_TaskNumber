import { addSkills } from "../../dblayer/implementations/SkillsManager.js";

export const insertSkills = async (req, res) => {
  try {
    const skills = req.body.skills;
    if (!Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({ error: 'skills must contain a value' });
    }
    const result = await addSkills(skills);
    res.status(201).json({ Skills: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
