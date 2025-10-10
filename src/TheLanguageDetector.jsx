import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import i18n from "./i18n";

const ALLOWED = ['en', 'ja'];

export default function LanguageDetector() {
  const { lng } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlLng = lng; // from :lng param
    if (!urlLng) return;

    if (!ALLOWED.includes(urlLng)) {
      // Unknown lang -> go to default
      navigate("/ja", { replace: true });
      return;
    }

    // If i18n is out of sync with the URL, fix it
    if (i18n.language !== urlLng) {
      i18n.changeLanguage(urlLng);
      try {
        localStorage.setItem("lang", urlLng);
      // eslint-disable-next-line no-empty
      } catch {}
    }
    // Re-run this effect whenever the route changes (manual edits, refreshes, nav)
    // so URL language always remains the source of truth.
  }, [lng, location.pathname, navigate]);

  return null;
}
