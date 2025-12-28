import React, { useContext } from "react";
import { Context } from "../auth/AuthContext";

const Profile = () => {
  const { user, loading } = useContext(Context);

  // ⏳ Auth state still initializing
  if (loading) {
    return (
      <div className="min-h-full w-full flex justify-center items-center text-gray-300">
        Loading profile...
      </div>
    );
  }

  // ❌ Safety check (PrivateRoute should already block this)
  if (!user) {
    return (
      <div className="min-h-full w-full flex justify-center items-center text-red-400">
        User not authenticated
      </div>
    );
  }

  return (
    <div className="min-h-full w-full flex justify-center items-center p-6">
      <div className="w-full max-w-xl bg-white/25 backdrop-blur-md border border-white/20 rounded-xl shadow-xl p-8 text-white">
        <h1 className="text-2xl font-semibold mb-4">Profile</h1>

        <div className="space-y-3 text-gray-200">
          <p>
            <span className="font-medium">Username:</span> {user.username}
          </p>
          <p>
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-medium">User ID:</span> {user.id}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
