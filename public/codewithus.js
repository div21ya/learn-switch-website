/* ================================================================
   CODE WITH US — Full IDE Engine
   Features:
   - Multi-file tabs (web mode: html/css/js files)
   - JavaScript sandbox mode
   - C compiler via Judge0 public API
   - Download all files as .zip (JSZip)
   - Smooth resizable panels
   - Line numbers synced
   - Status bar (lang, cursor, lines)
   - Tab key support & auto-indent
   - Keyboard shortcut: Ctrl+Enter = Run
================================================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ── DOM refs ── */
  const editor = document.getElementById("codeEditor");
  const lineNums = document.getElementById("lineNums");
  const runBtn = document.getElementById("runBtn");
  const clearBtn = document.getElementById("clearBtn");
  const downloadBtn = document.getElementById("downloadBtn");
  const langSelect = document.getElementById("lang-select");
  const iframe = document.getElementById("previewFrame");
  const consoleLog = document.getElementById("consoleLog");
  const consoleClear = document.getElementById("consoleClear");
  const outputBody = document.getElementById("outputBody");
  const tabBar = document.getElementById("tabBar");
  const addTabBtn = document.getElementById("addTabBtn");
  const stdinArea = document.getElementById("stdinArea");
  const stdinInput = document.getElementById("stdinInput");
  const compileBadge = document.getElementById("compileBadge");
  const editorPane = document.getElementById("editorPane");
  const outputPane = document.getElementById("outputPane");
  const dragBar = document.getElementById("dragBar");
  const labPanel = document.getElementById("labPanel");

  /* Status bar refs */
  const statusLangTxt = document.getElementById("statusLangTxt");
  const statusLines = document.getElementById("statusLines");
  const statusCursor = document.getElementById("statusCursor");
  const statusMsg = document.getElementById("statusMsg");

  /* ================================================================
     FILE SYSTEM (multi-file for web mode)
  ================================================================ */

  const FILE_ICONS = {
    html: "fa-brands fa-html5",
    css: "fa-brands fa-css3-alt",
    js: "fa-brands fa-js",
    c: "fa-solid fa-c",
    txt: "fa-solid fa-file-lines",
  };

  const DEFAULT_WEB_FILES = [
    {
      id: "index.html",
      name: "index.html",
      lang: "html",
      content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Project</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Hello LearnSwitch! ⚡</h1>
  <p>Edit HTML, CSS and JS — click <strong>Run</strong> to preview.</p>
  <button onclick="greet()">Say Hello</button>
  <script src="script.js"><\/script>
</body>
</html>`,
    },
    {
      id: "style.css",
      name: "style.css",
      lang: "css",
      content: `/* style.css */
body {
  font-family: 'Segoe UI', sans-serif;
  background: #0f172a;
  color: #e2e8f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 2.4rem;
  background: linear-gradient(90deg, #7400b8, #56cfe1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 12px;
}

button {
  margin-top: 20px;
  padding: 12px 28px;
  background: linear-gradient(135deg, #7400b8, #56cfe1);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(116,0,184,0.4);
}`,
    },
    {
      id: "script.js",
      name: "script.js",
      lang: "js",
      content: `// script.js
function greet() {
  alert("Hello from LearnSwitch! 🚀");
  console.log("Button clicked!");
}

console.log("script.js loaded ✅");`,
    },
  ];

  const DEFAULT_JS_FILE = {
    id: "main.js",
    name: "main.js",
    lang: "js",
    content: `// JavaScript Sandbox
// console.log output appears below ↓

const numbers = [1, 2, 3, 4, 5];
const squared = numbers.map(n => n ** 2);

console.log("Squares:", squared);
console.log("Sum:", squared.reduce((a, b) => a + b, 0));

// Try objects
const user = { name: "LearnSwitch", version: 2 };
console.log("User:", user);`,
  };

  const DEFAULT_C_FILE = {
    id: "main.c",
    name: "main.c",
    lang: "c",
    content: `#include <stdio.h>

int main() {
    printf("Hello from LearnSwitch! \\n");

    // Simple loop
    for (int i = 1; i <= 5; i++) {
        printf("  Line %d\\n", i);
    }

    // Read from stdin
    // int n;
    // scanf("%d", &n);
    // printf("You entered: %d\\n", n);

    return 0;
}`,
  };

  /* ── State ── */
  let mode = "web"; // "web" | "js" | "c"
  let files = []; // array of file objects
  let activeFileId = null;
  let fileCounter = 4; // for unique IDs on new files

  /* ================================================================
     FILE MANAGEMENT
  ================================================================ */

  function getActiveFile() {
    return files.find((f) => f.id === activeFileId) || null;
  }

  function saveActiveFile() {
    const f = getActiveFile();
    if (f) f.content = editor.value;
  }

  function loadFile(id) {
    saveActiveFile();
    activeFileId = id;
    const f = getActiveFile();
    if (!f) return;
    editor.value = f.content;
    updateLineNumbers();
    updateStatusBar();
    renderTabs();
  }

  function addFile() {
    const ext = mode === "c" ? "c" : "js";
    const name = `file${fileCounter++}.${ext}`;
    const f = { id: name, name, lang: ext, content: `// ${name}\n` };
    files.push(f);
    renderTabs();
    loadFile(f.id);
  }

  function closeFile(id) {
    if (files.length <= 1) return; // keep at least one
    const idx = files.findIndex((f) => f.id === id);
    files = files.filter((f) => f.id !== id);
    // pick neighbour
    const newId = files[Math.min(idx, files.length - 1)].id;
    activeFileId = newId;
    editor.value = getActiveFile().content;
    updateLineNumbers();
    renderTabs();
  }

  function renameFile(id) {
    const f = files.find((f) => f.id === id);
    if (!f) return;

    const tab = tabBar.querySelector(`[data-id="${id}"] .tab-name`);
    if (!tab) return;

    const inp = document.createElement("input");
    inp.className = "tab-rename-input";
    inp.value = f.name;
    inp.style.width = Math.max(80, f.name.length * 8) + "px";

    tab.replaceWith(inp);
    inp.focus();
    inp.select();

    const finish = () => {
      const newName = inp.value.trim() || f.name;
      f.name = newName;
      // update extension/lang
      const ext = newName.split(".").pop().toLowerCase();
      if (["html", "htm"].includes(ext)) f.lang = "html";
      else if (ext === "css") f.lang = "css";
      else if (ext === "js") f.lang = "js";
      else if (ext === "c") f.lang = "c";
      renderTabs();
    };

    inp.addEventListener("blur", finish);
    inp.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        inp.blur();
      }
      if (e.key === "Escape") {
        inp.value = f.name;
        inp.blur();
      }
    });
  }

  /* ── Render file tabs ── */
  function getFileIcon(lang) {
    return FILE_ICONS[lang] || "fa-solid fa-file-code";
  }

  function renderTabs() {
    // Remove old tabs (keep addTabBtn)
    tabBar.querySelectorAll(".tab-btn").forEach((t) => t.remove());

    files.forEach((f) => {
      const btn = document.createElement("button");
      btn.className = "tab-btn" + (f.id === activeFileId ? " active" : "");
      btn.dataset.id = f.id;
      btn.title = "Double-click to rename";

      btn.innerHTML = `
        <i class="${getFileIcon(f.lang)} tab-icon"></i>
        <span class="tab-name">${escHtml(f.name)}</span>
        <button class="tab-close" title="Close file">✕</button>
      `;

      btn.addEventListener("click", () => loadFile(f.id));
      btn.addEventListener("dblclick", () => renameFile(f.id));
      btn.querySelector(".tab-close").addEventListener("click", (e) => {
        e.stopPropagation();
        closeFile(f.id);
      });

      tabBar.insertBefore(btn, addTabBtn);
    });
  }

  /* ================================================================
     MODE SWITCHING
  ================================================================ */

  function initMode(newMode) {
    mode = newMode;

    // Reset files
    if (mode === "web") {
      files = DEFAULT_WEB_FILES.map((f) => ({ ...f }));
      activeFileId = "index.html";
      tabBar.style.display = "";
      addTabBtn.style.display = "";
      downloadBtn.style.display = "";
      stdinArea.classList.remove("visible");
      outputBody.className = "panel-body output-body html-mode";
      statusLangTxt.textContent = "HTML/CSS/JS";
    } else if (mode === "js") {
      files = [{ ...DEFAULT_JS_FILE }];
      activeFileId = "main.js";
      tabBar.style.display = "";
      addTabBtn.style.display = "";
      downloadBtn.style.display = "none";
      stdinArea.classList.remove("visible");
      outputBody.className = "panel-body output-body js-mode";
      statusLangTxt.textContent = "JavaScript";
    } else if (mode === "c") {
      files = [{ ...DEFAULT_C_FILE }];
      activeFileId = "main.c";
      tabBar.style.display = "";
      addTabBtn.style.display = "";
      downloadBtn.style.display = "none";
      stdinArea.classList.add("visible");
      outputBody.className = "panel-body output-body c-mode";
      statusLangTxt.textContent = "C";
    }

    editor.value = getActiveFile().content;
    consoleLog.textContent = "";
    iframe.srcdoc = "";
    compileBadge.innerHTML = "";
    updateLineNumbers();
    updateStatusBar();
    renderTabs();
  }

  /* ================================================================
     LINE NUMBERS
  ================================================================ */

  function updateLineNumbers() {
    if (!lineNums) return;
    const lines = Math.max(1, editor.value.split("\n").length);
    let s = "";
    for (let i = 1; i <= lines; i++) s += i + "\n";
    lineNums.textContent = s;
    statusLines.textContent = `${lines} line${lines !== 1 ? "s" : ""}`;
  }

  editor.addEventListener("input", updateLineNumbers);
  editor.addEventListener("scroll", () => {
    lineNums.scrollTop = editor.scrollTop;
  });

  /* ================================================================
     STATUS BAR
  ================================================================ */

  function updateStatusBar() {
    const lines = editor.value.split("\n").length;
    statusLines.textContent = `${lines} line${lines !== 1 ? "s" : ""}`;
  }

  editor.addEventListener("click", updateCursor);
  editor.addEventListener("keyup", updateCursor);
  function updateCursor() {
    const text = editor.value.substring(0, editor.selectionStart);
    const ln = text.split("\n").length;
    const col = text.split("\n").pop().length + 1;
    statusCursor.textContent = `Ln ${ln}, Col ${col}`;
  }

  /* ================================================================
     TAB KEY & AUTO-INDENT
  ================================================================ */

  editor.addEventListener("keydown", (e) => {
    // Tab → 2 spaces
    if (e.key === "Tab") {
      e.preventDefault();
      const s = editor.selectionStart;
      const v = editor.value;
      editor.value =
        v.substring(0, s) + "  " + v.substring(editor.selectionEnd);
      editor.selectionStart = editor.selectionEnd = s + 2;
      updateLineNumbers();
      return;
    }

    // Ctrl/Cmd+Enter → Run
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      runCode();
      return;
    }

    // Auto-close brackets/quotes
    const pairs = { "(": ")", "[": "]", "{": "}", '"': '"', "'": "'" };
    if (pairs[e.key] && e.key !== '"' && e.key !== "'") {
      // only for brackets
      const close = pairs[e.key];
      const s = editor.selectionStart;
      const v = editor.value;
      if (editor.selectionStart === editor.selectionEnd) {
        e.preventDefault();
        editor.value = v.substring(0, s) + e.key + close + v.substring(s);
        editor.selectionStart = editor.selectionEnd = s + 1;
        updateLineNumbers();
      }
    }
  });

  /* ================================================================
     CONSOLE HELPERS
  ================================================================ */

  function consoleClear_fn() {
    consoleLog.textContent = "";
  }

  function consoleWrite(text, type = "ok") {
    const span = document.createElement("span");
    span.className = "log-" + type;
    span.textContent = text + "\n";
    consoleLog.appendChild(span);
    consoleLog.scrollTop = consoleLog.scrollHeight;
  }

  function consoleReset() {
    consoleLog.textContent = "";
    compileBadge.innerHTML = "";
  }

  /* ================================================================
     RUN CODE
  ================================================================ */

  function runCode() {
    saveActiveFile();

    if (mode === "web") runWeb();
    if (mode === "js") runJS();
    if (mode === "c") runC();
  }

  /* ── Web: bundle all files into srcdoc ── */
  function runWeb() {
    consoleReset();

    const htmlFile = files.find((f) => f.lang === "html") || files[0];
    const cssFiles = files.filter((f) => f.lang === "css");
    const jsFiles = files.filter((f) => f.lang === "js");

    let html = htmlFile.content;

    // Inline CSS files referenced by link tags
    cssFiles.forEach((cf) => {
      const re = new RegExp(
        `<link[^>]*href=["']${escRegex(cf.name)}["'][^>]*>`,
        "gi",
      );
      if (re.test(html)) {
        html = html.replace(
          re,
          `<style>/* ${cf.name} */\n${cf.content}\n</style>`,
        );
      } else {
        // inject before </head>
        html = html.replace(
          "</head>",
          `<style>/* ${cf.name} */\n${cf.content}\n</style>\n</head>`,
        );
      }
    });

    // Inline JS files referenced by script src tags
    jsFiles.forEach((jf) => {
      const re = new RegExp(
        `<script[^>]*src=["']${escRegex(jf.name)}["'][^>]*><\\/script>`,
        "gi",
      );
      if (re.test(html)) {
        html = html.replace(
          re,
          `<script>/* ${jf.name} */\n${jf.content}\n<\/script>`,
        );
      } else {
        html = html.replace(
          "</body>",
          `<script>/* ${jf.name} */\n${jf.content}\n<\/script>\n</body>`,
        );
      }
    });

    // Intercept console.log inside the iframe
    const consolePatch = `<script>
(function(){
  const _log  = console.log.bind(console);
  const _warn = console.warn.bind(console);
  const _err  = console.error.bind(console);
  function post(type, args){ window.parent.postMessage({type:'console',logType:type,msg:args.map(x=>typeof x==='object'?JSON.stringify(x,null,2):String(x)).join(' ')},'*'); }
  console.log   = (...a) => { _log(...a);  post('ok',   a); };
  console.warn  = (...a) => { _warn(...a); post('warn', a); };
  console.error = (...a) => { _err(...a);  post('err',  a); };
  window.addEventListener('error', e => post('err', [e.message + ' (line ' + e.lineno + ')']));
})();
<\/script>`;

    html = html.replace("<head>", "<head>" + consolePatch);
    iframe.srcdoc = html;

    setStatus("Preview updated ✓", "ok");
  }

  // Listen for console messages from iframe
  window.addEventListener("message", (e) => {
    if (e.data && e.data.type === "console") {
      consoleWrite(e.data.msg, e.data.logType || "ok");
    }
  });

  /* ── JS: sandbox evaluation ── */
  function runJS() {
    consoleReset();
    const code = files[0].content;

    try {
      const logs = [];
      const errors = [];

      const _log = console.log.bind(console);
      const _warn = console.warn.bind(console);
      const _err = console.error.bind(console);

      console.log = (...args) => {
        _log(...args);
        logs.push({
          t: "ok",
          m: args
            .map((x) =>
              typeof x === "object" ? JSON.stringify(x, null, 2) : String(x),
            )
            .join(" "),
        });
      };
      console.warn = (...args) => {
        _warn(...args);
        logs.push({ t: "warn", m: args.map(String).join(" ") });
      };
      console.error = (...args) => {
        _err(...args);
        logs.push({ t: "err", m: args.map(String).join(" ") });
      };

      // eslint-disable-next-line no-new-func
      new Function(code)();

      console.log = _log;
      console.warn = _warn;
      console.error = _err;

      if (logs.length === 0) {
        consoleWrite("✅ No console output", "info");
      } else {
        logs.forEach((l) => consoleWrite(l.m, l.t));
      }
      setStatus("Ran successfully ✓", "ok");
    } catch (err) {
      console.log = console.log; // restore
      consoleWrite("❌ " + err.name + ": " + err.message, "err");
      setStatus("Runtime error", "err");
    }
  }

  /* ── C: Judge0 API ── */
  const JUDGE0_API = "https://judge0-ce.p.rapidapi.com";
  // Public Rapid API key - limited free tier
  // Replace RAPID_API_KEY with your own key from https://rapidapi.com/judge0-official/api/judge0-ce
  const RAPID_API_KEY = "YOUR_RAPIDAPI_KEY_HERE";

  async function runC() {
    consoleReset();
    const code = files[0].content;
    const stdin = stdinInput.value || "";

    setBadge("running", "⚙ Compiling…");
    setStatus("Sending to compiler…", "info");
    runBtn.disabled = true;

    try {
      // Submit
      const submitRes = await fetch(
        `${JUDGE0_API}/submissions?base64_encoded=false&wait=true`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": RAPID_API_KEY,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
          body: JSON.stringify({
            language_id: 50, // C (GCC 9.2.0)
            source_code: code,
            stdin: stdin,
          }),
        },
      );

      if (!submitRes.ok) {
        const errTxt = await submitRes.text();
        throw new Error("API error " + submitRes.status + ": " + errTxt);
      }

      const result = await submitRes.json();
      const status = result.status?.description || "Unknown";

      if (result.compile_output) {
        setBadge("fail", "✗ Compile error");
        consoleWrite("── Compile Error ──", "warn");
        consoleWrite(result.compile_output, "err");
        setStatus("Compile error", "err");
      } else if (result.stderr) {
        setBadge("fail", "✗ Runtime error");
        consoleWrite("── Runtime Error ──", "warn");
        consoleWrite(result.stderr, "err");
        setStatus("Runtime error", "err");
      } else if (result.stdout !== null && result.stdout !== undefined) {
        setBadge("ok", "✓ " + status);
        consoleWrite("── Output ──", "info");
        consoleWrite(result.stdout || "(no output)", "ok");
        if (result.time)
          consoleWrite(
            `── Time: ${result.time}s  Memory: ${result.memory} KB`,
            "info",
          );
        setStatus(`Done in ${result.time || "?"}s ✓`, "ok");
      } else {
        setBadge("ok", "✓ " + status);
        consoleWrite("(no output)", "info");
        setStatus(status, "ok");
      }
    } catch (err) {
      setBadge("fail", "✗ Error");
      consoleWrite("❌ " + err.message, "err");

      // Graceful fallback message if no API key set
      if (RAPID_API_KEY === "YOUR_RAPIDAPI_KEY_HERE") {
        consoleWrite("", "info");
        consoleWrite("── Setup Required ──", "warn");
        consoleWrite(
          "To run C code, add your RapidAPI key in codewithus.js.",
          "info",
        );
        consoleWrite(
          "1. Get a free key at: rapidapi.com/judge0-official/api/judge0-ce",
          "info",
        );
        consoleWrite(
          "2. Replace YOUR_RAPIDAPI_KEY_HERE in the JS file.",
          "info",
        );
      }
      setStatus("Compiler unavailable", "err");
    }

    runBtn.disabled = false;
  }

  function setBadge(type, text) {
    compileBadge.innerHTML = `<span class="compile-badge ${type}">${text}</span>`;
  }

  function setStatus(msg, type = "ok") {
    statusMsg.textContent = msg;
    statusMsg.className =
      "status-item" + (type === "err" ? " err" : type === "ok" ? " ok" : "");
    setTimeout(() => {
      if (statusMsg.textContent === msg) {
        statusMsg.textContent = "";
        statusMsg.className = "status-item";
      }
    }, 4000);
  }

  /* ================================================================
     DOWNLOAD AS ZIP (web mode)
  ================================================================ */

  async function downloadZip() {
    if (typeof JSZip === "undefined") {
      alert("JSZip not loaded. Check your internet connection.");
      return;
    }
    saveActiveFile();

    const zip = new JSZip();
    files.forEach((f) => zip.file(f.name, f.content));

    const blob = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "learnswitch-project.zip";
    a.click();
    URL.revokeObjectURL(url);
    setStatus("Downloaded ✓", "ok");
  }

  /* ================================================================
     CLEAR / RESET
  ================================================================ */

  function resetCode() {
    initMode(mode);
    iframe.srcdoc = "";
    consoleReset();
  }

  /* ================================================================
     RESIZABLE PANELS (smooth drag)
  ================================================================ */

  let isDragging = false;
  let startX = 0;
  let startEditorW = 0;

  dragBar.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    startEditorW = editorPane.getBoundingClientRect().width;
    dragBar.classList.add("dragging");
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const panelW = labPanel.getBoundingClientRect().width;
    const delta = e.clientX - startX;
    let newW = startEditorW + delta;

    // Clamp: min 25% max 75%
    newW = Math.max(panelW * 0.25, Math.min(panelW * 0.75, newW));

    editorPane.style.flex = "none";
    editorPane.style.width = newW + "px";
    outputPane.style.flex = "1";
    outputPane.style.width = "";
  });

  document.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    dragBar.classList.remove("dragging");
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  });

  /* Touch resizing (mobile) */
  let touchStartX = 0,
    touchStartW = 0;
  dragBar.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartW = editorPane.getBoundingClientRect().width;
      dragBar.classList.add("dragging");
    },
    { passive: true },
  );

  document.addEventListener(
    "touchmove",
    (e) => {
      if (!dragBar.classList.contains("dragging")) return;
      const panelW = labPanel.getBoundingClientRect().width;
      const delta = e.touches[0].clientX - touchStartX;
      let newW = touchStartW + delta;
      newW = Math.max(panelW * 0.25, Math.min(panelW * 0.75, newW));
      editorPane.style.flex = "none";
      editorPane.style.width = newW + "px";
      outputPane.style.flex = "1";
    },
    { passive: true },
  );

  document.addEventListener("touchend", () => {
    dragBar.classList.remove("dragging");
  });

  /* ================================================================
     EVENT LISTENERS
  ================================================================ */

  runBtn.addEventListener("click", runCode);

  clearBtn.addEventListener("click", resetCode);

  downloadBtn.addEventListener("click", downloadZip);

  consoleClear.addEventListener("click", consoleClear_fn);

  langSelect.addEventListener("change", () => initMode(langSelect.value));

  addTabBtn.addEventListener("click", addFile);

  // Save on every keystroke
  editor.addEventListener("input", () => {
    const f = getActiveFile();
    if (f) f.content = editor.value;
  });

  /* ================================================================
     UTILITIES
  ================================================================ */

  function escHtml(s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function escRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  /* ================================================================
     INIT
  ================================================================ */

  initMode("web");

  // Auto-run on load to show default preview
  setTimeout(() => {
    if (mode === "web") runWeb();
  }, 300);
});
