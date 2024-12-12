import React from "react";
import HomeBackground from "../../assets/téléchargement.png";

const BackgroundImage = () => {
  return (
    <div
      style={{
        height: "34vw", // Matches the header height
        margin: "30px auto", // Centered vertically with space
        background: `url(${HomeBackground}) no-repeat center center`, // Centered background
        backgroundSize: "cover", // Make the image take all horizontal space
        border: "5px solid #fff", // White border
        borderRadius: "15px", // Rounded corners
        overflow: "hidden", // Ensures content stays inside rounded edges
      }}
    >
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center text elements
          gap: "1.5vw",
          maxWidth: "50%",
          bottom: "30%", // Adjust the vertical position
          left: "6vw",
          padding: "10px", // Space between content and edges
        }}
      >
        <h2
          style={{
            fontWeight: 400,
            color: "#07a2b5",
            fontSize: "max(4.5vw, 22px)",
            margin: 0, // Remove default margin
          }}
        >
          Welcome To Our Platform!
        </h2>

        <p
          style={{
            color: "#07a2b5",
            fontSize: "max(2.5vw, 22px)",
            margin: 0, // Remove default margin
          }}
        >
          Choose a section to continue:
        </p>
      </div>
    </div>
  );
};

export default BackgroundImage;
