import { useEffect, useState } from "react";

const [projects, setProjects] = useState([]);

useEffect(() => {

  const savedProjects =
    JSON.parse(localStorage.getItem("savedProjects")) || [];

  setProjects(savedProjects);

}, []);
