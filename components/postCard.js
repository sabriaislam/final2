
import styles from "../styles/postCard.module.css";
export default function PostCard({ post }) {

    const formattedTimestamp = post.timestamp
    ? post.timestamp.toDate().toLocaleString()
    : "Unknown";

    return (
        <div className={styles.postContainer}>
        <div className={styles.postCard}>
          <h2 className={styles.title}>{post.title}</h2>
          <p className={styles.content}>{post.content}</p>
          <div className={styles.userInfo}>
            <span><strong>By:</strong> {post.displayName || "Anonymous"}</span>
            <span><strong>Posted:</strong> {formattedTimestamp}</span>
          </div>
        </div>
      </div>
      
    );
}