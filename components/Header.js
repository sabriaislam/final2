import { auth } from ".././firebase";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import Link from "next/link";

export default function Header() {
    const router = useRouter();
  
    const handleSignOut = async () => {
      try {
        await signOut(auth);
        router.push("/");
      } catch (error) {
        console.error("Error logging out:", error.message);
      }
    };

    return(
        <div>
        <div>
            <ul></ul>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/createUser">Create User</Link>
            <Link href="/profile">Profile</Link>
            <Link href="/" onClick={handleSignOut}>Sign Out</Link>
        </div>
        </div>
    )
}