import { auth } from ".././firebase";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import Link from "next/link";
import styles from "../styles/header.module.css";
import Image from "next/image";

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

    return (
        <nav className={styles.navbar}>
          <ul>
          <div className={styles.logoWrapper}>
                <Link href="/dashboard">
                    <Image
                    src="/images/cat-image.png"
                    alt="Logo"
                    
                    width={50}
                    height={50}
                    className={styles.logo}
                    />
                </Link>
            </div>    
            <li className={styles.title}>Dashboard</li>
            <li className={styles.createPost}>
              <Link href="/createPost">Create Post</Link>
            </li>
            <li className={styles.profile}>
              <Link href="/profile">Profile</Link>
            </li>
            <li className={styles.signOut}>
              <Link href="/" onClick={handleSignOut}>
                Sign Out
              </Link>
            </li>
          </ul>
        </nav>
      );
}