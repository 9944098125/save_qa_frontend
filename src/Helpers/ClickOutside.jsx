import React from "react";

export default function ClickOutside(ref, func) {
  const listener = (event) => {
    // listener function is telling, if it is not the clicked
    // in the current location of the ref given or
    // the current location of ref given container clicked location
    // then return do nothing--- or else execute the func given
    if (!ref.current || ref.current.contains(event.target)) {
      return;
    }
    func();
  };

  React.useEffect(() => {
    // the above function is executed when mouse is clicked happens
    // or touch pad touched
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, func]);
}
