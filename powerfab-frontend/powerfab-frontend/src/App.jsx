import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import InvoicePDFs from "./pages/InvoicePDFs"

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Dashboard />}
      />

      <Route
        path="/invoice-pdfs"
        element={<InvoicePDFs />}
      />
    </Routes>
  );
}

export default App;