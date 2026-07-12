import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import AuthLayout from "../../components/auth/AuthLayout";
import Button from "../../components/common/Button";

const Login = () => {
  const navigate  = useNavigate();
  const { login, googleLogin, currentUser, loading: authLoading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  /* Redirect if already authenticated */
  useEffect(() => {
    if (!authLoading && currentUser) navigate("/dashboard", { replace: true });
  }, [currentUser, authLoading, navigate]);

  /* ── Email / Password Login ─── */
  const onSubmit = async ({ email, password }) => {
    try {
      await login(email, password);
    } catch (err) {
      const msg = err?.code === "auth/invalid-credential"
        ? "Invalid email or password."
        : err?.message ?? "Login failed. Please try again.";
      toast.error(msg);
    }
  };

  /* ── Google Login ─── */
  const handleGoogleLogin = async () => {
    try {
      setGoogleLoading(true);
      await googleLogin();
    } catch (err) {
      if (err?.code !== "auth/popup-closed-by-user") {
        toast.error("Google sign-in failed. Please try again.");
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  if (authLoading) return null;

  return (
    <AuthLayout>
      <div className="animate-fade-in-up">

        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Welcome back</h2>
          <p className="mt-1.5 text-sm text-slate-500">
            Sign in to your account to continue researching.
          </p>
        </div>

        {/* Google Sign-In */}
        <Button
          fullWidth
          variant="outline"
          size="lg"
          loading={googleLoading}
          onClick={handleGoogleLogin}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="18px" height="18px">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
              <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
            </svg>
          }
        >
          Continue with Google
        </Button>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs font-medium text-slate-400">or sign in with email</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">

          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-slate-700">
              Email address
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                {...register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address.",
                  },
                })}
                className={[
                  "w-full rounded-xl border bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900",
                  "placeholder:text-slate-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                  errors.email ? "border-red-400 bg-red-50" : "border-slate-300",
                ].join(" ")}
              />
            </div>
            {errors.email && (
              <p className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="password" className="text-sm font-medium text-slate-700">
                Password
              </label>
            </div>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="••••••••"
                {...register("password", {
                  required: "Password is required.",
                  minLength: { value: 6, message: "Password must be at least 6 characters." },
                })}
                className={[
                  "w-full rounded-xl border bg-white py-2.5 pl-10 pr-11 text-sm text-slate-900",
                  "placeholder:text-slate-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                  errors.password ? "border-red-400 bg-red-50" : "border-slate-300",
                ].join(" ")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1.5 text-xs text-red-600">{errors.password.message}</p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            fullWidth
            size="lg"
            loading={isSubmitting}
          >
            Sign In
          </Button>
        </form>

        {/* Register link */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-700 hover:underline transition"
          >
            Create one free
          </Link>
        </p>

      </div>
    </AuthLayout>
  );
};

export default Login;