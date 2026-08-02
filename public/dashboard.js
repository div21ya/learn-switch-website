/* ========================
   AUTH GUARD
======================== */
const userData = JSON.parse(localStorage.getItem("learnswitch-user") || "null");
if (!userData) {
  window.location.href = "login.html";
}

/* ========================
   THEME INIT
======================== */
function initTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.body.classList.add("dark-mode");
  }
}
initTheme();

/* ========================
   HELPERS — localStorage
======================== */
function getProfile() {
  return JSON.parse(localStorage.getItem("learnswitch-user") || "{}");
}

function saveProfile(data) {
  localStorage.setItem("learnswitch-user", JSON.stringify(data));
}

function getStoredSessions() {
  return JSON.parse(localStorage.getItem("ls-sessions") || "{}");
}

/* ========================
   ROADMAP HELPERS
======================== */
function getRoadmapPrefs() {
  return (
    JSON.parse(localStorage.getItem("ls_roadmapPrefs") || "null") || {
      subject: "dsa",
      level: "beginner",
      style: "video",
    }
  );
}

function getRoadmapProgress(prefs) {
  const key = `progress_${prefs.subject}_${prefs.level}_${prefs.style}`;
  return (
    JSON.parse(localStorage.getItem(key) || "null") || {
      completedSteps: [],
      quizPassed: false,
      quizScore: null,
    }
  );
}

/* ========================
   GET ALL GENERATED ROADMAPS
   Scans localStorage for every progress_* key
======================== */
function getAllRoadmaps() {
  const roadmaps = [];
  const subjectLabels = {
    web: "Web Development",
    dsa: "Data Structures & Algorithms",
  };
  const levelLabels = {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  };
  const styleLabels = { video: "Video", docs: "Docs", ai: "AI Assisted" };
  const styleIcons = {
    video: "fa-play",
    docs: "fa-file-lines",
    ai: "fa-robot",
  };
  const subjectIcons = { web: "fa-code", dsa: "fa-diagram-project" };

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith("progress_")) continue;

    // key format: progress_<subject>_<level>_<style>
    const parts = key.replace("progress_", "").split("_");
    if (parts.length < 3) continue;

    const style = parts[parts.length - 1];
    const level = parts[parts.length - 2];
    const subject = parts.slice(0, parts.length - 2).join("_");

    const progress = JSON.parse(localStorage.getItem(key) || "{}");
    const completedSteps = progress.completedSteps || [];
    const doneCount = completedSteps.filter((s) => s <= 5).length;
    const pct = Math.round((doneCount / 5) * 100);

    roadmaps.push({
      key,
      subject,
      level,
      style,
      label: `${subjectLabels[subject] || subject} — ${levelLabels[level] || level}`,
      styleLbl: styleLabels[style] || style,
      styleIcon: styleIcons[style] || "fa-graduation-cap",
      subjectIcon: subjectIcons[subject] || "fa-book",
      completedSteps,
      doneCount,
      pct,
      quizPassed: progress.quizPassed || false,
    });
  }

  // Sort: most progress first
  roadmaps.sort((a, b) => b.pct - a.pct);
  return roadmaps;
}

/* ========================
   STEP LABELS
======================== */
const STEP_LABELS = {
  web: {
    1: "Foundation Setup",
    2: "Core Concepts",
    3: "Build Projects",
    4: "Interview Prep",
    5: "Skill Quizzes",
    6: "Next Level",
  },
  dsa: {
    1: "Core Concepts",
    2: "Learn & Practice",
    3: "Easy Problems",
    4: "Interview Prep",
    5: "Skill Quizzes",
    6: "Next Level",
  },
};

/* ========================
   ROADMAP ACCORDION RENDER
   Shows all roadmaps the user has generated
======================== */
function renderRoadmapAccordion() {
  const container = document.getElementById("roadmapAccordion");
  if (!container) return;

  const roadmaps = getAllRoadmaps();

  if (roadmaps.length === 0) {
    container.innerHTML = `
      <div class="no-roadmap-msg">
        <i class="fa-solid fa-map" style="font-size:28px;opacity:0.3;margin-bottom:10px;display:block;"></i>
        No roadmaps yet. Generate one to get started!
      </div>`;
    return;
  }

  container.innerHTML = roadmaps
    .map((rm, idx) => {
      const labels = STEP_LABELS[rm.subject] || STEP_LABELS.dsa;
      const isActive = idx === 0; // first (highest progress) open by default

      const stepsHtml = [1, 2, 3, 4, 5, 6]
        .map((n) => {
          let unlocked;
          if (n === 1) unlocked = true;
          else if (n === 6)
            unlocked = [1, 2, 3, 4, 5].every((s) =>
              rm.completedSteps.includes(s),
            );
          else unlocked = rm.completedSteps.includes(1);

          let status;
          if (rm.completedSteps.includes(n)) status = "done";
          else if (!unlocked) status = "locked";
          else status = "active";

          const icon =
            status === "done" ? "✓" : status === "locked" ? "🔒" : "→";

          return `
        <div class="roadmap-step">
          <div class="step-circle ${status}">${icon}</div>
          <div class="step-info">
            <p class="step-name">${labels[n] || "Step " + n}</p>
          </div>
          <span class="step-badge ${status}">${status === "done" ? "Done" : status === "locked" ? "Locked" : "Active"}</span>
        </div>`;
        })
        .join("");

      const progressColor =
        rm.pct >= 80 ? "#16a34a" : rm.pct >= 40 ? "#7400b8" : "#0891b2";

      return `
      <div class="rm-accordion-item ${isActive ? "open" : ""}">
        <div class="rm-accordion-header" onclick="toggleAccordion(this)">
          <div class="rm-acc-left">
            <div class="rm-acc-icon">
              <i class="fa-solid ${rm.subjectIcon}"></i>
            </div>
            <div>
              <div class="rm-acc-title">${rm.label}</div>
              <div class="rm-acc-meta">
                <i class="fa-solid ${rm.styleIcon}"></i> ${rm.styleLbl}
                &nbsp;·&nbsp;
                <span style="color:${progressColor};font-weight:700;">${rm.pct}% complete</span>
              </div>
            </div>
          </div>
          <div class="rm-acc-right">
            <div class="rm-acc-progress-ring" title="${rm.pct}%">
              <svg viewBox="0 0 36 36" width="40" height="40">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--border)" stroke-width="3"/>
                <circle cx="18" cy="18" r="15.9" fill="none"
                  stroke="${progressColor}"
                  stroke-width="3"
                  stroke-dasharray="${rm.pct} ${100 - rm.pct}"
                  stroke-dashoffset="25"
                  stroke-linecap="round"
                  style="transition:stroke-dasharray 0.8s ease;"/>
              </svg>
              <span class="rm-acc-pct">${rm.pct}%</span>
            </div>
            <i class="fa-solid fa-chevron-down rm-acc-chevron"></i>
          </div>
        </div>
        <div class="rm-accordion-body">
          ${stepsHtml}
          <a href="roadmap.html" class="rm-view-btn" onclick="activateRoadmap('${rm.subject}','${rm.level}','${rm.style}')">
            <i class="fa-solid fa-arrow-up-right-from-square"></i> Open Roadmap
          </a>
        </div>
      </div>`;
    })
    .join("");
}

/* ========================
   ACCORDION TOGGLE
======================== */
function toggleAccordion(header) {
  const item = header.closest(".rm-accordion-item");
  const isOpen = item.classList.contains("open");
  // Close all
  document
    .querySelectorAll(".rm-accordion-item.open")
    .forEach((el) => el.classList.remove("open"));
  // Open clicked if it was closed
  if (!isOpen) item.classList.add("open");
}

/* ========================
   ACTIVATE ROADMAP (set prefs before navigating)
======================== */
function activateRoadmap(subject, level, style) {
  localStorage.setItem(
    "ls_roadmapPrefs",
    JSON.stringify({ subject, level, style }),
  );
}

/* ========================
   ROADMAP → DASHBOARD SYNC
   Updates skill bars & stat steps from active roadmap
======================== */
function syncRoadmapToDashboard() {
  const prefs = getRoadmapPrefs();
  const progress = getRoadmapProgress(prefs);

  const completedSteps = progress.completedSteps || [];
  const doneCount = completedSteps.filter((s) => s <= 5).length; // FIXED: was undefined before
  const pct = Math.round((doneCount / 5) * 100);

  const dsaLbl = document.getElementById("dsaSkill");
  const webLbl = document.getElementById("webSkill");
  const dsaBar = document.getElementById("dsaBar");
  const webBar = document.getElementById("webBar");

  if (prefs.subject === "dsa") {
    if (dsaLbl) dsaLbl.textContent = pct + "%";
    if (dsaBar) dsaBar.style.width = pct + "%";
  }

  if (prefs.subject === "web") {
    if (webLbl) webLbl.textContent = pct + "%";
    if (webBar) webBar.style.width = pct + "%";
  }

  const statStepsEl = document.getElementById("statSteps");
  if (statStepsEl) statStepsEl.textContent = `${doneCount}/5`;

  // Also render the full accordion
  renderRoadmapAccordion();
}

/* ========================
   SESSION → STATS SYNC
======================== */
function syncSessionStats() {
  const sessions = getStoredSessions();
  const keys = Object.keys(sessions).sort();

  const totalHours = keys.length;
  const statHoursEl = document.getElementById("statHours");
  if (statHoursEl) statHoursEl.textContent = totalHours;

  let streak = 0;
  const today = new Date();

  for (let i = 0; ; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);

    const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

    if (sessions[k]) streak++;
    else break;
  }

  const statStreakEl = document.getElementById("statStreak");
  if (statStreakEl) statStreakEl.textContent = streak;
}

/* ========================
   PROFILE UI
======================== */
function applyProfileToUI() {
  const p = getProfile();

  const displayName = p.firstName
    ? `${p.firstName} ${p.lastName || ""}`.trim()
    : p.username || "Learner";

  const hour = new Date().getHours();
  const greet =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const greetEl = document.getElementById("dashGreeting");
  if (greetEl) greetEl.textContent = `${greet}, ${displayName}! 👋`;

  const nameEl = document.getElementById("profileName");
  if (nameEl) nameEl.textContent = displayName;

  const emailEl = document.getElementById("profileEmail");
  if (emailEl) emailEl.textContent = p.email || "";
}

applyProfileToUI();

/* ========================
   THEME TOGGLE
======================== */
document.getElementById("theme-switch").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

/* ========================
   SIDEBAR NAVIGATION
   Smooth scroll to section on click
======================== */
document.querySelectorAll(".sb-item[data-section]").forEach((item) => {
  item.addEventListener("click", () => {
    const sectionId = item.dataset.section;
    const target = document.getElementById(sectionId);
    if (!target) return;

    // Update active state
    document
      .querySelectorAll(".sb-item")
      .forEach((i) => i.classList.remove("active"));
    item.classList.add("active");

    // Smooth scroll
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* ========================
   REAL-TIME SYNC
   Listens for localStorage changes from other tabs
   + polls every 5s for same-tab updates (e.g. roadmap.html open in same tab)
======================== */
window.addEventListener("storage", (e) => {
  // Any roadmap progress or session key changed → re-sync
  if (
    e.key &&
    (e.key.startsWith("progress_") ||
      e.key.startsWith("ls-sessions") ||
      e.key.startsWith("ls_roadmapPrefs") ||
      e.key.startsWith("sessions_"))
  ) {
    syncRoadmapToDashboard();
    syncSessionStats();
  }
});

// Poll every 5 seconds to catch same-tab changes
setInterval(() => {
  syncRoadmapToDashboard();
  syncSessionStats();
}, 5000);

/* ========================
   DATE DISPLAY
======================== */
const dateEl = document.getElementById("dashDate");
if (dateEl) {
  const now = new Date();
  dateEl.textContent = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ========================
   LOGOUT LOGIC
======================== */
function logout() {
  // Clear user session
  localStorage.removeItem("learnswitch-user");
  sessionStorage.removeItem("ls_redirect");

  // Redirect to home/login
  window.location.href = "home.html";
}

/* Attach logout events */
document.addEventListener("DOMContentLoaded", () => {
  const navLogout = document.getElementById("navLogoutBtn");
  const sbLogout = document.getElementById("sbLogout");

  if (navLogout) {
    navLogout.addEventListener("click", logout);
  }

  if (sbLogout) {
    sbLogout.addEventListener("click", logout);
  }
});

/* ========================
   NAVBAR USER DROPDOWN
======================== */
document.addEventListener("DOMContentLoaded", () => {
  const user = JSON.parse(localStorage.getItem("learnswitch-user") || "null");

  const guestBtn = document.getElementById("navGuestBtn");
  const loggedIn = document.getElementById("navLoggedIn");
  const avatarBtn = document.getElementById("navAvatarBtn");
  const dropdown = document.getElementById("navDropdown");
  const logoutBtn = document.getElementById("navLogoutBtn");
  const dropUser = document.getElementById("navDropUser");

  // If user logged in → switch UI
  if (user) {
    if (guestBtn) guestBtn.style.display = "none";
    if (loggedIn) loggedIn.style.display = "block";

    if (dropUser) {
      dropUser.textContent = user.username || user.email;
    }
  }

  // Toggle dropdown
  if (avatarBtn) {
    avatarBtn.addEventListener("click", () => {
      if (!dropdown) return;

      dropdown.style.display =
        dropdown.style.display === "block" ? "none" : "block";
    });
  }

  // Click outside → close dropdown
  document.addEventListener("click", (e) => {
    if (!avatarBtn || !dropdown) return;

    if (!avatarBtn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.style.display = "none";
    }
  });

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("learnswitch-user");
      sessionStorage.removeItem("ls_redirect");
      window.location.href = "home.html";
    });
  }
});
/* ========================
   INIT
======================== */
syncRoadmapToDashboard();
syncSessionStats();
