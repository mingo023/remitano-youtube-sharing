import { useEffect, useState } from "react";
import { Lock, User } from "lucide-react";
import { login } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { UserAuthentication } from "../types/auth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, [navigate]);

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (response: UserAuthentication) => {
      localStorage.setItem("accessToken", response.accessToken);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/");
    },
  });

  const validate = () => {
    let valid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    await loginMutation.mutateAsync({
      email,
      password,
    });
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex flex-col justify-center w-full max-w-md mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          <p className="text-sm text-muted-foreground mt-2 text-black">
            Enter your credentials to access your account
          </p>
        </div>

        <div className="border rounded-lg shadow-sm p-6 bg-card text-card-foreground border-black">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2 flex flex-col">
              <label
                htmlFor="email"
                className="text-black text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 self-start"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-muted-foreground">
                  <User className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              {emailError && (
                <p className="text-sm text-red-600">{emailError}</p>
              )}
            </div>

            <div className="space-y-2 flex flex-col">
              <label
                htmlFor="password"
                className="text-black text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 self-start"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-muted-foreground">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              {passwordError && (
                <p className="text-sm text-red-600">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              className="cursor-pointer border border-black inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-black/90 hover:text-white h-10 px-4 py-2 w-full"
            >
              Sign in
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-black">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
