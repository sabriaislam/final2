import { useState } from "react";
import { auth, db } from "../../firebase"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import styles from "../../styles/createUser.module.css"
import Link from "next/link";
import Image from "next/image";

export default function CreateUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: displayName || "", 
        bio: "", 
      });

      alert("Account created successfully!");
      router.push("/login"); 
    } catch (error) {
      console.error("Error during signup:", error.message);
      setError(error.message);
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
    <div className={styles.createAccountContainer}>
      <form className={styles.createAccountForm} onSubmit={handleSignUp}>
        <h1 className={styles.createAccountTitle}>Create Account</h1>
        {error && <p className={styles.errorText}>{error}</p>} {/* Display error if any */}
        <input
          type="text"
          className={styles.createAccountInput}
          placeholder="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
        <input
          type="email"
          className={styles.createAccountInput}
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className={styles.createAccountInput}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className={styles.button} type="submit">
          Sign Up
        </button>
      </form>
    </div>
  </div>
  
  );
}
