import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Private from "./Private";
import Customers from "../pages/Customers";
import Profile from "../pages/Profile";

export function RoutesApp() {
  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <Private>
            <SignIn />
          </Private>
        }
      />
      <Route
        path={"/register"}
        element={
          <Private>
            <SignUp />
          </Private>
        }
      />
      <Route
        path={"/dashboard"}
        element={
          <Private>
            <Dashboard />
          </Private>
        }
      />
      <Route
        path={"/customers"}
        element={
          <Private>
            <Customers />
          </Private>
        }
      />
      <Route
        path={"/profile"}
        element={
          <Private>
            <Profile />
          </Private>
        }
      />
      <Route path={"*"} element={<div>Not found</div>} />
    </Routes>
  );
}
