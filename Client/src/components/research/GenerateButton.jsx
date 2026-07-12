import { Sparkles } from "lucide-react";
import Button from "../common/Button";

const GenerateButton = ({ loading }) => {
  return (
    <Button
      type="submit"
      loading={loading}
      fullWidth
      size="lg"
      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
      icon={!loading && <Sparkles size={18} />}
    >
      {loading ? "Generating Research..." : "Generate Research"}
    </Button>
  );
};

export default GenerateButton;