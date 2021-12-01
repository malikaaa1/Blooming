import React from "react";
import { useAuth } from "../../context/AuthContext";
import Login from '../../components/Auth/Login'
import Buy from "./Buy";

const Auth = () => {
  const { user } = useAuth();

  return (
    <div>
      {user ? (
        <>
          <Buy/>
        </>
      ) : (
        <Buy />
      )}
    </div>
  );
};

export default Auth;
