import { useState, useEffect } from "react";
import { auth, db } from "../../firebase"; 
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Header from "@/components/header";
import styles from "../../styles/profile.module.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            console.error("No user data found in Firestore.");
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <p>You need to log in to view this page.</p>;
  }

  return (
    <div>
      <Header />
    <div className={styles.profileCard}>
    <div className={styles.profileHeader}>Profile Information</div>
    <div className={styles.profileContent}>
      <p className={styles.displayName}>
        <strong>Name</strong> {userData?.displayName || "N/A"}
      </p>
      <p className={styles.email}><strong>Contact Me:</strong> {user.email}</p>
    </div>
    </div>
  </div>
  );
}
