(() => {
  "use strict";

  const SETTINGS = window.WEDDING_CONFIG || { eventDate: "" };
  const languageKey = "elham-mohamed-invitation-language";

  const copy = {
    en: {
      pageTitle: "Elham & Mohamed — Wedding Invitation",
      description: "Join the Al Hababoua and Al Ghazawy families in celebrating the wedding of Elham Abdel Nasser and Mohamed Mohie El Din at Premiere Hall, Festival Land, New Assiut.",
      skip: "Skip to invitation",
      headerNote: "Wedding Celebration",
      invitationAria: "Wedding Invitation",
      detailsAria: "Celebration Details",
      eyebrow: "TOGETHER WITH OUR FAMILIES",
      requestLine: "We joyfully invite you to share in our happiness and celebrate our marriage.",
      familyOne: "The Al Hababoua Family",
      familyTwo: "The Al Ghazawy Family",
      verseHeading: "In the Name of Allah",
      verseReference: "Surah Ar-Rum · Verse 21",
      detailsEyebrow: "Evening Details",
      timeLabel: "Time",
      timeValue: "8:00 in the evening",
      hallLabel: "Venue",
      hallValue: "Premiere Hall",
      locationLabel: "Address",
      locationValue: "Festival Land, New Assiut",
      dateLabel: "Date",
      venueCaption: "Your presence is the greatest gift—we can’t wait to celebrate with you.",
      mapCta: "Get Directions",
      footerLine: "Warmest wishes,",
      footerNames: "Elham & Mohamed"
    },
    ar: {
      pageTitle: "إلهام ومحمد — دعوة زفاف",
      description: "تتشرف عائلتا آل الهابابوا وآل الغزاوي بدعوتكم لحضور حفل زفاف إلهام عبد الناصر ومحمد محي الدين بقاعة بريمير، فيستيفال لاند، أسيوط الجديدة.",
      skip: "انتقل إلى نص الدعوة",
      headerNote: "دعوة فرح",
      invitationAria: "دعوة الزفاف",
      detailsAria: "تفاصيل الحفل",
      eyebrow: "بكل الود والمحبة",
      requestLine: "تكتمل فرحتنا بحضوركم وتشريفكم لنا في ليلة العمر.",
      familyOne: "آل الهابابوا",
      familyTwo: "آل الغزاوي",
      verseHeading: "قوله تعالى",
      verseReference: "سورة الروم · الآية ٢١",
      detailsEyebrow: "تفاصيل الليلة",
      timeLabel: "الموعد",
      timeValue: "الثامنة مساءً",
      hallLabel: "القاعة",
      hallValue: "قاعة بريمير",
      locationLabel: "العنوان",
      locationValue: "فيستيفال لاند – أسيوط الجديدة",
      dateLabel: "التاريخ",
      venueCaption: "تنورونا وتكملوا فرحتنا.. مستنيينكم.",
      mapCta: "الموقع على الخريطة",
      footerLine: "ودامت دياركم عامرة بالأفراح،",
      footerNames: "إلهام ومحمد"
    }
  };

  const names = {
    en: { elham: "Elham Abdel Nasser", mohamed: "Mohamed Mohie El Din" },
    ar: { elham: "إلهام عبد الناصر", mohamed: "محمد محي الدين" }
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const toggle = $("#languageToggle");
  const toggleLabel = $("#languageToggleLabel");
  const dateDetail = $("#dateDetail");
  const dateValue = $("#dateValue");

  const browserLocale = (navigator.languages && navigator.languages[0]) || navigator.language || "en";
  let preferred = "";
  try {
    preferred = localStorage.getItem(languageKey) || "";
  } catch (_) {}

  let currentLanguage = preferred || (browserLocale.toLowerCase().startsWith("ar") ? "ar" : "en");
  if (!copy[currentLanguage]) currentLanguage = "en";

  function setOptionalDate() {
    if (!dateDetail || !dateValue) return;

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
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
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

    $$("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (Object.prototype.hasOwnProperty.call(text, key)) {
        element.textContent = text[key];
      }
    });

    $$("[data-i18n-aria-label]").forEach((element) => {
      const key = element.dataset.i18nAriaLabel;
      if (Object.prototype.hasOwnProperty.call(text, key)) {
        element.setAttribute("aria-label", text[key]);
      }
    });

    $$("[data-name]").forEach((element) => {
      const key = element.dataset.name;
      if (names[currentLanguage][key]) {
        element.textContent = names[currentLanguage][key];
      }
    });

    if (toggleLabel) {
      toggleLabel.textContent = currentLanguage === "ar" ? "English" : "العربية";
    }
    if (toggle) {
      toggle.setAttribute(
        "aria-label",
        currentLanguage === "ar" ? "Switch to English" : "التبديل إلى العربية"
      );
    }

    setOptionalDate();
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = currentLanguage === "en" ? "ar" : "en";
      try {
        localStorage.setItem(languageKey, next);
      } catch (_) {}
      applyLanguage(next);
    });
  }

  applyLanguage(currentLanguage);
})();