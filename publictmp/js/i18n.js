// Moteur i18n — applique translations.js aux éléments [data-i18n],
// gère le bouton de changement de langue et retient le choix (localStorage).
(function () {
  const STORAGE_KEY = "site-lang";
  const DEFAULT_LANG = "fr";
  const SUPPORTED_LANGS = ["fr", "en"];

  function getSavedLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return SUPPORTED_LANGS.includes(saved) ? saved : DEFAULT_LANG;
  }

  // Récupère translations.fr.main.aboutTitle à partir de la chaîne "main.aboutTitle"
  function resolveKey(dict, key) {
    return key.split(".").reduce((obj, part) => (obj ? obj[part] : undefined), dict);
  }

  function updateAge(lang) {
    const ageEl = document.getElementById("age");
    if (!ageEl) return;

    const birthDate = new Date(2004, 1, 25);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const hasHadBirthday = today >= new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (!hasHadBirthday) age--;

    const dict = translations[lang].main;
    ageEl.textContent = `${age} ${dict.ageSuffix} · ${dict.birthDate}`;
  }

  function applyLang(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) lang = DEFAULT_LANG;
    const dict = translations[lang];

    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const value = resolveKey(dict, el.getAttribute("data-i18n"));
      if (value !== undefined) el.textContent = value;
    });

    updateAge(lang);

    document.querySelectorAll(".lang-option").forEach((btn) => {
      const isActive = btn.getAttribute("data-lang") === lang;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-pressed", String(isActive));
    });

    localStorage.setItem(STORAGE_KEY, lang);
  }

  function initLangSwitcher() {
    document.querySelectorAll(".lang-option").forEach((btn) => {
      btn.addEventListener("click", () => applyLang(btn.getAttribute("data-lang")));
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initLangSwitcher();
    applyLang(getSavedLang());
  });
})();
