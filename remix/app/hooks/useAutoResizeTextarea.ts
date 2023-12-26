import { useEffect } from "react";

// Custom hook for auto-resizing a textarea
export function useAutoResizeTextarea(elementId: string) {
  useEffect(() => {
    function handleTextareaInputResize() {
      const textarea = document.getElementById(elementId);
      textarea?.addEventListener("input", function () {
        this.style.height = "auto";
        this.style.height = this.scrollHeight + "px";
      });
    }
    handleTextareaInputResize(); // run once on mount
  }, []);
}
