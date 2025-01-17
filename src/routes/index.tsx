import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Layout from "./Layout";
import Customers from "../pages/Customers";
import Profile from "../pages/Profile";

export function RoutesApp() {
  return (
    <Routes>
      <Route
        path={"/"}
        element={
          <Layout>
            <SignIn />
          </Layout>
        }
      />
      <Route
        path={"/register"}
        element={
          <Layout>
            <SignUp />
          </Layout>
        }
      />
      <Route
        path={"/dashboard"}
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path={"/customers"}
        element={
          <Layout>
            <Customers />
          </Layout>
        }
      />
      <Route
        path={"/profile"}
        element={
          <Layout>
            <Profile />
          </Layout>
        }
      />
      <Route path={"*"} element={<div>Not found</div>} />
    </Routes>
  );
}
