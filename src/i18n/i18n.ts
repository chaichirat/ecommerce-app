import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enLng from "./en.json";
import thLng from "./th.json";

const resources = {
  en: {
    translation: enLng,
  },
  th: {
    translation: thLng,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
