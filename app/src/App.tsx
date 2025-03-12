import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Layout from "./components/Layout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import VideoListing from "./pages/VideoListing";
import VideoSharing from "./pages/VideoSharing";

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
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </QueryClientProvider>
    </>
  );
}

export default App;
