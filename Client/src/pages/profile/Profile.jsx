import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import useProfile from "../../hooks/useProfile";

import PageHeader from "../../components/common/PageHeader";
import ProfileCard from "../../components/profile/ProfileCard";
import EditProfileModal from "../../components/profile/EditProfileModal";
import DangerZone from "../../components/profile/DangerZone";
import LoadingResearch from "../../components/research/LoadingResearch";

const Profile = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const {
    profile,
    loading,
    saving,
    deleting,
    saveProfile,
    removeAccount,
  } = useProfile();

  if (loading) {
    return <LoadingResearch />;
  }

  const handleSave = async (data) => {
    try {
      await saveProfile(data);
      toast.success("Profile updated successfully.");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      await removeAccount();
      await signOut(auth);
      toast.success("Account deleted.");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to delete account.");
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 sm:space-y-8 animate-fade-in-up">
      <PageHeader
        title="My Profile"
        subtitle="Manage your account settings, personal details, and security."
      />

      <div className="space-y-6 sm:space-y-8">
        <ProfileCard
          profile={profile}
          onEdit={() => setOpen(true)}
        />

        <DangerZone
          onDelete={handleDelete}
          loading={deleting}
        />
      </div>

      <EditProfileModal
        open={open}
        profile={profile}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        loading={saving}
      />
    </div>
  );
};

export default Profile;