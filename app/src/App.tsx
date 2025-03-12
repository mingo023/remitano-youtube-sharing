import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import VideoSharing from "./pages/VideoSharing";
import Layout from "./components/Layout";
import LoginPage from "./pages/Login";
import VideoListing from "./pages/VideoListing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/share"
              element={
                <Layout>
                  <VideoSharing />
                </Layout>
              }
            />
            <Route
              path="/"
              element={
                <Layout>
                  <VideoListing />
                </Layout>
              }
            />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
}

export default App;
