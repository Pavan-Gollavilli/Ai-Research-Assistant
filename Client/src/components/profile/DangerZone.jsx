import { Trash2, AlertTriangle } from "lucide-react";
import Button from "../common/Button";

const DangerZone = ({ onDelete, loading }) => {
  return (
    <section className="rounded-2xl border border-red-200 bg-red-50 p-6 sm:p-8">
      
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 text-red-600">
          <AlertTriangle size={20} />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-red-700">
          Danger Zone
        </h2>
      </div>

      <p className="mt-4 text-sm sm:text-base text-red-800 leading-relaxed max-w-2xl font-medium">
        Deleting your account will permanently remove all your research history, generated reports, and profile settings. This action cannot be reversed.
      </p>

      <div className="mt-6">
        <Button
          variant="danger"
          disabled={loading}
          loading={loading}
          onClick={onDelete}
          icon={<Trash2 size={16} />}
        >
          Delete Account
        </Button>
      </div>

    </section>
  );
};

export default DangerZone;