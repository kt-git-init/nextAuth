"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const searchParams = useSearchParams();

  const verifyUserEmail = async () => {
    try {
      console.log(token);
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      console.log(token);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const query = searchParams.get("token");

    if (query) {
      setToken(query);
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      {!verified && !error && (
        <button
          className="rounded-2xl border-2 border-green-500 px-8 py-[12px]"
          onClick={verifyUserEmail}
        >
          Verify Email
        </button>
      )}

      {verified && <p>Email verified successfully</p>}

      {error && <p>Failed to verify email</p>}
    </div>
  );
};

export default VerifyEmailPage;
