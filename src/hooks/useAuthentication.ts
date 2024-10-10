import * as React from "react";
import { User } from "firebase/auth";
import { auth } from "../config/firebase";

export function useAuth() {
  const [user, setUser] = React.useState<User>();

  React.useEffect(() => {
    const unsubscribeFromAuthStatusChanged = auth.onAuthStateChanged((user) => {
      if (user) {
        const payload = user as unknown as User;

        setUser(payload);
      } else {
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStatusChanged;
  }, []);

  return {
    user,
  };
}
