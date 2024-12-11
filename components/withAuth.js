import { useRouter } from "next/router";
import { useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function withAuth(Component) {
    return function AuthenticatedComponent(props) {
    const router = useRouter();
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          router.push("/login");
        }
      });
      return () => unsubscribe();
    }, [router]);
    return <Component {...props} />;
  };
};
