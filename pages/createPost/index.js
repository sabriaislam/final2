import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth, db } from "../../firebase"; 
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Header from "../../components/header"

export default function CreatePost() {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Check authentication status and redirect if not logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 

    if (!user) {
      setError("You must be logged in to create a post.");
      return;
    }

    try {
      // Fetch the displayName from Firestore's users collection
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;

      if (!userData || !userData.displayName) {
        throw new Error("User displayName not found in Firestore.");
      }

      // Reference the posts collection and add the post
      const postsRef = collection(db, "posts");
      await addDoc(postsRef, {
        title: formData.title || "Untitled",
        content: formData.content || "No content provided.",
        timestamp: serverTimestamp(),
        displayName: userData.displayName, 
        userId: user.uid,
      });

      alert("Post created successfully!");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error creating post:", error.message);
      setError("Failed to create post. Please try again.");
    }
  };

  return (
    <div>
        <Header/>
      <h1>Create Post</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Post Title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="content"
          placeholder="Post Content"
          value={formData.content}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
