import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "../common/Modal";

const EditProfileModal = ({
  open,
  profile,
  onClose,
  onSave,
  loading,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (profile && open) {
      reset({
        name: profile.name || "",
        photoURL: profile.photoURL || "",
      });
    }
  }, [profile, reset, open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      onConfirm={handleSubmit(onSave)}
      loading={loading}
      title="Edit Profile"
      confirmText="Save Changes"
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Full Name
          </label>
          <input
            id="name"
            {...register("name", { required: "Name is required" })}
            className={[
              "w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-900",
              "transition outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
              errors.name ? "border-red-400" : "border-slate-200"
            ].join(" ")}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label htmlFor="photoURL" className="block text-sm font-medium text-slate-700">
            Photo URL (Optional)
          </label>
          <input
            id="photoURL"
            {...register("photoURL")}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 transition outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            placeholder="https://example.com/photo.jpg"
          />
          <p className="text-xs text-slate-500 mt-1">
            Leave blank to use a generated avatar based on your name.
          </p>
        </div>
        
      </form>
    </Modal>
  );
};

export default EditProfileModal;