export default function Header() {
    const handleIn = async () => {
      try {
        console.log("Logging out...");
      } catch (error) {
        console.error("Error logging out:", error.message);
      }
    };
  
    return (
      <header>
        <div>
          <h1>Kiki with Us</h1>
        </div>
        <nav>
          <h1>Dashboard</h1>
          <button>Create Post</button>
          <button>Profile</button>
          <button onClick={handleIn}>Log In</button>
        </nav>
      </header>
    );
  }
  