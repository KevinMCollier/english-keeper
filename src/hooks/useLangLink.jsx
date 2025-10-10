// src/hooks/useLangLink.js
import { useParams } from "react-router-dom";

/**
 * Builds language-aware links (e.g., /en/#sessions or /ja/privacy).
 * Always includes the current :lng prefix.
 */
export default function useLangLink() {
  const { lng } = useParams();

  return (pathOrHash = "") => {
    // Normalize leading slash
    const normalized = pathOrHash.startsWith("/")
      ? pathOrHash
      : "/" + pathOrHash;

    return `/${lng}${normalized}`;
  };
}
