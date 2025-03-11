import { Lock, User } from "lucide-react";

export default function LoginPage() {
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
          <form className="space-y-4">
            <div className="space-y-2 flex flex-col">
              <label
                htmlFor="username"
                className="text-black text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 self-start"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-muted-foreground">
                  <User className="h-4 w-4" />
                </div>
                <input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
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
                  placeholder="Enter your password"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-9 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>

            <button
              type="submit"
              className="border border-black inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
