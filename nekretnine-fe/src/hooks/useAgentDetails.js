import { useState, useEffect } from "react";
import axios from "axios";

const useAgentDetails = (id) => {
  const [agent, setAgent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/agents/${id}`)
      .then((response) => {
        setAgent(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching agent details:", error);
        setError("Failed to load agent details.");
        setLoading(false);
      });
  }, [id]);

  return { agent, loading, error };
};

export default useAgentDetails;
