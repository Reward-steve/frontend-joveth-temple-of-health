import React from "react";

const RegistrationSuccess = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Registration Complete</h1>
      <p style={styles.message}>
        Thank you for signing up. A verification email has been sent to your
        inbox.
      </p>
      <p style={styles.message}>Verify the email to activate account</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center" as React.CSSProperties["textAlign"],
    padding: "20px 10px",
    backgroundColor: "#e6fffa",
    minHeight: "100vh",
  } as React.CSSProperties,
  title: {
    fontSize: "40px",
    color: "#0c5460",
  } as React.CSSProperties,
  message: {
    fontSize: "18px",
    margin: "20px 0",
    color: "#155724",
  } as React.CSSProperties,
  button: {
    display: "inline-block",
    padding: "12px 24px",
    backgroundColor: "#20c997",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    fontWeight: "bold",
  } as React.CSSProperties,
};

export default RegistrationSuccess;
