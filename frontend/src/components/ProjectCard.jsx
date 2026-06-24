import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  return (
    <div className="project-card">
      <h2>{project?.title ?? 'Onbekende titel'}</h2>

      <p>Bedrijf: {project.company?.name ?? 'Onbekend bedrijf'}</p>

      <p>Startdatum: {project?.start_date ?? 'Onbekend'}</p>

      <p>{project?.description ?? 'Geen beschrijving beschikbaar.'}</p>

      <Link to={`/projects/${project?.id}`} className="project-card-link">
        Bekijk project
      </Link>
    </div>
  );
}

export default ProjectCard;
