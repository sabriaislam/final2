import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import styles from "../../styles/login.module.css";
import Image from "next/image";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error.message);
      setError("Invalid email or password. Please try again.");
    }
  };
  return (
    <div className={styles.pageWrapper}>
        <div className={styles.logoWrapper}>
            <Link href="/">
                <Image
                src="/images/cat-image.png"
                alt="Logo"
                width={150}
                height={150}
                className={styles.logo}
                />
            </Link>
        </div>
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <h2 className={styles.loginTitle}>Log In</h2>
        <input
          type="email"
          className={styles.loginInput}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className={styles.loginInput}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={styles.button} type="submit">
          Log In
        </button>
        <p className={styles.text}>
          Don't have an account?{" "}
          <Link href="/createUser" className={styles.loginLink}>
            Create one here.
          </Link>
        </p>
      </form>
    </div>
    </div>
  );
  
}
