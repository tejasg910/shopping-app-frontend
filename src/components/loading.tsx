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

export const ListSkeletonLoading = () => {
  return (
    <div className="list_skeleton_container_main">
      <div className="list_skeleton_container">
        <div className="post">
          <div className="avatar"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>

        <div className="post">
          <div className="avatar"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>

        <div className="post">
          <div className="avatar"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
    </div>
  );
};

export const DetailSkeletonLoading = () => {
  return (
    <div className="detail_skeleton_container_main">
      <div className="detail_skeleton_container">
        <div className="box">
          <div className="skeleton">
            <div className="skeleton-left">
              <div className="line h17 w40 m10"></div>
              <div className="line"></div>
              <div className="line h8 w50"></div>
              <div className="line  w75"></div>
            </div>
            <div className="skeleton-right">
              <div className="square"></div>
            </div>
          </div>
          <div className="skeleton">
            <div className="skeleton-left">
              <div className="line h17 w40 m10"></div>
              <div className="line"></div>
              <div className="line h8 w50"></div>
              <div className="line  w75"></div>
            </div>
            <div className="skeleton-right">
              <div className="square"></div>
            </div>
          </div>
          <div className="skeleton">
            <div className="skeleton-left">
              <div className="line h17 w40 m10"></div>
              <div className="line"></div>
              <div className="line h8 w50"></div>
              <div className="line  w75"></div>
            </div>
            <div className="skeleton-right">
              <div className="square"></div>
            </div>
          </div>
        </div>

        <div className="box">
          <div className="skeleton">
            <div className="skeleton-left">
              <div className="line h17 w40 m10"></div>
              <div className="line"></div>
              <div className="line h8 w50"></div>
              <div className="line  w75"></div>
            </div>
            <div className="skeleton-right">
              <div className="square circle"></div>
            </div>
          </div>
          <div className="skeleton">
            <div className="skeleton-left">
              <div className="line h17 w40 m10"></div>
              <div className="line"></div>
              <div className="line h8 w50"></div>
              <div className="line  w75"></div>
            </div>
            <div className="skeleton-right">
              <div className="square circle"></div>
            </div>
          </div>
          <div className="skeleton">
            <div className="skeleton-left">
              <div className="line h17 w40 m10"></div>
              <div className="line"></div>
              <div className="line h8 w50"></div>
              <div className="line  w75"></div>
            </div>
            <div className="skeleton-right">
              <div className="square circle"></div>
            </div>
          </div>
        </div>

        <div className="box">
          <div className="skeleton">
            <div className="skeleton-left flex1">
              <div className="square circle"></div>
            </div>
            <div className="skeleton-right flex2">
              <div className="line h17 w40 m10"></div>
              <div className="line"></div>
              <div className="line h8 w50"></div>
              <div className="line  w75"></div>
            </div>
          </div>
          <div className="skeleton">
            <div className="skeleton-left flex1">
              <div className="square circle"></div>
            </div>
            <div className="skeleton-right flex2">
              <div className="line h17 w40 m10"></div>
              <div className="line"></div>
              <div className="line h8 w50"></div>
              <div className="line  w75"></div>
            </div>
          </div>
          <div className="skeleton">
            <div className="skeleton-left flex1">
              <div className="square circle"></div>
            </div>
            <div className="skeleton-right flex2">
              <div className="line h17 w40 m10"></div>
              <div className="line"></div>
              <div className="line h8 w50"></div>
              <div className="line  w75"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const HomePageLoader = () => {
  return (
    <div className="home_loader">
      <div className="pl">
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__dot"></div>
        <div className="pl__text">Loading…</div>
      </div>
    </div>
  );
};
