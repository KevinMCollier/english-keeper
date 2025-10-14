import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import i18n from "./i18n";

const ALLOWED = ['en', 'ja'];

export default function LanguageDetector() {
  const { lng } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!lng) return;

    if (!ALLOWED.includes(lng)) {
      navigate("/ja", { replace: true });
      return;
    }

    if (i18n.language !== lng) {
      i18n.changeLanguage(lng);
      // eslint-disable-next-line no-empty
      try { localStorage.setItem("lang", lng); } catch {}
    }
    document.documentElement.lang = lng;
  }, [lng, location.pathname, navigate]);

  return null;
}
