import { useState } from "react";

import useResearchHistory from "../../hooks/useResearchHistory";

import SearchBar from "../../components/history/SearchBar";
import FilterBar from "../../components/history/FilterBar";
import HistoryCard from "../../components/history/HistoryCard";
import EmptyHistory from "../../components/history/EmptyHistory";
import DeleteModal from "../../components/history/DeleteModal";

import LoadingResearch from "../../components/research/LoadingResearch";

import toast from "react-hot-toast";

const ResearchHistory = () => {
  const {
    loading,
    research,
    search,
    setSearch,
    status,
    setStatus,
    removeResearch,
  } = useResearchHistory();

  const [selected, setSelected] =
    useState(null);

  const [deleting, setDeleting] =
    useState(false);

  const handleDelete = async () => {
    try {
      setDeleting(true);

      await removeResearch(selected._id);

      toast.success(
        "Research deleted."
      );

      setSelected(null);
    } catch (error) {
      toast.error(
        "Delete failed."
      );
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <LoadingResearch />;
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Research History
        </h1>

        <p className="text-slate-500">
          View all your research reports.
        </p>

      </div>

      <div className="flex flex-col gap-4 md:flex-row">

        <SearchBar
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <FilterBar
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        />

      </div>

      {research.length === 0 ? (
        <EmptyHistory />
      ) : (
        <div className="grid gap-6">

          {research.map((item) => (
            <HistoryCard
              key={item._id}
              research={item}
              onDelete={setSelected}
            />
          ))}

        </div>
      )}

      <DeleteModal
        open={!!selected}
        onClose={() =>
          setSelected(null)
        }
        onConfirm={handleDelete}
        loading={deleting}
      />

    </div>
  );
};

export default ResearchHistory;