import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
  deleteAccount,
} from "../api/authApi";

const useProfile = () => {
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [deleting, setDeleting] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await getProfile();

      setProfile(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async (data) => {
    try {
      setSaving(true);

      const res = await updateProfile(data);

      setProfile(res.data);

      return res;
    } finally {
      setSaving(false);
    }
  };

  const removeAccount = async () => {
    try {
      setDeleting(true);

      await deleteAccount();
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,

    loading,

    saving,

    deleting,

    saveProfile,

    removeAccount,

    refetch: fetchProfile,
  };
};

export default useProfile;