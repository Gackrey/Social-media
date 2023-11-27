import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MoreOptionType } from "@writter/redux/models";
import "./index.css";

type MoreOptionsProps = {
  customStyle?: CSSProperties;
  options: MoreOptionType[];
};

const MoreOptions = ({ customStyle, options }: MoreOptionsProps) => {
  const [utilsState, setUtilsState] = useState(false);
  const clickRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        clickRef.current &&
        !clickRef.current.contains(event.target as Node)
      ) {
        setUtilsState(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const onOptionClick = (callBack: () => void) => {
    callBack();
    setUtilsState(false);
  };

  return (
    <div
      className="more-options-wrapper"
      style={customStyle ?? {}}
      ref={clickRef}
    >
      <FontAwesomeIcon
        className="pointer"
        icon={faEllipsisV as IconProp}
        onClick={() => setUtilsState((prev) => !prev)}
      />
      <div
        tabIndex={1}
        id="icon-utils"
        className="icon-utils"
        style={{ display: utilsState ? "block" : "none" }}
      >
        {options.map((option, index) => (
          <React.Fragment key={`option-${index}`}>
            <p
              className={option?.isDanger ? "danger" : ""}
              key={option.title}
              onClick={() => onOptionClick(option.callback)}
            >
              {option.title}
            </p>
            {index + 1 !== options.length ? <hr /> : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default MoreOptions;
