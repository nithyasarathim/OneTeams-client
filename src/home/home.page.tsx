import React, { useEffect, useState } from "react";

const HomePage = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userdata");

    if (!storedUser) {
      window.location.href =
        "http://localhost:5173/sso?client_id=oneapp1&redirect_uri=http://localhost:5176/callback&state=asdfghjk4";
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch {
      localStorage.removeItem("userdata");
      window.location.href =
        "http://localhost:5173/sso?client_id=oneapp1&redirect_uri=http://localhost:5176/callback&state=asdfghjk4";
    }
  }, []);

  if (!user) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #e0f2fe, #f8fafc)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          width: "500px",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h2 style={{ margin: 0 }}>{user.username}</h2>
          <p style={{ color: "gray", marginTop: "5px" }}>{user.email}</p>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <strong>Department:</strong> {user.department}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <strong>Role:</strong>{" "}
          <span
            style={{
              background: "#e0f2fe",
              padding: "4px 10px",
              borderRadius: "20px",
              fontSize: "14px",
            }}
          >
            {user.role}
          </span>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <strong>Status:</strong>{" "}
          <span
            style={{
              color: user.isAvailable ? "green" : "red",
              fontWeight: 600,
            }}
          >
            {user.isAvailable ? "Available" : "Not Available"}
          </span>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <strong>Skills:</strong>
          <div
            style={{
              marginTop: "8px",
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {user.skills?.map((skill: string, index: number) => (
              <span
                key={index}
                style={{
                  background: "#f1f5f9",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  fontSize: "13px",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <strong>About:</strong>
          <p style={{ marginTop: "8px", fontSize: "14px", lineHeight: "1.6" }}>
            {user.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
