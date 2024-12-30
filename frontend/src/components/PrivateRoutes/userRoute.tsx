import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useTodos } from "../../context/TodoContext";


type LayoutProps = {
  children: React.ReactNode;
};

const UserRoute = ({ children }: LayoutProps) => {
  const { user } = useTodos();
  const location = useLocation();

  return (
    <>
      {!user ? (
        <Navigate to="/" replace state={{ path: location.pathname }} />
      ) : (
        children
      )}
    </>
  );
};

export default UserRoute;
