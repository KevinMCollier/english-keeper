import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import i18n from "./i18n";

export default function LanguageDetector() {
  const { lng } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!lng) return;

    if (["en", "ja"].includes(lng)) {
      i18n.changeLanguage(lng);
      localStorage.setItem("lang", lng);
    } else {
      // Unknown lang -> redirect to fallback
      navigate("/ja", { replace: true });
    }
  }, [lng, navigate]);

  return null;
}
