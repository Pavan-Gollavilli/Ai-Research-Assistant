import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  deleteResearch,
  getResearchHistory,
} from "../api/researchApi";

const useResearchHistory = () => {
  const [research, setResearch] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");

  const [status, setStatus] = useState("all");

  useEffect(() => {
    const query = searchParams.get("q");
    if (query !== null) {
      setSearch(query);
    }
  }, [searchParams]);

  const fetchResearch = async () => {
    try {
      setLoading(true);

      const res = await getResearchHistory();

      setResearch(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResearch();
  }, []);

  const filteredResearch = useMemo(() => {
    return research.filter((item) => {
      const matchesSearch =
        item.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "all" ||
        item.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [research, search, status]);

  const removeResearch = async (id) => {
    await deleteResearch(id);

    setResearch((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  return {
    loading,

    search,
    setSearch,

    status,
    setStatus,

    research: filteredResearch,

    removeResearch,

    refetch: fetchResearch,
  };
};

export default useResearchHistory;