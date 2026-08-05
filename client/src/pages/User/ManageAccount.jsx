import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {USER_API_END_POINT} from "../../utils/Host"
import { toast } from "react-hot-toast";

import {
  Mail,
  Lock,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  Loader2,
  LogIn,
  ShieldAlert,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { setUser } from '../../features/auth/authSlice';

const ManageAccount = ({ user: propUser, onUserLogout, onUserUpdate }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Select user from Redux store, falling back to propUser if available
  const reduxUser = useSelector((state) => state.auth?.user);
  const currentUser = reduxUser || propUser;

  // Component States

  const [email, setEmail] = useState(currentUser?.email || "");
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Keep internal email input in sync if user object changes/loads later

  useEffect(() => {
    if (currentUser?.email) {
      setEmail(currentUser.email);
    }
  }, [currentUser]);


  // Modal & Confirmation States
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmationInput, setDeleteConfirmationInput] = useState("");

  // Loading & Feedback States
  const [emailLoading, setEmailLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const [message, setMessage] = useState({ type: "", text: "" });

  const showFeedback = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  if (!currentUser) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white border border-gray-200 rounded-xl p-8 shadow-sm text-center space-y-4">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Authentication Required</h2>
          <p className="text-sm text-gray-500">
            Please log in to manage your account credentials and security settings.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center justify-center w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Log In to Continue
          </button>
        </div>
      </div>
    );
  }

  // update email handler
  const handleUpdateEmail = async (e) => {
    e.preventDefault();

    if (email.trim().toLowerCase() === currentUser?.email?.toLowerCase()) {
      return showFeedback("error", "New email must be different from your current email.");
    }

    setEmailLoading(true);
    try {
      const response = await axios.patch(
        `${USER_API_END_POINT}/update-email`,
        { email },
        { withCredentials: true }
      );

      if (response.data.success) {
        showFeedback("success", response.data.message || "Email updated successfully!");
        if (onUserUpdate) onUserUpdate(response.data.user);
        toast.success(response.data.message || "Email updated successfully!");
      }
    } catch (err) {
      showFeedback(
        "error",
        err.response?.data?.message || "Failed to update email. Please try again."
      );
      toast.error(err.response?.data?.message || "Failed to update email. Please try again.");
    } finally {
      setEmailLoading(false);
    }
  };

  //  CHANGE PASSWORD

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      return showFeedback("error", "New password and confirm password do not match.");
    }

    if (passwords.currentPassword === passwords.newPassword) {
      return showFeedback("error", "New password cannot be the same as the current password.");
    }

    setPasswordLoading(true);
    try {
      const response = await axios.patch(
        `${USER_API_END_POINT}/change-password`,
        {
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
          confirmPassword: passwords.confirmPassword,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        showFeedback("success", response.data.message || "Password changed successfully!");
        setPasswords({ currentPassword: "", newPassword: "", confirmPassword: "" });
        toast.success(response.data.message || "Password changed successfully!");
      }
    } catch (err) {
      showFeedback(
        "error",
        err.response?.data?.message || "Failed to change password."
      );
      toast.error(err.response?.data?.message || "Failed to change password.");
    } finally {
      setPasswordLoading(false);
    }
  };

  // DELETE ACCOUNT

  const handleDeleteAccount = async () => {
    if (deleteConfirmationInput !== "DELETE") {
      return showFeedback("error", "Please type DELETE to confirm deletion.");
    }

    setDeleteLoading(true);
    try {
      const targetId = currentUser?._id;
      const response = await axios.delete(`${USER_API_END_POINT}/delete`, {
        withCredentials: true,
      });

      if (response.data.success) {
        if (onUserLogout) onUserLogout();
        dispatch(setUser(null)); // Clear user from Redux store
        showFeedback("success", response.data.message || "Account deleted successfully.");
        toast.success(response.data.message || "Account deleted successfully.");
        navigate("/");
      }
    } catch (err) {
      showFeedback(
        "error",
        err.response?.data?.message || "Failed to delete account."
      );
      toast.error(err.response?.data?.message || "Failed to delete account.");
      setShowDeleteModal(false);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Manage Account</h1>
        <p className="text-sm text-gray-500">
          Update your login credentials and security parameters
        </p>
      </div>

      {/* Global Feedback Banner */}
      {message.text && (
        <div
          className={`flex items-center gap-3 p-4 rounded-lg text-sm font-medium transition-all ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Section 1: Update Email */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Update Email Address</h2>
        </div>
        <form onSubmit={handleUpdateEmail} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="user@example.com"
            />
          </div>
          <button
            type="submit"
            disabled={
              emailLoading ||
              email.trim().toLowerCase() === currentUser?.email?.toLowerCase()
            }
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {emailLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            Save Email Address
          </button>
        </form>
      </section>

      {/* Section 2: Change Password */}
      <section className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Lock className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>
        </div>
        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              required
              value={passwords.currentPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, currentPassword: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              required
              value={passwords.newPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, newPassword: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={passwords.confirmPassword}
              onChange={(e) =>
                setPasswords({ ...passwords, confirmPassword: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={passwordLoading}
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition disabled:opacity-50"
          >
            {passwordLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            Update Password
          </button>
        </form>
      </section>

      {/* Section 3: Danger Zone */}
      <section className="bg-red-50/50 border border-red-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <Trash2 className="w-5 h-5 text-red-600" />
          <h2 className="text-lg font-semibold text-red-900">Danger Zone</h2>
        </div>
        <p className="text-sm text-red-700 mb-4">
          Deleting your account is permanent. All associated assets, applications, and job/company records will be removed immediately.
        </p>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-lg transition"
        >
          Delete Account
        </button>
      </section>

      {/* Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center gap-3 text-red-600">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="text-lg font-bold">Confirm Account Deletion</h3>
            </div>
            <p className="text-sm text-gray-600">
              This action cannot be undone. Type{" "}
              <span className="font-mono font-bold text-gray-900">DELETE</span> below to confirm.
            </p>
            <input
              type="text"
              value={deleteConfirmationInput}
              onChange={(e) => setDeleteConfirmationInput(e.target.value)}
              placeholder="Type DELETE"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            />
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmationInput("");
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={deleteConfirmationInput !== "DELETE" || deleteLoading}
                className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition disabled:opacity-50"
              >
                {deleteLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAccount;