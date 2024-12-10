import { useState } from "react";

export default function CreateUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // Placeholder for sign-up functionality
      console.log("Creating account with:", { name, email, password });
      alert("Account created successfully!");
    } catch (error) {
      console.error("Error creating account:", error.message);
      alert("Failed to create account. Please try again.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <h1>Create Account</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
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
        <button type="submit">Create Account</button>
        <p>
          Already have an account? <a href="#">Login</a>.
        </p>
      </form>
    </div>
  );
}
