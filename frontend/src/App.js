import Dashboard from "./pages/dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Predict from "./pages/predict/Predict";
import DataBase from "./pages/database/DataBase";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" />
            <Route index element={<Dashboard />} />
            <Route path = "predict" element={<Predict />} />
            <Route path = "database" element={<DataBase />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
