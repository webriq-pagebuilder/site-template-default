import { useEffect } from "react";

// Implement dynamic colors in Tailwind
// https://github.com/fbrill/dynamic-colors-in-tailwind/blob/main/utils/index.js

// Determine the accessible color of text
export const getAccessibleColor = (hex) => {
  let color = hex.replace(/#/g, "");
  // if shorthand notation is passed in
  if (color.length !== 6) {
    color = `${color}${color}`;
  }
  // rgb values
  var r = parseInt(color.substr(0, 2), 16);
  var g = parseInt(color.substr(2, 2), 16);
  var b = parseInt(color.substr(4, 2), 16);
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "#000000" : "#FFFFFF";
};

// Change hex color into RGB
export const getRGBColor = (hex, type) => {
  let color = hex && hex?.replace(/#/g, "");

  // if shorthand notation is passed in
  if (color?.length !== 6) {
    color = `${color}${color}`;
  }
  // rgb values
  var r = parseInt(color?.substr(0, 2), 16);
  var g = parseInt(color?.substr(2, 2), 16);
  var b = parseInt(color?.substr(4, 2), 16);

  return `--color-${type}: ${r}, ${g}, ${b};`;
};

// for the color picker
export function useClickOutside(ref, handler) {
  useEffect(() => {
    let startedInside = false;
    let startedWhenMounted = false;

    const listener = (event) => {
      // Do nothing if `mousedown` or `touchstart` started inside ref element
      if (startedInside || !startedWhenMounted) return;
      // Do nothing if clicking ref"s element or descendent elements
      if (!ref?.current || ref?.current?.contains(event.target)) return;

      handler(event);
    };

    const validateEventStart = (event) => {
      startedWhenMounted = ref?.current;
      startedInside = ref?.current && ref?.current?.contains(event?.target);
    };

    document?.addEventListener("mousedown", validateEventStart);
    document?.addEventListener("touchstart", validateEventStart);
    document?.addEventListener("click", listener);

    return () => {
      document?.removeEventListener("mousedown", validateEventStart);
      document?.removeEventListener("touchstart", validateEventStart);
      document?.removeEventListener("click", listener);
    };
  }, [ref, handler]);
}
