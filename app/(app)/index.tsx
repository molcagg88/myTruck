import { router } from "expo-router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../hooks/AuthContext";

export default function index() {
  const { user_type } = useContext(AuthContext);

  useEffect(() => {
    if (user_type) {
      router.replace(`/(app)/${user_type}`);
    }
  }, [user_type]);

  return null;
}
