import { Link } from "react-router-dom";

function ProjectCard() {
  return (
    <div className="project-card">
      <h2>Afstudeerproject: AI voor Duurzaamheid</h2>

      <p>Bedrijf: GreenTech Solutions</p>

      <p>Locatie: Amsterdam</p>

      <p>
        Werk aan een AI-project bij een innovatief bedrijf gericht op
        duurzaamheid.
      </p>

      <Link to="/projects/1" className="project-card-link">
        Bekijk project
      </Link>
    </div>
  );
}

export default ProjectCard;
