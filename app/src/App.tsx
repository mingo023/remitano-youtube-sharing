import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import VideoShare from "./pages/VideoShare";
import Layout from "./components/Layout";
import LoginPage from "./pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <VideoShare />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
