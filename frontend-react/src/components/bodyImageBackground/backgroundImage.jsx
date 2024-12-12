import React from 'react';
import HomeBackground from "../../assets/téléchargement.png";

const BackgroundImage = () => {
  return (
    <img
      src={HomeBackground}
      alt="Home Background"
      style={{
        width: '100%', // Ensure the width spans the full width of the screen
        height: '100vh', // Make the height cover the full viewport height
        objectFit: 'fill', // Ensure the image covers the area without distortion
        position: 'relative', // Position it behind other elements
        
      }}
    />
  );
};

export default BackgroundImage;
