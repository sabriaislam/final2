import { auth } from "firebase/auth";
import { useRouter } from "next/router";

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
    const goToCreatePost = () => {
        router.push("/createPost");
    };
    
    const goToProfile = () => {
    router.push("/profile");
    };

    return(
        <div>
        <div>
            <button onClick={goToCreatePost}>
                Create Post
            </button>
            <button onClick={goToProfile}>
                Profile
            </button>
            <button onClick={handleSignOut}>
                Sign Out
            </button>
        </div>
        </div>
    )
}