import { useEffect, useState } from "react";

const GUEST_STORAGE_KEY = "artisan_tale_guest_name";
const DEFAULT_GUEST_NAME = "Honored Guest";

/**
 * Resolves guest identity from:
 * 1. URL search parameters (?guest=..., ?name=..., ?to=...)
 * 2. Session / localStorage persistence (artisan_tale_guest_name)
 * 3. Default fallback ("Honored Guest")
 */
export function useGuestIdentity(): string {
  const [guestName, setGuestName] = useState<string>(DEFAULT_GUEST_NAME);

  useEffect(() => {
    try {
      // Step 1: Check URL search params
      const urlParams = new URLSearchParams(window.location.search);
      const paramName =
        urlParams.get("guest") ||
        urlParams.get("name") ||
        urlParams.get("to") ||
        urlParams.get("invite");

      if (paramName && paramName.trim()) {
        const decoded = decodeURIComponent(paramName.trim());
        setGuestName(decoded);
        localStorage.setItem(GUEST_STORAGE_KEY, decoded);
        return;
      }

      // Step 2: Check localStorage
      const stored = localStorage.getItem(GUEST_STORAGE_KEY);
      if (stored && stored.trim()) {
        setGuestName(stored.trim());
      }
    } catch {
      // Fallback to DEFAULT_GUEST_NAME
    }
  }, []);

  return guestName;
}
