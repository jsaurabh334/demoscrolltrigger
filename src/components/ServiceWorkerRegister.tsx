"use client";

import { useEffect } from "react";

/**
 * Registers the Service Worker on mount.
 * This caches all JS, CSS, fonts, and page HTML in the browser
 * so subsequent visits load instantly from local storage.
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      // Register after page load to avoid blocking initial render
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .catch(() => {
            // SW registration failed — site still works normally
          });
      });
    }
  }, []);

  return null;
}
