import React, { CSSProperties } from "react";
import ContentLoader from "react-content-loader";
import "../PostDesign/index.css";
import "../ConnectToPeople/index.css";

export const PostSkeleton = ({ style }: { style?: CSSProperties }) => {
  return (
    <div className="post" style={style ?? {}}>
      <ContentLoader
        speed={4}
        width="100%"
        height={250}
        viewBox="0 0 476 124"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="58" y="8" rx="3" ry="3" width="88" height="8" />
        <rect x="58" y="26" rx="3" ry="3" width="52" height="8" />
        <rect x="0" y="66" rx="3" ry="3" width="410" height="8" />
        <rect x="0" y="82" rx="3" ry="3" width="380" height="8" />
        <rect x="0" y="98" rx="3" ry="3" width="178" height="8" />
        <circle cx="25" cy="25" r="25" />
      </ContentLoader>
    </div>
  );
};

export const FriendDesktopSkeleton = () => {
  return (
    <div className="user-box">
      <ContentLoader
        speed={4}
        width="100%"
        height={67}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="58" y="8" rx="3" ry="3" width="70%" height="12" />
        <rect x="58" y="36" rx="3" ry="3" width="70%" height="12" />
        <circle cx="25" cy="30" r="25" />
      </ContentLoader>
    </div>
  );
};
export const FriendMobileSkeleton = () => {
  return (
    <div className="user-box">
      <ContentLoader
        speed={4}
        width={150}
        height={150}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="10" y="68" rx="3" ry="3" width="90%" height="12" />
        <rect x="10" y="96" rx="3" ry="3" width="90%" height="12" />
        <circle cx="50%" cy="30" r="25" />
      </ContentLoader>
    </div>
  );
};

export const UserPageSkeleton = () => {
  return (
    <div className="bg-color">
      <div className="user-details-box">
        <ContentLoader
          speed={4}
          width={700}
          height={150}
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="158" y="20" rx="3" ry="3" width="80" height="12" />
          <rect x="158" y="50" rx="3" ry="3" width="80" height="12" />
          <rect x="300" y="20" rx="3" ry="3" width="80" height="12" />
          <rect x="300" y="50" rx="3" ry="3" width="80" height="12" />
          <circle cx="35" cy="50" r="35" />
        </ContentLoader>
      </div>
      <PostSkeleton style={{ margin: "auto" }} />
      <PostSkeleton style={{ margin: "auto" }} />
      <PostSkeleton style={{ margin: "auto" }} />
    </div>
  );
};
