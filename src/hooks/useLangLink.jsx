// src/hooks/useLangLink.js
import { useParams } from "react-router-dom";

export default function useLangLink() {
  const { lng } = useParams();
  const safeLng = (lng === 'en' || lng === 'ja') ? lng : 'en';

  return (pathOrHash = "") => {
    const normalized = pathOrHash.startsWith("/") ? pathOrHash : "/" + pathOrHash;
    return `/${safeLng}${normalized}`;
  };
}
