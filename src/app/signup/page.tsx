"use client";

import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { set } from "mongoose";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CirclesWithBar } from "react-loader-spinner";

const SignupPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loader, setLoader] = useState(false);
  const [signupClicked, setSignupClicked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (user.email && user.password && user.username) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onSignup = async () => {
    try {
      setLoader(true);
      setButtonDisabled(true);
      setSignupClicked(true);

      const res = await axios.post("/api/users/signup", user);
      console.log("signup success", res.data);

      toast.success("Signup successful");

      router.push("/login"); //navigate to login page
    } catch (error: any) {
      console.log("signup error", error);

      toast.error(error.message);
    }
  };

  const inputClassames =
    "rounded-xl py-2 px-4 text-black/80 font-semibold antialiased";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="text-2xl">{loader ? "Processing" : "Signup"}</h1>
      <div className="flex flex-col space-y-4">
        {" "}
        <label htmlFor="username">Username</label>
        <input
          className={`${inputClassames}`}
          id="username"
          value={user.username}
          onChange={(e) => {
            setUser({ ...user, username: e.target.value });
          }}
          placeholder="Username"
          type="text"
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          placeholder="Enter your email"
          value={user.email}
          type="text"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className={`${inputClassames}`}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          placeholder="Enter your password"
          value={user.password}
          type="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className={`${inputClassames}`}
        />
      </div>

      {buttonDisabled ? (
        <p className="mt-8 text-lg text-green-500">
          {!signupClicked ? (
            "Please fill above details"
          ) : (
            <CirclesWithBar
              height="100"
              width="100"
              color="#4fa94d"
              outerCircleColor="#4fa94d"
              innerCircleColor="#4fa94d"
              barColor="#4fa94d"
              ariaLabel="circles-with-bar-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          )}
        </p>
      ) : (
        <button
          className="mt-5 rounded-full bg-green-500 px-8 py-2 font-bold text-black/80"
          onClick={onSignup}
        >
          Signup
        </button>
      )}

      <Link href={"/login"} className="mt-6">
        Visit login page
      </Link>
    </div>
  );
};

export default SignupPage;
