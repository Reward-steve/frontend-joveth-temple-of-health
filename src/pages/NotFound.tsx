import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404</h1>
      <p style={styles.message}>Page Not Found</p>
      <Link to="/" style={styles.link}>
        Go Back Home
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center" as const,
    padding: "60px",
    backgroundColor: "#f0f0f0",
    height: "100vh",
  },
  title: {
    fontSize: "80px",
    color: "#dc3545",
  },
  message: {
    fontSize: "24px",
    color: "#555",
  },
  link: {
    marginTop: "20px",
    display: "inline-block",
    fontSize: "18px",
    color: "#007bff",
    textDecoration: "none",
  },
};

export default NotFound;
