import React, { useState } from "react";

const HomePage = () => {
  const [user] = useState(() => {
    const savedData = localStorage.getItem("userdata");
    return savedData ? JSON.parse(savedData) : null;
  });

  if (!user) {
    return <div>Loading user or not logged in...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.username||  "User"}</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
};

export default HomePage;
