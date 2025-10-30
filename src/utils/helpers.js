export const getSubmissionStats = (assignmentId, students) => {
  const submitted = students.filter(s => s.submissions[assignmentId]).length;
  const total = students.length;
  return { 
    submitted, 
    total, 
    percentage: total ? (submitted / total) * 100 : 0 
  };
};