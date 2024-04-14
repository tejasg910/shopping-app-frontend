import React from "react";

const Loading = () => {
  return <div>Loading</div>;
};

export default Loading;

export const SkeletonLoading = () => {
  return (
    <div className="skeleton-container">
      <div className="skeleton-box"></div>
      <div className="skeleton-box"></div>
      <div className="skeleton-box"></div>
    </div>
  );
};
