import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";

import {
  auth,
  googleProvider,
} from "../firebase/firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";

import {
  syncUser,
  getProfile,
} from "../api/authApi";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const [loading, setLoading] = useState(true);

  /**
   * ==========================================
   * Synchronize Firebase User with Backend
   * ==========================================
   */
  const synchronizeUser = async (firebaseUser) => {
    try {
      // Refresh token (Axios interceptor will use it)
      await firebaseUser.getIdToken(true);

      // Sync user with backend
      await syncUser();

      // Get latest profile
      const profile = await getProfile();

      setCurrentUser(profile.data || null);
    } catch (error) {
      console.error(
        "Failed to synchronize user:",
        error
      );
      toast.error("Failed to connect to server. Please ensure backend is running.");
      await signOut(auth);
      setCurrentUser(null);
    }
  };

  /**
   * ==========================================
   * Register
   * ==========================================
   */
  const register = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (name) {
        await updateProfile(userCredential.user, { displayName: name });
      }
    } catch (error) {
      console.error("Register Error:", error);
      throw error;
    }
  };

  /**
   * ==========================================
   * Login
   * ==========================================
   */
  const login = async (
    email,
    password
  ) => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  };

  /**
   * ==========================================
   * Google Login
   * ==========================================
   */
  const googleLogin = async () => {
    try {
      await signInWithPopup(
        auth,
        googleProvider
      );
    } catch (error) {
      console.error(
        "Google Login Error:",
        error
      );
      throw error;
    }
  };

  /**
   * ==========================================
   * Logout
   * ==========================================
   */
  const logout = async () => {
    try {
      await signOut(auth);

      setCurrentUser(null);
    } catch (error) {
      console.error("Logout Error:", error);
      throw error;
    }
  };

  /**
   * ==========================================
   * Auto Login
   * ==========================================
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (firebaseUser) => {
        try {
          if (firebaseUser) {
            await synchronizeUser(firebaseUser);
          } else {
            setCurrentUser(null);
          }
        } finally {
          setLoading(false);
        }
      }
    );

    return unsubscribe;
  }, []);

  /**
   * ==========================================
   * Context Value
   * ==========================================
   */
  const value = useMemo(
    () => ({
      currentUser,
      loading,
      register,
      login,
      googleLogin,
      logout,
    }),
    [currentUser, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};