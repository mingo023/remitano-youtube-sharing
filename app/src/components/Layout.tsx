import { ReactNode, useEffect } from "react";
import { Home } from "lucide-react";

const isUserAuthenticated = (): boolean => {
  // Replace this check with your actual authentication logic
  return !!localStorage.getItem("auth_token");
};

const Layout = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    if (!isUserAuthenticated()) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div>
      {/* Header */}
      <header className="border-b border-black py-2">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <Home className="w-6 h-6 mr-2" />
            <h1 className="text-black text-xl font-semibold">Funny Movies</h1>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <span className="text-black text-sm text-muted-foreground">
              Welcome someone@gmail.com
            </span>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Share a movie
              </button>
              <button className="px-4 py-2 text-sm rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors">
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
