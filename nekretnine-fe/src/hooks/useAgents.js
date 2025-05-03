import { useState, useEffect } from "react";
import axios from "axios";

const useAgents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/agents")
      .then((response) => {
        setAgents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching agents:", error);
        setError("Failed to load agents.");
        setLoading(false);
      });
  }, []);

  return { agents, loading, error };
};

export default useAgents;
