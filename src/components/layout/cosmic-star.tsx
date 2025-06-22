const CosmicStar = () => {
  return (
    <div
      className="cosmic-star"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
      }}
    />
  );
};

export default CosmicStar;
