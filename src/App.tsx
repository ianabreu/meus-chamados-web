import { BrowserRouter } from "react-router-dom";
import { RoutesApp } from "./routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <RoutesApp />
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}

export default App;
