const LoadingSpinner = () => {
  return (
    <div className={"flex items-center justify-center"}>
      <div className="relative w-fit flex justify-center items-center">
        <div className="absolute w-24 h-24 border-4 border-cosmic-gold/30 rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-6 h-6 bg-cosmic-gold rounded-full animate-pulse" />
        </div>
        <div className="text-4xl animate-pulse">✨</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
