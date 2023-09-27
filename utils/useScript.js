import { useEffect, useState, useCallback, useRef } from "react";

function useScript(src) {
  const [status, setStatus] = useState(src ? "loading" : "idle");
  const scriptRef = useRef(null);

  const setStateFromEvent = useCallback((event) => {
    setStatus(event.type === "load" ? "ready" : "error");
  }, []);

  useEffect(() => {
    if (!src) {
      setStatus("idle");
      return;
    }

    let script = scriptRef.current;

    if (!script) {
      script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.id = `ecwid-script`;
      script.charset = "utf-8";
      script.setAttribute("data-cfasync", false);
      script.setAttribute("data-status", "loading");
      document.body.appendChild(script);
      scriptRef.current = script;
    } else {
      setStatus(script.getAttribute("data-status"));
    }

    script.addEventListener("load", setStateFromEvent);
    script.addEventListener("error", setStateFromEvent);

    return () => {
      if (script) {
        script.removeEventListener("load", setStateFromEvent);
        script.removeEventListener("error", setStateFromEvent);
      }
    };
  }, [src, setStateFromEvent]);

  return status;
}

export default useScript;
