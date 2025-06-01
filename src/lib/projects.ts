export type Project = {
  id: string;
  title: string;
  location: string;
  capacity: number;
  status: string;
};


export function getProjects(): Project[] {
  if (typeof window === 'undefined') return []; 
  return JSON.parse(localStorage.getItem('projects') || '[]');
}


export function saveProjects(projects: Project[]) {
  localStorage.setItem('projects', JSON.stringify(projects));
}


export function addProject(project: Project) {
  const projects = getProjects();
  projects.push(project);
  saveProjects(projects);
}
