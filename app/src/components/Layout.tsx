import { ReactNode, useEffect } from "react";
import { Home } from "lucide-react";
import useCurrentUser from "../hooks/current-user";

const isUserAuthenticated = (): boolean => {
  return !!localStorage.getItem("accessToken");
};

const Layout = ({ children }: { children: ReactNode }) => {
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (!isUserAuthenticated()) {
      window.location.href = "/sign-in";
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.href = "/sign-in";
  };

  const shareMovie = () => {
    window.location.href = "/share";
  };

  return (
    <div>
      {/* Header */}
      <header className="border-b border-black py-2">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <div
            className="flex items-center mb-4 sm:mb-0 cursor-pointer"
            onClick={() => (window.location.href = "/")}
          >
            <Home className="w-6 h-6 mr-2" />
            <h1 className="text-black text-xl font-semibold">Funny Movies</h1>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="text-black text-sm text-muted-foreground">
              Welcome {currentUser?.email}
            </span>
            <div className="flex gap-2">
              <button
                onClick={shareMovie}
                className="border border-black px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors cursor-pointer hover:bg-black hover:text-white"
              >
                Share a movie
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 text-sm rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer hover:bg-black hover:text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
