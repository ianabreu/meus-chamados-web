import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { RoutesApp } from "./routes";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/auth";
import { useTicketStore } from "./store/tickets";

function App() {
  const { checkAuth, signed } = useAuthStore();
  const { fetchTickets } = useTicketStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (signed) {
      fetchTickets();
    }
  }, [fetchTickets, signed]);

  return (
    <BrowserRouter>
      <RoutesApp />
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}

export default App;
