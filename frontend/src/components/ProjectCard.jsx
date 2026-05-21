import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <h2>{project.title}</h2>

      <p>Bedrijf: {project.company.name}</p>

      <p>Startdatum: {project.start_date}</p>

      <p>{project.description}</p>

      <Link to={`/projects/${project.id}`} className="project-card-link">
        Bekijk project
      </Link>
    </div>
  );
}

export default ProjectCard;
