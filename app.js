(() => {
  "use strict";

  const SETTINGS = window.WEDDING_CONFIG || { eventDate: "" };
  const languageKey = "elham-mohamed-invitation-language";
  const copy = {
    en: {
      pageTitle: "Elham & Mohamed | Wedding Invitation",
      description: "Please join Elham and Mohamed as they celebrate their wedding at Premiere Hall, Festival Land, New Assiut.",
      skip: "Skip to invitation",
      headerNote: "A wedding invitation",
      artLabel: "CUT-PAPER BOTANICALS",
      artCaption: "Shapes cut by hand, layered like paper.",
      eyebrow: "WITH OUR FAMILIES",
      requestLine: "Please join us as we celebrate our wedding.",
      coverMessage: "It would mean a great deal to have you with us.",
      familyOne: "Al Hababoua Family",
      familyTwo: "Al Ghazawy Family",
      verseHeading: "A verse on love and mercy",
      verseReference: "Surah Ar-Rum · 30:21",
      detailsEyebrow: "THE DETAILS",
      timeLabel: "TIME",
      timeValue: "8:00 PM",
      hallLabel: "THE HALL",
      hallValue: "Premiere Hall",
      locationLabel: "LOCATION",
      locationValue: "Festival Land, New Assiut",
      dateLabel: "DATE",
      venueCaption: "We’ll be waiting for you at Premiere Hall.",
      mapCta: "Get directions",
      footerLine: "We look forward to celebrating with you.",
      footerNames: "Elham & Mohamed",
      outsideNote: "A little paper invitation, made for a very big day."
    },
    ar: {
      pageTitle: "إلهام ومحمد | دعوة الزفاف",
      description: "دعوة زفاف إلهام ومحمد في قاعة بريمير، فيستيفال لاند، أسيوط الجديدة.",
      skip: "انتقل إلى الدعوة",
      headerNote: "دعوة زفاف",
      artLabel: "زخارف نباتية من الورق",
      artCaption: "أشكال مقصوصة ومتداخلة كطبقات الورق.",
      eyebrow: "بصحبة أهلنا",
      requestLine: "يسعدنا أن تشاركونا فرحتنا بزفافنا.",
      coverMessage: "وجودكم بيننا يضيف لفرحتنا الكثير.",
      familyOne: "آل هابابوا",
      familyTwo: "آل غزاوي",
      verseHeading: "آية في المودة والرحمة",
      verseReference: "سورة الروم · الآية ٢١",
      detailsEyebrow: "تفاصيل الفرح",
      timeLabel: "الموعد",
      timeValue: "الساعة ٨ مساءً",
      hallLabel: "القاعة",
      hallValue: "قاعة بريمير",
      locationLabel: "المكان",
      locationValue: "فيستيفال لاند، أسيوط الجديدة",
      dateLabel: "التاريخ",
      venueCaption: "نستناكم في قاعة بريمير، والفرحة بوجودكم تكمل.",
      mapCta: "افتح الموقع على خرائط جوجل",
      footerLine: "فرحتنا تكمل بوجودكم معانا.",
      footerNames: "إلهام ومحمد",
      outsideNote: "دعوة بسيطة على الورق، لفرحة كبيرة."
    }
  };

  const names = {
    en: { elham: "Elham Abdel Nasser", mohamed: "Mohamed Mohie El Din" },
    ar: { elham: "إلهام عبد الناصر", mohamed: "محمد محيي الدين" }
  };
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const toggle = $("#languageToggle");
  const toggleLabel = $("#languageToggleLabel");
  const dateDetail = $("#dateDetail");
  const dateValue = $("#dateValue");
  const browserLocale = (navigator.languages && navigator.languages[0]) || navigator.language || "en";
  let preferred = "";
  try { preferred = localStorage.getItem(languageKey) || ""; } catch (_) { /* Storage may be disabled. */ }
  let currentLanguage = preferred || (browserLocale.toLowerCase().startsWith("ar") ? "ar" : "en");
  if (!copy[currentLanguage]) currentLanguage = "en";

  function setOptionalDate() {
    const raw = String(SETTINGS.eventDate || "").trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
      dateDetail.hidden = true;
      return;
    }
    const [year, month, day] = raw.split("-").map(Number);
    const date = new Date(year, month - 1, day, 12);
    if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
      dateDetail.hidden = true;
      return;
    }
    dateValue.textContent = new Intl.DateTimeFormat(currentLanguage === "ar" ? "ar-EG" : "en-GB", {
      weekday: "long", day: "numeric", month: "long", year: "numeric"
    }).format(date);
    dateDetail.hidden = false;
  }

  function applyLanguage(language) {
    currentLanguage = copy[language] ? language : "en";
    const text = copy[currentLanguage];
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("lang-ar", currentLanguage === "ar");
    document.title = text.pageTitle;
    const description = $("meta[name='description']");
    if (description) description.content = text.description;
    const ogTitle = $("meta[property='og:title']");
    const ogDescription = $("meta[property='og:description']");
    if (ogTitle) ogTitle.content = text.pageTitle;
    if (ogDescription) ogDescription.content = text.description;

    $$('[data-i18n]').forEach((element) => {
      const key = element.dataset.i18n;
      if (Object.prototype.hasOwnProperty.call(text, key)) element.textContent = text[key];
    });
    $$('[data-name]').forEach((element) => {
      const key = element.dataset.name;
      if (names[currentLanguage][key]) element.textContent = names[currentLanguage][key];
    });
    toggleLabel.textContent = currentLanguage === "ar" ? "English" : "العربية";
    toggle.setAttribute("aria-label", currentLanguage === "ar" ? "Change language to English" : "تغيير اللغة إلى العربية");
    setOptionalDate();
  }

  toggle.addEventListener("click", () => {
    const next = currentLanguage === "en" ? "ar" : "en";
    try { localStorage.setItem(languageKey, next); } catch (_) { /* Language still changes for this visit. */ }
    applyLanguage(next);
  });

  applyLanguage(currentLanguage);
})();
