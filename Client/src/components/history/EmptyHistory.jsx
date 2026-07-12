import { FileSearch } from "lucide-react";
import { Link } from "react-router-dom";
import EmptyState from "../common/EmptyState";
import Button from "../common/Button";

const EmptyHistory = ({ isSearch = false }) => {
  return (
    <EmptyState
      icon={<FileSearch size={40} />}
      title={isSearch ? "No matching results" : "No Research Found"}
      description={
        isSearch 
          ? "We couldn't find any research matching your search criteria. Try adjusting your filters or search terms."
          : "You haven't generated any research reports yet. Start your first research to see it here."
      }
      action={
        !isSearch && (
          <Link to="/research/create">
            <Button size="lg">Create New Research</Button>
          </Link>
        )
      }
    />
  );
};

export default EmptyHistory;