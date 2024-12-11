

export default function PostCard({ post }) {
    const formattedTimestamp = post.timestamp
    ? post.timestamp.toDate().toLocaleString()
    : "Unknown";


    return (
      <div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <small>
            <strong>By:</strong> {post.displayName || "Anonymous"} <br />
            <strong>Posted:</strong> {formattedTimestamp}
        </small>
      </div>
    );
}