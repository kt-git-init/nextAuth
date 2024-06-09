"use client";

import React, { use, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CirclesWithBar } from "react-loader-spinner";

const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loader, setLoader] = useState(false);
  const [loginClicked, setloginClicked] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    if (user.email && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onlogin = async () => {
    try {
      setLoader(true);
      setButtonDisabled(true);
      setloginClicked(true);

      const res = await axios.post("/api/users/login", user);
      console.log("login success", res.data);

      toast.success("login successful");

      router.push("/aboutme"); //navigate to login page
    } catch (error: any) {
      console.log("login error", error);
      setError(true);
      setloginClicked(false);

      toast.error(error.message);
    }
  };

  const inputClassames =
    "rounded-xl py-2 px-4 text-black/80 font-semibold antialiased";

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="text-2xl">{loader ? "Processing" : "login"}</h1>
      <div className="flex flex-col space-y-4">
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
          {!loginClicked && !error && "Please fill above details"}

          {loginClicked && !error && (
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
          onClick={onlogin}
        >
          Login
        </button>
      )}

      {error && <p className="text-red-500">Invalid email or password</p>}
    </div>
  );
};

export default LoginPage;
