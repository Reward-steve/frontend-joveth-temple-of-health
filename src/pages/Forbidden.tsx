import React from "react";
import { Link } from "react-router-dom";

const Forbidden = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>403</h1>
      <p style={styles.message}>
        Access Forbidden – You don’t have permission to view this page.
      </p>
      <Link to="/" style={styles.link}>
        Return to Home
      </Link>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "60px",
    backgroundColor: "#fff3cd",
    height: "100vh",
  } as React.CSSProperties,
  title: {
    fontSize: "80px",
    color: "#ffc107",
  } as React.CSSProperties,
  message: {
    fontSize: "22px",
    color: "#856404",
  } as React.CSSProperties,
  link: {
    marginTop: "20px",
    display: "inline-block",
    fontSize: "18px",
    color: "#007bff",
    textDecoration: "none",
  } as React.CSSProperties,
};

export default Forbidden;
