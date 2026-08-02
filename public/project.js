/* =============================================
       HASH NAVIGATION — auto scroll + tab highlight
    ============================================= */
(function initHashNav() {
  // Highlight the correct tab based on current hash or scroll position
  function setActiveTab(hash) {
    document
      .querySelectorAll(".cat-tab")
      .forEach((t) => t.classList.remove("active"));
    const map = {
      "#webdev": "tab-webdev",
      "#dsa": "tab-dsa",
      "#python": "tab-python",
    };
    const id = map[hash];
    if (id) document.getElementById(id)?.classList.add("active");
  }

  // On load — if hash in URL, scroll to section smoothly
  const hash = window.location.hash;
  if (hash) {
    setActiveTab(hash);
    setTimeout(() => {
      document
        .querySelector(hash)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
  } else {
    // Default highlight first tab
    document.getElementById("tab-webdev")?.classList.add("active");
  }

  // Tab clicks — update active state
  document.querySelectorAll(".cat-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      setActiveTab(tab.getAttribute("href"));
    });
  });

  // Scroll spy — highlight tab as user scrolls through sections
  const sections = [
    { id: "webdev", tab: "tab-webdev" },
    { id: "dsa", tab: "tab-dsa" },
    { id: "python", tab: "tab-python" },
  ];

  window.addEventListener(
    "scroll",
    () => {
      let current = sections[0].tab;
      sections.forEach(({ id, tab }) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (window.scrollY >= el.offsetTop - 160) current = tab;
      });
      document
        .querySelectorAll(".cat-tab")
        .forEach((t) => t.classList.remove("active"));
      document.getElementById(current)?.classList.add("active");
    },
    { passive: true },
  );
})();
