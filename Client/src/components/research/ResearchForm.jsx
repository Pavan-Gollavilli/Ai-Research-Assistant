import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import InputField from "./InputField";
import SelectField from "./SelectField";
import GenerateButton from "./GenerateButton";

import { createResearch } from "../../api/researchApi";

const ResearchForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      topic: "",
      category: "Artificial Intelligence",
      language: "English",
      difficulty: "Intermediate",
      citationStyle: "APA",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await createResearch(data);
      toast.success("Research generated successfully!");
      reset();
      navigate(`/research/${response.data._id}`);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to generate research."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8" noValidate>
      
      <div className="space-y-5">
        <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2">
          Basic Details
        </h3>
        <InputField
          label="Research Title"
          name="title"
          register={register}
          errors={errors}
          placeholder="e.g. The Future of Quantum Computing"
        />

        <InputField
          label="Research Topic"
          name="topic"
          register={register}
          errors={errors}
          placeholder="e.g. Explore how quantum supremacy affects modern cryptography..."
        />
      </div>

      <div className="space-y-5">
        <h3 className="text-lg font-semibold text-slate-800 border-b border-slate-100 pb-2">
          Configuration
        </h3>
        
        <div className="grid gap-5 sm:grid-cols-2">
          <SelectField
            label="Category"
            name="category"
            register={register}
            errors={errors}
            options={[
              "Artificial Intelligence",
              "Machine Learning",
              "Deep Learning",
              "Healthcare",
              "Finance",
              "Education",
              "Cyber Security",
              "Blockchain",
              "Cloud Computing",
              "General",
            ]}
          />

          <SelectField
            label="Language"
            name="language"
            register={register}
            errors={errors}
            options={["English", "Hindi", "Telugu"]}
          />

          <SelectField
            label="Difficulty"
            name="difficulty"
            register={register}
            errors={errors}
            options={["Beginner", "Intermediate", "Advanced"]}
          />

          <SelectField
            label="Citation Style"
            name="citationStyle"
            register={register}
            errors={errors}
            options={["APA", "MLA", "IEEE"]}
          />
        </div>
      </div>

      <div className="pt-2">
        <GenerateButton loading={loading} />
      </div>

    </form>
  );
};

export default ResearchForm;