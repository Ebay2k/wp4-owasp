import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Dashboard</h1>

      <ul>
        <li>Home</li>
        <li><Link to="/SavedProjects">Opgeslagen</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
