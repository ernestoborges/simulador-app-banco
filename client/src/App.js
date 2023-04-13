import "./styles.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from "./components/MainPage/MainPage";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { UserPage } from "./components/UserPage/UserPage";
import { AuthProvider } from "./context/AuthProvider";
import RequireAuth from "./context/RequireAuth";



export default function App() {
  return (
    <Router>
      <AuthProvider>
        <main className="App">
          <Routes>
              {/* public routes */}
              <Route path="/" exact element={<MainPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registrar" element={<Register />} />

              {/* protected routes */}
              <Route path="/usuario" element={<RequireAuth><UserPage /></RequireAuth>} />
          </Routes>
        </main>
      </AuthProvider>
    </Router>
  );
}
