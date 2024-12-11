import {useRouter} from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <h1>Kiki with Us</h1>
      <div>
        <button onClick={() => router.push("/login")}>Login</button>
        <button onClick={() => router.push("/createUser")} >Create Account</button>
      </div>
    </div>
  );
}
