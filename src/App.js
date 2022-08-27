import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/App.css";
import { userRoutes } from "./routes/userRoutes";

function App() {
  return (
    <div className="bg-white">
      <BrowserRouter>
        <Routes>
          {userRoutes?.map(({ path, component }, i) => (
            <Route key={i} path={path} element={component} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
