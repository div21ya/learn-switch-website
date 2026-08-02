/**
 * auth-guard.js — LearnSwitch
 *
 * How it works:
 *  1. Add  <script src="auth-guard.js"></script>  to every page that needs protection.
 *     Do NOT add it to home, contact, login, or signup pages.
 *  2. When an unauthenticated visitor lands on a protected page they are
 *     immediately bounced to login.html.
 *  3. The intended URL is saved in sessionStorage ("ls_redirect") so that
 *     login.js can send them straight there after a successful login.
 */

(function () {
  // Pages that are always public — no guard needed on these.
  // (This list is just for documentation; the script is simply not included there.)
  const PUBLIC_PAGES = ["home.html", "home2.html", "contact.html", "login.html", "signup.html", "index.html", ""];

  function isLoggedIn() {
    return !!localStorage.getItem("learnswitch-user");
  }

  if (!isLoggedIn()) {
    // Save where the user was trying to go
    sessionStorage.setItem("ls_redirect", window.location.href);
    window.location.replace("login.html");
  }
})();
