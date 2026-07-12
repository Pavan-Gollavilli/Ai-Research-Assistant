import { useState } from "react";
import toast from "react-hot-toast";

import useResearchHistory from "../../hooks/useResearchHistory";
import PageHeader from "../../components/common/PageHeader";
import { SkeletonGrid } from "../../components/common/SkeletonCard";

import HistoryCard from "../../components/history/HistoryCard";
import FilterBar from "../../components/history/FilterBar";
import SearchBar from "../../components/history/SearchBar";
import DeleteModal from "../../components/history/DeleteModal";
import EmptyHistory from "../../components/history/EmptyHistory";

const ResearchHistory = () => {
  const {
    loading,
    search,
    setSearch,
    status,
    setStatus,
    research,
    removeResearch,
  } = useResearchHistory();

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedResearch, setSelectedResearch] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = (item) => {
    setSelectedResearch(item);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedResearch) return;
    
    setIsDeleting(true);
    try {
      await removeResearch(selectedResearch._id);
      toast.success("Research report deleted.");
      setDeleteModalOpen(false);
      setSelectedResearch(null);
    } catch (error) {
      toast.error("Failed to delete research report.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in-up">
      
      <PageHeader
        title="Research History"
        subtitle="Browse, filter, and manage your generated AI research reports."
      />

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <FilterBar
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </div>

      {/* Content Area */}
      <div>
        {loading ? (
          <SkeletonGrid count={6} cols={2} lines={2} header={true} />
        ) : research.length === 0 ? (
          <EmptyHistory isSearch={search !== "" || status !== "all"} />
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {research.map((item) => (
              <HistoryCard
                key={item._id}
                research={item}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={isDeleting}
      />

    </div>
  );
};

export default ResearchHistory;
