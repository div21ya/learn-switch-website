document.addEventListener("DOMContentLoaded", () => {
  const selections = {
    subject: null,
    level: null,
    style: null,
  };

  document.querySelectorAll(".option-card").forEach((card) => {
    card.addEventListener("click", () => {
      const group = card.dataset.group;
      const value = card.dataset.value;

      document
        .querySelectorAll(`.option-card[data-group="${group}"]`)
        .forEach((c) => c.classList.remove("selected"));

      card.classList.add("selected");
      selections[group] = value;
    });
  });

  document.getElementById("generateRoadmap").addEventListener("click", () => {
    if (!selections.subject) {
      showError("Please choose a subject first.");
      return;
    }
    if (!selections.level) {
      showError("Please choose your current level.");
      return;
    }
    if (!selections.style) {
      showError("Please choose your learning style.");
      return;
    }

    const prefs = {
      subject: selections.subject,
      level: selections.level,
      style: selections.style,
    };
    localStorage.setItem("ls_roadmapPrefs", JSON.stringify(prefs));

    const progressKey = `progress_${prefs.subject}_${prefs.level}_${prefs.style}`;
    localStorage.removeItem(progressKey);

    window.location.href = "roadmap.html";
  });

  function showError(msg) {
    document.querySelector(".pref-error")?.remove();

    const err = document.createElement("p");
    err.className = "pref-error";
    err.textContent = "⚠️ " + msg;
    err.style.cssText = `
      color: #e53e3e;
      font-weight: 700;
      font-size: 14px;
      margin-top: 16px;
      text-align: center;
      animation: fadeSlide 0.3s ease;
    `;

    document.querySelector(".pref-actions").before(err);
    setTimeout(() => err.remove(), 3000);
  }

  const saved = JSON.parse(localStorage.getItem("ls_roadmapPrefs"));
  if (saved) {
    ["subject", "level", "style"].forEach((group) => {
      const val = saved[group];
      if (!val) return;
      const card = document.querySelector(
        `.option-card[data-group="${group}"][data-value="${val}"]`
      );
      if (card) {
        card.classList.add("selected");
        selections[group] = val;
      }
    });
  }
});
