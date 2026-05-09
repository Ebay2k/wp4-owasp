import Navbar from "./components/Navbar";
import ProjectCard from "./components/ProjectCard";

function App() {
  return (
    <div>
      <Navbar />

      <main className="dashboard">
        <h2>Afstudeerprojecten</h2>

        <div className="project-grid">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </main>
    </div>
  );
}

export default App;
