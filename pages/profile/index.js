import { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Header from "../../components/header";
import styles from "../../styles/profile.module.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedFields, setEditedFields] = useState({
    bio: "",
    currReads: "",
    displayName: "",
    favMovie: "",
    hobbies: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserData(data);
            setEditedFields({
              bio: data.bio || "",
              currReads: data.currReads || "",
              displayName: data.displayName || "",
              favMovie: data.favMovie || "",
              hobbies: data.hobbies || "",
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleFieldChange = (field, value) => {
    setEditedFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleProfileSubmit = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, editedFields);
      setIsEditing(false);
      setUserData({ ...userData, ...editedFields });
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>You need to log in to view this page.</p>;

  return (
    <div>
      <Header />
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>Profile Information</div>
        <div className={styles.profileContent}>
          {isEditing ? (
            <div>
              <p className={styles.field}>
                <strong>Name:</strong>
                <input
                  value={editedFields.displayName}
                  onChange={(e) => handleFieldChange("displayName", e.target.value)}
                  className={styles.inputBox}
                />
              </p>
              <p className={styles.field}>
                <strong>Bio:</strong>
                <textarea
                  value={editedFields.bio}
                  onChange={(e) => handleFieldChange("bio", e.target.value)}
                  className={styles.inputBox}
                />
              </p>
              <p className={styles.field}>
                <strong>Current Reads:</strong>
                <input
                  value={editedFields.currReads}
                  onChange={(e) => handleFieldChange("currReads", e.target.value)}
                  className={styles.inputBox}
                />
              </p>
              <p className={styles.field}>
                <strong>Favorite Movie:</strong>
                <input
                  value={editedFields.favMovie}
                  onChange={(e) => handleFieldChange("favMovie", e.target.value)}
                  className={styles.inputBox}
                />
              </p>
              <p className={styles.field}>
                <strong>Hobbies:</strong>
                <input
                  value={editedFields.hobbies}
                  onChange={(e) => handleFieldChange("hobbies", e.target.value)}
                  className={styles.inputBox}
                />
              </p>
              <button 
                onClick={handleProfileSubmit}
                className={styles.button}
              >
                Save Profile
              </button>
            </div>
          ) : (
            <div>
              <p className={styles.displayName}><strong>Name:</strong> {userData?.displayName || "N/A"}</p>
              <p className={styles.email}><strong>Contact Me:</strong> {user.email}</p>
              <p className={styles.field}><strong>Bio:</strong> {userData?.bio || "No bio yet"}</p>
              <p className={styles.field}><strong>Current Reads:</strong> {userData?.currReads || "N/A"}</p>
              <p className={styles.field}><strong>Favorite Movie:</strong> {userData?.favMovie || "N/A"}</p>
              <p className={styles.field}><strong>Hobbies:</strong> {userData?.hobbies || "N/A"}</p>
              <button 
                onClick={() => setIsEditing(true)}
                className={styles.button}
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
