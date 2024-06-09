"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [userId, serUserId] = useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/aboutme");
    console.log(res.data);
    serUserId(res.data.data._id);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile page</p>
      <h2 className="rounded bg-green-500 p-1">
        {userId === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/aboutme/${userId}`}>{userId}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="mt-4 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Logout
      </button>

      <button
        onClick={getUserDetails}
        className="mt-4 rounded bg-green-800 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        GetUser Details
      </button>
    </div>
  );
}
