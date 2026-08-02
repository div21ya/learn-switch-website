window.addEventListener("scroll", () => {
  moveProgressBar();
  handleBackToTop();
  handleActiveLinks();
});

function moveProgressBar() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight - document.documentElement.clientHeight;

  const scrolled = (winScroll / height) * 100;
  const bar = document.getElementById("myBar");

  if (bar) bar.style.width = scrolled + "%";
}



const sections = document.querySelectorAll("section[id]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.15 }
);

sections.forEach((sec) => {
  sec.classList.add("reveal");
  observer.observe(sec);
});

const navLinks = document.querySelectorAll(".nav-links a[href^='#']");

function handleActiveLinks() {
  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active-link");
  });

  const activeLink = document.querySelector(`.nav-links a[href="#${current}"]`);

  if (activeLink) {
    activeLink.classList.add("active-link");
  }
}


const themeBtn = document.getElementById("theme-switch");
const themeIcon = themeBtn ? themeBtn.querySelector("i") : null;

const savedTheme = localStorage.getItem("learnswitch-theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  if (themeIcon) themeIcon.className = "fa-solid fa-sun";
}

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    localStorage.setItem("learnswitch-theme", isDark ? "dark" : "light");

    if (themeIcon) {
      themeIcon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }
  });
}
const particleLayer = document.getElementById("nightParticles");

const backToTopBtn = document.getElementById("backToTop");

function handleBackToTop() {
  if (!backToTopBtn) return;

  if (window.scrollY > 400) {
    backToTopBtn.style.display = "flex";
    backToTopBtn.style.alignItems = "center";
    backToTopBtn.style.justifyContent = "center";
  } else {
    backToTopBtn.style.display = "none";
  }
}

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function createParticles(count = 25) {
  if (!particleLayer) return;
  particleLayer.innerHTML = ""; 

  for (let i = 0; i < count; i++) {
    const p = document.createElement("span");

 
    const left = Math.random() * 100;
    const top = Math.random() * 100;

    const duration = 6 + Math.random() * 8;

    const delay = Math.random() * 3;

    const size = 3 + Math.random() * 5;

    p.style.left = left + "vw";
    p.style.top = top + "vh";
    p.style.animationDuration = duration + "s";
    p.style.animationDelay = delay + "s";
    p.style.width = size + "px";
    p.style.height = size + "px";

    particleLayer.appendChild(p);
  }
}

function updateParticlesBasedOnTheme() {
  const isDark = document.body.classList.contains("dark-mode");
  if (isDark) {
    createParticles(28);
  } else {
    if (particleLayer) particleLayer.innerHTML = "";
  }
}

updateParticlesBasedOnTheme();

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    setTimeout(updateParticlesBasedOnTheme, 200); // tiny delay for smoother transition
  });
}

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
handleActiveLinks();
handleBackToTop();
moveProgressBar();
