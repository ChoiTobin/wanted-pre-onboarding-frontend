import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Todo from "../pages/Todo";



const Router = () => {

  return (
      <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/todos" element={<Todo />} />
      </Routes>
  );
};

export default Router;