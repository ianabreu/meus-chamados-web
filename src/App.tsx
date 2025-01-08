import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { RoutesApp } from "./routes";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/auth";

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <RoutesApp />
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}

export default App;
