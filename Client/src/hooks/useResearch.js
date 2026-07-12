import { useEffect, useState } from "react";
import { getResearchById } from "../api/researchApi";

const useResearch = (id) => {
  const [research, setResearch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchResearch = async () => {
    try {
      setLoading(true);

      const data = await getResearchById(id);

      setResearch(data.data);
      setError("");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Failed to fetch research."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchResearch();
  }, [id]);

  return {
    research,
    loading,
    error,
    refetch: fetchResearch,
  };
};

export default useResearch;