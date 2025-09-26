import Skills from '../dblayer/models/SkillsModel.js';

export async function insertSkills(skillsArray) {
  const results = [];
  for (const skill of skillsArray) {
    const easyTitle = skill.title.trim().toLowerCase();
    let existing = await Skills.findOne({ title: easyTitle });
    if (!existing) {
      try {
        const created = await Skills.create({ ...skill, title: easyTitle });
        results.push({ id: created._id, title: created.title, status: created.status });
      } catch (err) {
        if (err.code === 401) {
          existing = await Skills.findOne({ title: easyTitle });
          results.push("ALREADY EXISTS");
        }
      }
    } else {
        results.push("ALREADY EXISTS");
    }
  }
  return results;
}
