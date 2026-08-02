// ── Redirect to dashboard if already logged in ──
(function () {
  if (localStorage.getItem("learnswitch-user")) {
    window.location.href = "dashboard.html";
  }
})();

document.addEventListener("DOMContentLoaded", function () {
  // ── Show/hide password toggle ──
  const pwInput = document.getElementById("password");
  const eyeBtn = document.getElementById("toggleLoginPw");
  if (eyeBtn && pwInput) {
    eyeBtn.addEventListener("click", function () {
      const show = pwInput.type === "password";
      pwInput.type = show ? "text" : "password";
      this.querySelector("i").className = show
        ? "fa-regular fa-eye-slash"
        : "fa-regular fa-eye";
    });
  }

  // ── Message helper ──
  function showMsg(text, type) {
    const el = document.getElementById("loginMsg");
    if (!el) return;
    el.textContent = text;
    el.style.display = "block";
    el.style.background =
      type === "error" ? "rgba(220,38,38,0.08)" : "rgba(22,163,74,0.08)";
    el.style.color = type === "error" ? "#dc2626" : "#16a34a";
    el.style.border =
      type === "error"
        ? "1px solid rgba(220,38,38,0.25)"
        : "1px solid rgba(22,163,74,0.25)";
  }

  // ── Login form submit ──
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const usernameVal = (document.getElementById("username").value || "")
      .trim()
      .toLowerCase();
    const passwordVal = document.getElementById("password").value || "";

    if (!usernameVal || !passwordVal) {
      showMsg("⚠ Please enter your username and password.", "error");
      return;
    }

    // Load all accounts (saved by email key, each has a username property)
    const accounts = JSON.parse(
      localStorage.getItem("learnswitch-accounts") || "{}",
    );

    // Find the account whose username matches
    const match = Object.values(accounts).find(function (acc) {
      return acc.username && acc.username.toLowerCase() === usernameVal;
    });

    if (!match) {
      showMsg(
        "✗ No account found with that username. Please sign up first.",
        "error",
      );
      return;
    }

    if (match.password !== passwordVal) {
      showMsg("✗ Wrong password. Please try again.", "error");
      return;
    }

    // Build session object
    var userData = {
      username: match.username,
      firstName: match.firstName || match.username,
      lastName: match.lastName || "",
      email: match.email || "",
      bio: match.bio || "",
      location: match.location || "",
      avatar: match.avatar || "",
      joined: match.joined || new Date().toLocaleDateString(),
    };

    localStorage.setItem("learnswitch-user", JSON.stringify(userData));

    showMsg("✓ Logged in! Redirecting…", "success");
    var btn = form.querySelector(".btn-login");
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = '<i class="fa-solid fa-check"></i> Done!';
    }

    setTimeout(function () {
      window.location.href = "dashboard.html";
    }, 900);
  });
});
