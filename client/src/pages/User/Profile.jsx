import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/Host";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const getProfile = async () => {
      try {
        const { data } = await axios.get(`${USER_API_END_POINT}/profile`, {
          withCredentials: true,
        });

        setProfile(data.user);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    getProfile();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold text-gray-600">
          Please Login
        </h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold text-gray-600">
          Loading Profile...
        </h2>
      </div>
    );
  }

  const currentUser = profile || user;
  const profileData = currentUser?.profile || {};

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Cover */}
        <div className="h-36 bg-gradient-to-r from-blue-600 to-blue-300" />

        <div className="px-8 pb-8">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row items-center md:items-end justify-between -mt-16">

            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src={
                  profileData?.profilePicture ||
                  "https://www.gravatar.com/avatar/?d=mp"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
              />

              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-800">
                  {currentUser?.username}
                </h1>

                <p className="text-gray-500 pt-3">{currentUser?.email}</p>

                <span className="inline-block mt-2 px-4 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium capitalize">
                  {currentUser?.role}
                </span>
              </div>
            </div>

            <Link
              to="/user/profile/edit"
              className="mt-6 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
            >
              Edit Profile
            </Link>
          </div>

          {/* Profile Information */}
          <div className="grid md:grid-cols-2 gap-6 mt-10">

            {/* Bio */}
            <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-2">Bio</h2>
              <p className="text-gray-600">
                {profileData?.bio || "No bio added."}
              </p>
            </div>

            {/* Designation */}
            <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
              <h2 className="text-lg font-semibold mb-2">
                Designation
              </h2>
              <p className="text-gray-600">
                {profileData?.designation || "Not Available"}
              </p>
            </div>

            {/* Skills */}
            <div className="bg-gray-50 p-5 rounded-xl shadow-sm md:col-span-2">
              <h2 className="text-lg font-semibold mb-4">
                Skills
              </h2>

              {profileData?.skill?.length ? (
                <div className="flex flex-wrap gap-3">
                  {profileData.skill.map((item, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No skills added.</p>
              )}
            </div>

            {/* Resume */}
            <div className="bg-gray-50 p-5 rounded-xl shadow-sm md:col-span-2">
              <h2 className="text-lg font-semibold mb-2">
                Resume
              </h2>

              {profileData?.resume ? (
                <a
                  href={profileData.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
                >
                  View Resume
                </a>
              ) : (
                <p className="text-gray-500">
                  Resume not uploaded.
                </p>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;