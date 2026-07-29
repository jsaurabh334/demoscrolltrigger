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
      if (process.env.NODE_ENV === "development") {
        // Unregister any existing service workers in dev to prevent HMR infinite loops
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (const registration of registrations) {
            registration.unregister();
          }
        });
      } else {
        // Register after page load in production
        window.addEventListener("load", () => {
          navigator.serviceWorker
            .register("/sw.js")
            .catch(() => {
              // SW registration failed
            });
        });
      }
    }
  }, []);

  return null;
}
