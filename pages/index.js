import {useRouter} from "next/router";
import styles from "../styles/Home.module.css";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  return (
    <div className={styles.homescreenWrapper}>
      <h1 className={styles.h1}>Kiki with Us</h1>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={() => router.push("/login")}>Login</button>
        <button className={styles.button} onClick={() => router.push("/createUser")} >Create Account</button>
      </div>
      <div className={styles.imageWrapper}>
        <Image
          src="/images/cat-image.png" 
          alt="image of cat snuggling"
          layout="intrinsic"
          width={300} 
          height={200}
        />
      </div>
    </div>
  );
}
