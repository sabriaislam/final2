import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Placeholder for login functionality
      console.log("Logging in with:", { email, password });
    } catch (error) {
      console.error("Error logging in:", error.message);
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Log In</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log In</button>
        <p>
          Don't have an account?{" "}
          <a href="#">Create one here</a>.
        </p>
      </form>
    </div>
  );
}
