import React, { useEffect, useRef, useState } from "react";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faShare } from "@fortawesome/free-solid-svg-icons";

const url = window.origin;

const ShareOption = ({ postId }: { postId: string }) => {
  const [shareState, setShareState] = useState(false);
  const clickRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        clickRef.current &&
        !clickRef.current.contains(event.target as Node)
      ) {
        setShareState(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="share-wrapper" ref={clickRef}>
      <div
        className="post-share-icon"
        onClick={() => setShareState((prev) => !prev)}
      >
        <FontAwesomeIcon icon={faShare as IconProp} />
        <span>Share</span>
      </div>
      {shareState ? (
        <div className="share-option-wrapper">
          <EmailShareButton
            url={url + `/post?postId=${postId}`}
            style={{
              marginRight: 10,
            }}
          >
            <EmailIcon size={32} round={true} />
          </EmailShareButton>
          <FacebookShareButton
            url={url + `/post?postId=${postId}`}
            style={{
              marginRight: 10,
            }}
          >
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
          <LinkedinShareButton
            url={url + `/post?postId=${postId}`}
            style={{
              marginRight: 10,
            }}
          >
            <LinkedinIcon size={32} round={true} />
          </LinkedinShareButton>
          <TelegramShareButton
            url={url + `/post?postId=${postId}`}
            style={{
              marginRight: 10,
            }}
          >
            <TelegramIcon size={32} round={true} />
          </TelegramShareButton>
          <TwitterShareButton
            url={url + `/post?postId=${postId}`}
            style={{
              marginRight: 10,
            }}
          >
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
          <WhatsappShareButton
            url={url + `/post?postId=${postId}`}
            style={{
              marginRight: 10,
            }}
          >
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
        </div>
      ) : null}
    </div>
  );
};

export default ShareOption;
