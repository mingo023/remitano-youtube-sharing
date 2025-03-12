import { useState, useEffect } from "react";

export default function useCurrentUser() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const user = localStorage.getItem("user");
        if (user) {
          setCurrentUser(JSON.parse(user));
        }
      } catch (error) {
        console.error("Error fetching current user:", error);
        setCurrentUser(null);
      }
    }

    fetchUser();
  }, []);

  return currentUser;
}
