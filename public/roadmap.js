document.addEventListener("DOMContentLoaded", initRoadmap);

const RESOURCE_DB = {
  dsa: {
    beginner: {
      video: [
        { name: "Striver's A2Z DSA Course", url: "https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz", desc: "Most comprehensive free DSA playlist", tag: "⭐ Popular" },
        { name: "Abdul Bari's Algorithm Course", url: "https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O", desc: "Theory-first, university-level clarity", tag: "🧠 Theory" },
        { name: "CS Dojo – DSA for Beginners", url: "https://www.youtube.com/@CSDojo", desc: "Short, clear beginner-friendly videos", tag: "🚀 Beginner" }
      ],
      docs: [
        { name: "GeeksForGeeks – DSA Self-Paced", url: "https://www.geeksforgeeks.org/data-structures/", desc: "Most complete DSA reference — free", tag: "⭐ Popular" },
        { name: "CP-Algorithms.com", url: "https://cp-algorithms.com/", desc: "Rigorous explanations with proofs", tag: "📘 Theory" },
        { name: "The Algorithms – GitHub", url: "https://github.com/TheAlgorithms/Python", desc: "Every algorithm implemented in code", tag: "💻 Code" }
      ],
      ai: [
        { name: "ChatGPT (GPT-4o)", url: "https://chat.openai.com", desc: "Explain concepts, generate examples, debug", tag: "🤖 All-rounder" },
        { name: "Claude by Anthropic", url: "https://claude.ai", desc: "Deep explanations, long context — great for theory", tag: "📖 Theory" },
        { name: "Phind", url: "https://www.phind.com", desc: "Code-focused AI for algorithm walkthroughs", tag: "🔍 Code" }
      ]
    },
    intermediate: {
      video: [
        { name: "Neetcode.io – Full DSA Course", url: "https://neetcode.io/courses", desc: "Animated + code walkthrough for every pattern", tag: "💼 Interview" },
        { name: "Aditya Verma – DP Playlist", url: "https://www.youtube.com/playlist?list=PL_z_8CaSLPWekqhdCPmFohncHwz8TY2Go", desc: "The definitive DP learning playlist", tag: "🔥 Popular" },
        { name: "Striver's Graph Series", url: "https://www.youtube.com/playlist?list=PLgUwDviBIf0oF6QL8m22w1hIDC1vJ_BHz", desc: "Best graph DSA playlist available", tag: "⭐ Graphs" }
      ],
      docs: [
        { name: "CP-Algorithms – Advanced", url: "https://cp-algorithms.com/", desc: "University-grade algorithm documentation", tag: "📘 Theory" },
        { name: "Codeforces EDU Section", url: "https://codeforces.com/edu/courses", desc: "Interactive theory + practice problems", tag: "💻 Practice" },
        { name: "CLRS Algorithm Notes (GitHub)", url: "https://github.com/gzc/CLRS", desc: "Notes from the classic textbook", tag: "📚 Deep" }
      ],
      ai: [
        { name: "ChatGPT GPT-4o", url: "https://chat.openai.com", desc: "Primary tutor — explain, quiz, challenge", tag: "🤖 Tutor" },
        { name: "Claude", url: "https://claude.ai", desc: "Complex problem breakdowns & code review", tag: "📖 Review" },
        { name: "GitHub Copilot", url: "https://github.com/features/copilot", desc: "Smart autocomplete while implementing", tag: "💡 Coding" }
      ]
    },
    advanced: {
      video: [
        { name: "Errichto – Competitive Programming", url: "https://www.youtube.com/@Errichto", desc: "Top-rated CP YouTube channel", tag: "⚡ Elite" },
        { name: "Colin Galen – Advanced Topics", url: "https://www.youtube.com/@ColinGalen", desc: "Hard DP, segtrees, editorial walkthroughs", tag: "🔥 Elite" },
        { name: "Algorithms Live!", url: "https://www.youtube.com/@AlgorithmsLive", desc: "Deep-dive into Codeforces problems", tag: "⚡ Advanced" }
      ],
      docs: [
        { name: "CP Handbook (Free PDF)", url: "https://cses.fi/book/book.pdf", desc: "Comprehensive CP reference — Laaksonen", tag: "📘 Must Read" },
        { name: "CSES Problem Set", url: "https://cses.fi/problemset/", desc: "Gold standard problem collection", tag: "🏆 Practice" },
        { name: "AtCoder", url: "https://atcoder.jp/", desc: "Best platform for clean, mathematical CP", tag: "🎯 Competition" }
      ],
      ai: [
        { name: "Claude (Opus)", url: "https://claude.ai", desc: "Best for long technical discussions & proofs", tag: "✦ Deep" },
        { name: "Perplexity AI", url: "https://www.perplexity.ai", desc: "Research-mode: finds papers and sources", tag: "🔬 Research" },
        { name: "Phind", url: "https://www.phind.com", desc: "Deep code-level explanations", tag: "🔍 Code" }
      ]
    }
  },
  web: {
    beginner: {
      video: [
        { name: "Traversy Media – HTML/CSS Crash Course", url: "https://www.youtube.com/@TraversyMedia", desc: "Clear, fast-paced practical tutorials", tag: "⭐ Popular" },
        { name: "Kevin Powell – CSS Mastery", url: "https://www.youtube.com/@KevinPowell", desc: "The best CSS YouTube channel", tag: "🎨 CSS" },
        { name: "Fireship – JavaScript in 100s", url: "https://www.youtube.com/@Fireship", desc: "Quick, dense concept explainers", tag: "⚡ Fast" }
      ],
      docs: [
        { name: "MDN Web Docs (Mozilla)", url: "https://developer.mozilla.org/en-US/", desc: "The definitive web development reference", tag: "📘 Official" },
        { name: "JavaScript.info", url: "https://javascript.info/", desc: "Best structured JS learning text — free", tag: "⭐ Must Read" },
        { name: "web.dev by Google", url: "https://web.dev/learn/", desc: "Google's structured web fundamentals course", tag: "🏗️ Google" }
      ],
      ai: [
        { name: "ChatGPT GPT-4o", url: "https://chat.openai.com", desc: "Explain concepts, debug code, generate examples", tag: "🤖 All-rounder" },
        { name: "Claude", url: "https://claude.ai", desc: "Long code reviews and explanations", tag: "📖 Review" },
        { name: "v0.dev by Vercel", url: "https://v0.dev", desc: "Generate UI components with AI", tag: "🎨 UI" }
      ]
    },
    intermediate: {
      video: [
        { name: "Traversy Media – React Crash Course", url: "https://www.youtube.com/watch?v=w7ejDZ8SWv8", desc: "Best React intro, 90 min", tag: "⭐ React" },
        { name: "The Net Ninja – MERN Stack", url: "https://www.youtube.com/@NetNinja", desc: "Full MERN stack playlist series", tag: "🔥 Full Stack" },
        { name: "Academind – Node + Express", url: "https://www.youtube.com/@Academind", desc: "Deep backend tutorials", tag: "🖥️ Backend" }
      ],
      docs: [
        { name: "React Official Docs", url: "https://react.dev/", desc: "The new React docs — interactive examples", tag: "📘 Official" },
        { name: "Node.js Documentation", url: "https://nodejs.org/en/docs/", desc: "Official Node.js API reference", tag: "📘 Official" },
        { name: "roadmap.sh – Full Stack", url: "https://roadmap.sh/full-stack", desc: "Visual roadmap for full-stack path", tag: "🗺️ Roadmap" }
      ],
      ai: [
        { name: "GitHub Copilot", url: "https://github.com/features/copilot", desc: "In-editor code completion & explanation", tag: "💡 Editor" },
        { name: "v0.dev by Vercel", url: "https://v0.dev", desc: "Generate React/Tailwind components instantly", tag: "🎨 UI Gen" },
        { name: "ChatGPT GPT-4o", url: "https://chat.openai.com", desc: "Architecture advice, code review, debugging", tag: "🤖 Mentor" }
      ]
    },
    advanced: {
      video: [
        { name: "Jack Herrington – Advanced React", url: "https://www.youtube.com/@jherr", desc: "Most technically deep React YouTube channel", tag: "⚡ Expert" },
        { name: "Theo (t3.gg) – Modern Web Stack", url: "https://www.youtube.com/@t3dotgg", desc: "Real opinions on advanced web tech choices", tag: "🔥 Industry" },
        { name: "Matt Pocock – TypeScript Tips", url: "https://www.youtube.com/@mattpocockuk", desc: "Advanced TypeScript mastery", tag: "🎯 TypeScript" }
      ],
      docs: [
        { name: "web.dev – Performance", url: "https://web.dev/performance/", desc: "Google's definitive performance guide", tag: "📘 Performance" },
        { name: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/", desc: "Official advanced TypeScript docs", tag: "📘 Official" },
        { name: "Next.js Docs – Advanced", url: "https://nextjs.org/docs", desc: "Deep Next.js patterns & architecture", tag: "🏗️ Next.js" }
      ],
      ai: [
        { name: "Cursor Editor", url: "https://cursor.sh", desc: "AI-first editor for production codebases", tag: "⌨️ Editor" },
        { name: "Claude (Opus)", url: "https://claude.ai", desc: "Best for complex architecture discussions", tag: "✦ Deep" },
        { name: "Perplexity AI", url: "https://www.perplexity.ai", desc: "Research new web specs and technologies", tag: "🔬 Research" }
      ]
    }
  }
};

const QUIZ_TOPICS = {
  dsa_beginner: [
    { slug:"arrays",        label:"Arrays & Strings",    icon:"fa-table-cells",         color:"#5390d9" },
    { slug:"sorting",       label:"Sorting & Searching", icon:"fa-arrow-up-wide-short",  color:"#6930c3" },
    { slug:"linked_lists",  label:"Linked Lists",        icon:"fa-link",                color:"#56cfe1" },
    { slug:"stacks_queues", label:"Stacks & Queues",     icon:"fa-layer-group",         color:"#38c172" },
    { slug:"recursion",     label:"Recursion Basics",    icon:"fa-rotate-right",        color:"#f6993f" },
  ],
  dsa_intermediate: [
    { slug:"arrays_hash",   label:"Arrays & Hashing",   icon:"fa-table-cells",         color:"#5390d9" },
    { slug:"trees",         label:"Trees & BST",         icon:"fa-sitemap",             color:"#6930c3" },
    { slug:"graphs",        label:"Graph Algorithms",    icon:"fa-diagram-project",     color:"#56cfe1" },
    { slug:"dp",            label:"Dynamic Programming", icon:"fa-chess",               color:"#38c172" },
    { slug:"binary_search", label:"Binary Search & Bits",icon:"fa-magnifying-glass",    color:"#f6993f" },
  ],
  dsa_advanced: [
    { slug:"algo_analysis", label:"Algorithm Analysis",  icon:"fa-brain",               color:"#7400b8" },
    { slug:"graphs_adv",    label:"Advanced Graphs",     icon:"fa-diagram-project",     color:"#5390d9" },
    { slug:"dp_advanced",   label:"Advanced DP",         icon:"fa-chess",               color:"#f6993f" },
  ],
  web_beginner: [
    { slug:"html_css",      label:"HTML & CSS",          icon:"fa-code",                color:"#5390d9" },
    { slug:"javascript",    label:"JavaScript Basics",   icon:"fa-square-js",           color:"#f6993f" },
    { slug:"dom",           label:"DOM & Browser",       icon:"fa-window-maximize",     color:"#56cfe1" },
  ],
  web_intermediate: [
    { slug:"react",         label:"React & Components",  icon:"fa-atom",                color:"#5390d9" },
    { slug:"backend",       label:"Node.js & REST APIs", icon:"fa-server",              color:"#6930c3" },
    { slug:"performance",   label:"Performance & Security",icon:"fa-shield-halved",     color:"#38c172" },
  ],
  web_advanced: [
    { slug:"architecture",  label:"Frontend Architecture",icon:"fa-building",           color:"#7400b8" },
    { slug:"typescript",    label:"TypeScript & Types",  icon:"fa-file-code",           color:"#5390d9" },
  ],
};

function initRoadmap() {
  let prefs = JSON.parse(localStorage.getItem("ls_roadmapPrefs")) || { subject:"dsa", level:"beginner", style:"video" };
  localStorage.setItem("ls_roadmapPrefs", JSON.stringify(prefs));

  const progressKey = `progress_${prefs.subject}_${prefs.level}_${prefs.style}`;
  const subjectLabels = { web:"Web Development", dsa:"DSA" };
  const levelLabels   = { beginner:"Beginner", intermediate:"Intermediate", advanced:"Advanced" };
  const styleLabels   = { video:"Video Tutorials", docs:"Documentation", ai:"AI Assisted" };

  document.getElementById("prefDisplay").innerHTML = `
    <span class="pref-tag pref-subject"><i class="fa-solid fa-code"></i> ${subjectLabels[prefs.subject]||prefs.subject}</span>
    <span class="pref-tag pref-level"><i class="fa-solid fa-signal"></i> ${levelLabels[prefs.level]||prefs.level}</span>
    <span class="pref-tag pref-style"><i class="fa-solid fa-graduation-cap"></i> ${styleLabels[prefs.style]||prefs.style}</span>`;

  const stepLabels = {
    web:{ 1:{title:"Foundation Setup",icon:"fa-house",color:"blue"}, 2:{title:"Core Concepts",icon:"fa-lightbulb",color:"orange"}, 3:{title:"Build Projects",icon:"fa-hammer",color:"green"}, 4:{title:"Interview Prep",icon:"fa-briefcase",color:"yellow"}, 5:{title:"Skill Quizzes",icon:"fa-circle-question",color:"teal"}, 6:{title:"Next Level",icon:"fa-crown",color:"teal"} },
    dsa:{ 1:{title:"Core Concepts",icon:"fa-book",color:"blue"}, 2:{title:"Learn & Practice",icon:"fa-lightbulb",color:"orange"}, 3:{title:"Easy Problems",icon:"fa-dumbbell",color:"green"}, 4:{title:"Interview Prep",icon:"fa-code",color:"yellow"}, 5:{title:"Skill Quizzes",icon:"fa-circle-question",color:"teal"}, 6:{title:"Next Level",icon:"fa-crown",color:"teal"} },
  };
  const labels = stepLabels[prefs.subject]||stepLabels["dsa"];
  document.querySelectorAll(".roadmap-item").forEach(item=>{
    const n=Number(item.dataset.step); if(!labels[n])return;
    const h4=item.querySelector("h4"); if(h4)h4.textContent=labels[n].title;
    const dot=item.querySelector(".roadmap-dot"); if(dot){dot.className=`roadmap-dot ${labels[n].color}`;dot.innerHTML=`<i class="fa-solid ${labels[n].icon}"></i>`;}
  });

  const trackerSteps=document.querySelectorAll(".progress-step");
  const roadmapItems=document.querySelectorAll(".roadmap-item");
  const completeBtns=document.querySelectorAll(".complete-step-btn");
  const progressFill=document.getElementById("progressFill");
  const progressText=document.getElementById("progressText");
  const contentWrap =document.getElementById("stepContent");
  const contentInner=document.getElementById("stepContentInner");

  let progress=JSON.parse(localStorage.getItem(progressKey))||{completedSteps:[],quizPassed:false,quizScore:null};
  let activeStep=null;

  function isUnlocked(n){
    if(n===1)return true;
    if(n===6)return[1,2,3,4,5].every(s=>progress.completedSteps.includes(s));
    return progress.completedSteps.includes(1);
  }

  function loadProgress(){
    roadmapItems.forEach(item=>{
      const n=Number(item.dataset.step); item.classList.remove("locked","done","selected");
      if(!isUnlocked(n))item.classList.add("locked");
      else if(progress.completedSteps.includes(n))item.classList.add("done");
      if(String(n)===activeStep)item.classList.add("selected");
    });
    trackerSteps.forEach(step=>{
      const n=Number(step.dataset.step); step.classList.remove("active","completed","locked");
      if(!isUnlocked(n))step.classList.add("locked");
      else if(progress.completedSteps.includes(n)){step.classList.add("completed");if(String(n)===activeStep)step.classList.add("active");}
      else{if(String(n)===activeStep)step.classList.add("active");}
    });
    completeBtns.forEach(btn=>{
      const n=Number(btn.dataset.step);
      if(progress.completedSteps.includes(n)){btn.textContent="Completed ✓";btn.classList.add("done-btn");btn.disabled=true;}
      else{btn.textContent="Mark Completed";btn.classList.remove("done-btn");btn.disabled=false;}
    });
    updateProgressBar(); checkQuizReturn(); checkLevelUnlock();
  }

  function updateProgressBar(){
    const done=progress.completedSteps.filter(s=>s<=5).length;
    const pct=Math.round((done/5)*100);
    progressFill.style.width=pct+"%"; progressText.textContent=pct+"% Completed";
  }

  completeBtns.forEach(btn=>{
    btn.addEventListener("click",e=>{
      e.stopPropagation(); const n=Number(btn.dataset.step);
      if(progress.completedSteps.includes(n))return;
      progress.completedSteps.push(n); progress.completedSteps.sort((a,b)=>a-b);
      saveProgress(); loadProgress(); if(n===5&&isUnlocked(6))openPanel("6");
    });
  });

  function saveProgress(){localStorage.setItem(progressKey,JSON.stringify(progress));}

  roadmapItems.forEach(item=>{
    item.addEventListener("click",()=>{
      const step=item.dataset.step; if(item.classList.contains("locked"))return;
      if(activeStep===step){closePanel();return;} openPanel(step);
    });
  });

  function openPanel(step){
    activeStep=step; contentWrap.classList.add("active"); renderContent(step); loadProgress();
    setTimeout(()=>contentWrap.scrollIntoView({behavior:"smooth",block:"start"}),100);
  }
  function closePanel(){activeStep=null;contentWrap.classList.remove("active");loadProgress();}

  function renderContent(step){
    const key=`${prefs.subject}_${prefs.level}_${prefs.style}`;
    const map=getContentMap();
    const selected=map[key]||generateFallbackContent(key);
    contentInner.innerHTML=selected[step]||"<p>Content coming soon.</p>";
    attachDynamicHandlers(step);
  }

  // ── Helper UI components ──
  function getRes(){return RESOURCE_DB?.[prefs.subject]?.[prefs.level]?.[prefs.style]||[];}

  function resBlock(){
    const data=getRes(); if(!data.length)return"";
    const icons=["🎯","⚡","🔥"];
    return data.map((r,i)=>`
      <a class="ai-tool-card" href="${r.url}" target="_blank" rel="noopener">
        <span class="ai-tool-icon">${icons[i]||"⭐"}</span>
        <span class="ai-tool-txt"><strong>${r.name}</strong><small>${r.desc} · ${r.tag}</small></span>
        <i class="fa-solid fa-arrow-up-right-from-square res-arrow"></i>
      </a>`).join("");
  }

  function sectionWrap(title,icon,content){
    return`<div class="rm-section"><h4><i class="fa-solid ${icon}"></i> ${title}</h4>${content}</div>`;
  }
  function topicList(items){
    return`<ul class="rm-topics">${items.map(i=>`<li><i class="fa-solid fa-check-circle"></i>${i}</li>`).join("")}</ul>`;
  }
  function promptBox(text){return`<div class="prompt-box">${text}</div>`;}

  function stepCard(title,icon,accentClass,desc,sections,showDownload){
    const sectHtml=sections.map(([t,i,c])=>sectionWrap(t,i,c)).join("");
    return`
      <div class="sc-header sc-accent-${accentClass}">
        <div class="sc-icon"><i class="fa-solid ${icon}"></i></div>
        <div><h3>${title}</h3><p class="rm-desc">${desc}</p></div>
      </div>
      ${sectHtml}
      ${showDownload?`<button class="step-btn" id="downloadRoadmapBtn" style="margin-top:20px;"><i class="fa-solid fa-download"></i> Download Roadmap Plan</button>`:""}
      ${prefs.style==="ai"?`<button class="step-btn" id="aiPromptBtn" style="margin-top:10px;"><i class="fa-solid fa-wand-magic-sparkles"></i> Generate AI Prompt</button><div id="aiPromptOutput"></div>`:""}`;
  }

  // ── QUIZ BLOCK ──
  function quizBlock(){
    const key=`${prefs.subject}_${prefs.level}`;
    const topics=QUIZ_TOPICS[key]||[];
    const topicKey=`topicResults_${progressKey}`;
    const tr=JSON.parse(localStorage.getItem(topicKey))||{};
    const total=topics.length;
    const passed=topics.filter(t=>tr[t.slug]?.passed).length;
    const allPassed=total>0&&passed===total;
    const scores=topics.map(t=>tr[t.slug]?.score??null).filter(s=>s!==null);
    const agg=scores.length>0?Math.round(scores.reduce((a,b)=>a+b,0)/scores.length):null;

    if(allPassed&&!progress.quizPassed){
      progress.quizPassed=true;
      if(!progress.completedSteps.includes(5))progress.completedSteps.push(5);
      saveProgress();
      setTimeout(()=>{loadProgress();if(isUnlocked(6))openPanel("6");},400);
    }

    const aggRing=agg!==null?`
      <div class="quiz-agg-ring">
        <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
          <circle class="qar-bg" cx="30" cy="30" r="24"/>
          <circle class="qar-fill ${agg>=80?"qar-pass":"qar-fail"}" cx="30" cy="30" r="24"
            stroke-dasharray="${2*Math.PI*24}" stroke-dashoffset="${2*Math.PI*24*(1-agg/100)}"/>
        </svg>
        <div class="qar-label"><span class="qar-num">${agg}%</span><span class="qar-sub">avg</span></div>
      </div>`:`
      <div class="quiz-agg-ring quiz-agg-empty">
        <svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><circle class="qar-bg" cx="30" cy="30" r="24"/></svg>
        <div class="qar-label"><span class="qar-num">—</span><span class="qar-sub">avg</span></div>
      </div>`;

    const cards=topics.map(t=>{
      const res=tr[t.slug]; const isDone=res?.passed===true; const score=res?.score??null; const attempts=res?.attempts||0;
      const qUrl=`quiz.html?subject=${prefs.subject}&level=${prefs.level}&topic=${t.slug}&progressKey=${encodeURIComponent(progressKey)}`;
      const pct=score??0;
      return`
        <a class="qtc ${isDone?"qtc-pass":score!==null?"qtc-retry":"qtc-new"}" href="${qUrl}">
          <div class="qtc-left">
            <div class="qtc-ic" style="--qc:${t.color}"><i class="fa-solid ${t.icon}"></i></div>
            <div class="qtc-info">
              <span class="qtc-name">${t.label}</span>
              <span class="qtc-status ${isDone?"qs-pass":score!==null?"qs-retry":"qs-new"}">
                ${isDone?"<i class='fa-solid fa-circle-check'></i> Passed":score!==null?`<i class='fa-solid fa-rotate-right'></i> ${attempts} attempt${attempts!==1?"s":""} — retry`:"<i class='fa-solid fa-play-circle'></i> Not started"}
              </span>
            </div>
          </div>
          <div class="qtc-right">
            ${score!==null?`
              <div class="qtc-score-col">
                <span class="qtc-pct ${isDone?"qp-pass":"qp-fail"}">${score}%</span>
                <div class="qtc-track"><div class="qtc-fill ${isDone?"qf-pass":"qf-fail"}" style="width:${pct}%"></div></div>
              </div>`:`<span class="qtc-cta">Start <i class="fa-solid fa-arrow-right"></i></span>`}
          </div>
        </a>`;
    }).join("");

    return`
      <div class="quiz-block-header">
        <div class="qbh-text">
          <h3><i class="fa-solid fa-circle-question"></i> Skill Verification Quizzes</h3>
          <p class="rm-desc">Pass <strong>every topic quiz with 80%+</strong> to unlock the Next Level. ${total} quizzes — take them in any order.</p>
        </div>
        ${aggRing}
      </div>
      <div class="qob">
        <div class="qob-labels">
          <span>${passed} of ${total} topics passed</span>
          <span class="qob-pct">${total>0?Math.round(passed/total*100):0}%</span>
        </div>
        <div class="qob-track"><div class="qob-fill" style="width:${total>0?Math.round(passed/total*100):0}%"></div></div>
      </div>
      <div class="quiz-topics-grid">${cards||"<p class='rm-desc'>No quizzes for this combination yet.</p>"}</div>
      ${allPassed?`<div class="quiz-all-done"><i class="fa-solid fa-trophy"></i> All quizzes passed! <strong>Step 6</strong> is now unlocked — advance to the next level.</div>`:""}`;
  }

  // ── NEXT LEVEL BLOCK ──
  function nextLevelBlock(){
    const allDone=[1,2,3,4,5].every(s=>progress.completedSteps.includes(s));
    if(!allDone)return`<div class="nll"><div class="nll-icon"><i class="fa-solid fa-lock"></i></div><h3>Next Level Locked</h3><p class="rm-desc">Complete all 5 steps including all topic quizzes to unlock this milestone.</p></div>`;
    if(!progress.quizPassed)return`<div class="nll"><div class="nll-icon"><i class="fa-solid fa-lock"></i></div><h3>Quiz Not Passed Yet</h3><p class="rm-desc">Pass all topic quizzes in Step 5 (each ≥ 80%) to continue to the next level.</p></div>`;
    const nextLevel=prefs.level==="beginner"?"intermediate":prefs.level==="intermediate"?"advanced":null;
    return`
      <div class="nlu">
        <div class="nlu-crown"><i class="fa-solid fa-crown"></i></div>
        <h3>Level Complete! 🎉</h3>
        <p class="rm-desc">You've mastered <strong>${levelLabels[prefs.level]}</strong> ${subjectLabels[prefs.subject]}. All steps done, all quizzes passed.</p>
        ${nextLevel?`<button class="btn-next-level" id="levelGoBtn"><i class="fa-solid fa-arrow-right"></i> Continue to ${levelLabels[nextLevel]} Level</button>`:`<div class="master-crown"><i class="fa-solid fa-star"></i><strong>You've reached Master Level — the highest tier! 🏆</strong></div>`}
      </div>`;
  }

  // ── CONTENT MAP ──
  function getContentMap(){
    const r=resBlock();
    function M(t,ic,ac,d,ss,dl){return stepCard(t,ic,ac,d,ss,dl);}
    function TL(a){return topicList(a);}
    function SW(t,i,c){return sectionWrap(t,i,c);}
    function PB(t){return promptBox(t);}

    return {
      dsa_beginner_video:{
        1:M("DSA Foundations — Video Path","fa-book","blue","Start your DSA journey with visual, structured video content. No prior CS knowledge needed.",
          [["What You'll Cover","fa-list-check",TL(["Big O Notation & Time Complexity","Arrays, Strings & Two Pointers","Recursion & Call Stack","Hashing & HashMaps","Sliding Window Basics"])],
           ["Recommended Playlists","fa-play-circle",r]],true),
        2:M("Core Data Structures — Video Learning","fa-lightbulb","orange","Dive into the most-asked data structures. Watch, pause, code along — repetition is key.",
          [["Topics This Phase","fa-layer-group",TL(["Linked Lists (Singly & Doubly)","Stacks & Queues","Binary Trees & BST","Graphs — BFS & DFS Intro","Heaps & Priority Queues"])],
           ["Best Videos for Each Topic","fa-play",r]]),
        3:M("Easy Practice — Warm Up","fa-dumbbell","green","Solve 20–30 easy problems. Focus on understanding patterns, not just getting the answer.",
          [["Must-Solve Easy Problems","fa-code",TL(["Two Sum","Valid Parentheses","Reverse Linked List","Maximum Subarray (Kadane's)","Binary Search","Climb Stairs (DP Intro)","Contains Duplicate","Merge Two Sorted Lists"])],
           ["Practice Platforms","fa-laptop-code",r]]),
        4:M("Interview Prep — DSA Edition","fa-briefcase","yellow","Companies test the same patterns. Master these and crack most coding rounds.",
          [["Top Interview Patterns","fa-diagram-project",TL(["Sliding Window","Two Pointers","Fast & Slow Pointers","Tree BFS/DFS","Binary Search Variants","Dynamic Programming (1D)","Backtracking Basics"])],
           ["Interview Resources","fa-briefcase",r]]),
        5:quizBlock(),6:nextLevelBlock()
      },
      dsa_beginner_docs:{
        1:M("DSA Foundations — Documentation Path","fa-file-lines","blue","A reading-first approach. Study theory, annotate, then code. Best for deep conceptual understanding.",
          [["Reading Order","fa-list-ol",TL(["Complexity Analysis (Big O, Omega, Theta)","Array & String operations","Recursion — base cases & call stacks","Sorting Algorithms (Bubble → Merge → Quick)","Searching Algorithms"])],
           ["Top Documentation & Articles","fa-file-lines",r]],true),
        2:M("Core Data Structures — Deep Reading","fa-book-open","orange","Study each structure: definition → operations → complexity → implementation.",
          [["Structure Study Order","fa-layer-group",TL(["Arrays & Dynamic Arrays","Linked Lists — all variants","Stacks, Queues & Deques","Trees — Binary, BST, AVL","Hash Tables & Collision Handling"])],
           ["Reading Resources","fa-file-lines",r]]),
        3:M("Dry Run Practice — Paper First","fa-pencil","green","Before coding, trace through problems on paper. Understand the flow, then implement.",
          [["Problems to Dry Run First","fa-pencil",TL(["Manual trace of Merge Sort","BST insert/delete walkthrough","BFS on a small graph","DP table fill for Fibonacci","Linked list reversal step-by-step"])],
           ["Practice Platforms","fa-laptop-code",r]]),
        4:M("Interview Prep — Study Notes Style","fa-sticky-note","yellow","Create your own cheat sheets for each pattern. Reading back your own notes is a superpower.",
          [["Cheat Sheet Topics to Build","fa-sticky-note",TL(["Time & Space Complexity Table","Sorting Algorithms Summary","Tree Traversal Patterns","Graph BFS vs DFS Decision","DP Recurrence Templates"])],
           ["Reference Materials","fa-file-lines",r]]),
        5:quizBlock(),6:nextLevelBlock()
      },
      dsa_beginner_ai:{
        1:M("DSA Foundations — AI-Assisted","fa-robot","blue","Use AI to explain every concept on demand. Ask it to simplify, re-explain, give analogies, or quiz you instantly.",
          [["How to Use AI for DSA","fa-wand-magic-sparkles",TL(["Ask for plain-English explanations","Request step-by-step walkthroughs","Ask it to quiz you after each topic","Tell it your confusion — it'll re-explain","Ask for visual analogies"])],
           ["Best AI Tools","fa-robot",r],
           ["Starter Prompts (copy to AI)","fa-comment-dots",PB('"I\'m a complete beginner at DSA. Teach me Big O notation with 3 real examples, then give me 5 beginner exercises."')+PB('"Explain linked lists to me like I\'m 16. Give me 3 real-world analogies."')+PB('"Quiz me on stacks and queues — 5 questions, then tell me the answers."')]],true),
        2:M("Core Structures — Learn with AI","fa-lightbulb","orange","For each data structure, have a full conversation with AI. Interact, question, challenge.",
          [["Prompt Templates to Use","fa-comment-dots",PB('"I understand arrays. How is a hash map different? When would I choose each?"')+PB('"Walk me through inserting a node into a BST step by step."')+PB('"Generate 5 beginner problems on recursion. Give me only the questions."')],
           ["AI Tools","fa-robot",r]]),
        3:M("Practice with AI Help","fa-dumbbell","green","Try problems yourself first. If stuck after 20 min, ask AI for a hint — not the answer.",
          [["AI-Assisted Workflow","fa-rotate",TL(["Attempt problem solo for 20 min","If stuck: ask AI for a small hint only","Once solved: ask AI to review your code","Ask AI for an optimized version","Ask AI to generate 2 similar problems"])],
           ["Coding AI Tools","fa-code",r]]),
        4:M("Mock Interview with AI","fa-briefcase","yellow","AI can simulate an interviewer. Practice explaining your thought process.",
          [["Interview Simulation Prompts","fa-comment",PB('"Act as a Google interviewer. Give me a beginner DSA problem and ask follow-up questions."')+PB('"I solved Two Sum using a hashmap. Ask me 3 follow-up questions."')+PB('"What are the 10 most common DSA interview questions for beginners? Quiz me one by one."')],
           ["Tools","fa-robot",r]]),
        5:quizBlock(),6:nextLevelBlock()
      },
      dsa_intermediate_video:{
        1:M("Intermediate DSA — Video Track","fa-rocket","blue","You know the basics. Now master the patterns that appear in FAANG interviews repeatedly.",
          [["Phase Focus","fa-list-check",TL(["Advanced Recursion & Backtracking","Dynamic Programming (Memoization → Tabulation)","Graph Algorithms (Dijkstra, Bellman-Ford)","Advanced Trees (Segment Tree, Tries)","Bit Manipulation"])],
           ["Video Resources","fa-play-circle",r]],true),
        2:M("Pattern Mastery — Video Deep Dives","fa-lightbulb","orange","Study each pattern in isolation, then solve 5+ problems per pattern before moving on.",
          [["Critical Patterns","fa-layer-group",TL(["Monotonic Stack","Union-Find (Disjoint Set)","Topological Sort","Interval Merging","Matrix DP (LCS, Edit Distance)"])],
           ["Pattern Resources","fa-play",r]]),
        3:M("Medium Problems — Systematic Practice","fa-dumbbell","green","Solve 50+ medium problems. Time yourself — 25–35 min per problem is target range.",
          [["Target Problem Sets","fa-code",TL(["LeetCode Blind 75 (Medium)","Neetcode 150 Medium subset","Codeforces Div 2 A & B","Striver's SDE Sheet — Part 2","Company-specific: Amazon/Google tag"])],
           ["Practice Platforms","fa-laptop-code",r]]),
        4:M("FAANG-Style Interview Prep","fa-briefcase","yellow","Simulate real interview conditions. 45-min time boxes, explain out loud.",
          [["Simulation Plan","fa-stopwatch",TL(["Pick 1 unseen medium problem daily","Set 45-min timer, no hints","Write brute force → optimize","Analyze time & space complexity","Review editorial if stuck"])],
           ["Resources","fa-briefcase",r]]),
        5:quizBlock(),6:nextLevelBlock()
      },
      dsa_intermediate_docs:{
        1:M("Intermediate DSA — Documentation Track","fa-book","blue","Go deep into algorithm theory. Understand proofs, edge cases, and complexity derivations.",
          [["Study Topics","fa-list-check",TL(["Graph Theory (formal definitions)","DP state design methodology","Amortized analysis (Union-Find)","Trie construction & applications","Segment Trees with lazy propagation"])],
           ["Documentation Resources","fa-file-lines",r]],true),
        2:M("Deep Theory Study","fa-graduation-cap","orange","For each algorithm, read the full derivation, edge cases, and complexity proof.",
          [["Study These In Depth","fa-layer-group",TL(["Dijkstra's — proof of correctness","Knapsack DP — all variants","KMP / Z-function for strings","Bridges & Articulation Points","Floyd-Warshall & Johnson's"])],
           ["Resources","fa-file-lines",r]]),
        3:M("Implementation Practice","fa-pencil","green","Read the algorithm, close the tab, implement from memory.",
          [["Implement From Scratch","fa-code",TL(["Dijkstra's with priority queue","Segment Tree (point update, range query)","Trie insert, search, delete","LRU Cache","Union-Find with path compression"])],
           ["Platforms","fa-laptop-code",r]]),
        4:M("Company-Specific Prep","fa-building","yellow","Research which algorithms each company tests most.",
          [["Company DSA Focus Areas","fa-building",TL(["Amazon — Trees, DP, Arrays","Google — Graphs, String, Hard DP","Microsoft — Trees, Linked Lists","Flipkart — Greedy, Math","Startups — Arrays, Basic DP, OOP"])],
           ["Resources","fa-file-lines",r]]),
        5:quizBlock(),6:nextLevelBlock()
      },
      dsa_intermediate_ai:{
        1:M("Intermediate DSA — AI-Accelerated","fa-robot","blue","Use AI as your personal tutor, study partner, and code reviewer — all at once.",
          [["AI Learning Strategy","fa-wand-magic-sparkles",TL(["Use AI to explain WHY algorithms work","Ask for counter-intuitive edge cases","Have AI generate test cases for your code","Ask AI to poke holes in your logic","Use AI to compare 2 approaches side by side"])],
           ["AI Tools Stack","fa-robot",r]],true),
        2:M("Pattern Learning with AI","fa-lightbulb","orange","Use AI to master each pattern deeply — analogies, edge cases, and variations.",
          [["Power Prompts","fa-comment-dots",PB('"Explain the Monotonic Stack pattern. Give me 3 problems that use it, ranked easy to hard."')+PB('"Explain 2D DP using LCS step by step."')+PB('"Generate 5 medium-level problems on Topological Sort. Don\'t give solutions yet."')],
           ["AI Tools","fa-robot",r]]),
        3:M("AI-Assisted Medium Practice","fa-dumbbell","green","Try for 30 min. Use AI as a rubber duck — explain your approach, let it guide you.",
          [["Workflow","fa-rotate",TL(["Attempt problem solo (30 min)","Explain your approach to AI, ask if it's correct","If wrong, ask for 1 hint (not solution)","After AC: ask AI for cleaner/faster version","Ask: 'What pattern is this? Where else is it used?'"])],
           ["Practice + AI Combo","fa-robot",r]]),
        4:M("AI Mock Interviews","fa-briefcase","yellow","Simulate full FAANG interviews with AI. Practice explaining, not just coding.",
          [["Interview Simulation Prompts","fa-comment",PB('"Act as a senior Google engineer interviewing me. Give me one medium graph problem and evaluate my explanation."')+PB('"Here\'s my solution to LeetCode 200: [paste code]. Rate it and ask 3 follow-up questions."')+PB('"What are the 5 most common DP problems in Amazon interviews? Walk me through each."')],
           ["Tools","fa-robot",r]]),
        5:quizBlock(),6:nextLevelBlock()
      },
      dsa_advanced_video:{
        1:M("Advanced DSA — Video Mastery","fa-crown","blue","Elite-level competitive programming and FAANG hard problem territory.",
          [["Advanced Topics","fa-list-check",TL(["Heavy-Light Decomposition","Persistent Data Structures","Advanced DP (Convex Hull Trick, D&C DP)","Network Flow (Max-Flow, Min-Cut)","Suffix Arrays & Automata"])],
           ["Video Resources","fa-play-circle",r]],true),
        2:M("Competitive Programming Deep Dives","fa-lightbulb","orange","Read editorial-style content. Understand the mathematical intuition behind each technique.",
          [["Priority Study Areas","fa-layer-group",TL(["Segment Tree with Lazy Propagation","Sparse Table & RMQ","Combinatorics & Number Theory","Game Theory (Sprague-Grundy)","String Matching (Aho-Corasick, SA)"])],
           ["Resources","fa-play",r]]),
        3:M("Hard Problem Grinding","fa-dumbbell","green","Only hard problems. No solutions for 2 hours minimum.",
          [["Target Platforms & Goals","fa-code",TL(["Codeforces: reach Div 1 / Rating 1800+","LeetCode: solve 50+ hard problems","CSES Problem Set — Full completion","AtCoder ABC/ARC participation","LeetCode Weekly Contest — Top 10% target"])],
           ["Platforms","fa-laptop-code",r]]),
        4:M("Staff / Principal Engineer Interview Prep","fa-briefcase","yellow","Preparing for senior-level roles at FAANG or top startups.",
          [["Advanced Interview Signals","fa-star",TL(["Derive complexity proofs verbally","Propose & compare multiple approaches","Reduce novel problems to known ones","Discuss memory hierarchy impacts","System design connection to algorithms"])],
           ["Resources","fa-briefcase",r]]),
        5:quizBlock(),6:nextLevelBlock()
      },
      dsa_advanced_docs:{
        1:M("Advanced DSA — Research-Level Reading","fa-crown","blue","Read papers, proofs, and formal algorithm textbooks. Depth over breadth.",
          [["Reading List","fa-book",TL(["CLRS — Chapters 15–35 (Advanced)","Competitive Programmer's Handbook (Laaksonen)","Algorithm Design (Kleinberg & Tardos)","Concrete Mathematics (Knuth)","Papers for specific advanced topics"])],
           ["Resources","fa-file-lines",r]],true),
        2:M("Mathematical Foundations","fa-calculator","orange","Advanced DSA is 50% math. Strengthen number theory, combinatorics, linear algebra.",
          [["Mathematical Topics","fa-calculator",TL(["Modular Arithmetic & Fermat's Little Theorem","Matrix Exponentiation","Probability in Randomized Algorithms","Generating Functions","Graph Theory — Flows & Matchings"])],
           ["Resources","fa-file-lines",r]]),
        3:M("Research & Implementation","fa-pencil","green","Implement algorithms from paper/documentation. No tutorials, no hints.",
          [["Challenges","fa-code",TL(["Implement Suffix Array from scratch","Build a Persistent Segment Tree","Code network max-flow (Dinic's)","Implement Aho-Corasick automaton","Write LCT (Link-Cut Tree)"])],
           ["Validation Platforms","fa-laptop-code",r]]),
        4:M("Research-Level Interview Prep","fa-star","yellow","Prepare research-quality explanations and novel problem-solving approaches.",
          [["Advanced Preparation","fa-star",TL(["Write your own algorithm summaries/blog posts","Solve unseen hard problems in 60 min","Teach others — biggest signal of mastery","Participate in ICPC/Google Kick Start","Read editorial breakdowns of past ICPC problems"])],
           ["Resources","fa-file-lines",r]]),
        5:quizBlock(),6:nextLevelBlock()
      },
      dsa_advanced_ai:{
        1:M("Advanced DSA — AI Research Partner","fa-crown","blue","At this level, use AI for high-level analysis, comparison, and novel problem generation.",
          [["Advanced AI Use Cases","fa-wand-magic-sparkles",TL(["Ask AI to generate novel variants of hard problems","Have AI stress-test your algorithm with edge cases","Use AI to compare complexity between approaches","Ask AI to explain cutting-edge techniques","Use AI as a second opinion on proofs"])],
           ["AI Stack","fa-robot",r]],true),
        2:M("AI for Advanced Pattern Analysis","fa-lightbulb","orange","Use AI to explore algorithmic design space — compare, critique, and invent.",
          [["Elite Prompts","fa-comment-dots",PB('"Compare Segment Tree vs BIT in terms of use cases, implementation complexity, and constant factors."')+PB('"Generate a novel hard problem combining network flow and DP. Include constraints and a hint."')],
           ["AI Tools","fa-robot",r]]),
        3:M("AI Stress Testing","fa-dumbbell","green","After implementing hard algorithms, use AI to find edge cases and bugs.",
          [["Stress Test Workflow","fa-rotate",TL(["Implement algorithm from scratch","Paste code to Claude/GPT: 'Find any bugs or edge cases'","Ask AI to generate 10 edge case inputs","Ask AI to write a brute-force checker","Compare brute vs fast on AI-generated cases"])],
           ["Tools","fa-robot",r]]),
        4:M("FAANG+ Senior Interview with AI","fa-briefcase","yellow","Simulate the most demanding technical interviews.",
          [["Senior-Level Prompts","fa-comment",PB('"Act as a Staff Engineer at Google. Give me a system design + algorithm design hybrid problem."')+PB('"Here\'s my solution to a hard DP problem: [paste]. Point out non-obvious inefficiencies an interviewer might push back on."')],
           ["Tools","fa-robot",r]]),
        5:quizBlock(),6:nextLevelBlock()
      },
      web_beginner_video:{
        1:M("Web Dev Foundations — Video Path","fa-house","blue","Start from zero. HTML → CSS → JavaScript. From blank page to functional websites.",
          [["Foundation Topics","fa-list-check",TL(["HTML5 — Semantic markup & structure","CSS3 — Flexbox & Grid Layouts","JavaScript Fundamentals (ES6+)","DOM Manipulation","Responsive Design Basics"])],
           ["Best Beginner Playlists","fa-play-circle",r]],true),
        2:M("JavaScript Deep Dive","fa-square-js","orange","JS is the core of web dev. These videos cover the tricky parts that trip up most beginners.",
          [["JS Topics to Master","fa-layer-group",TL(["Functions, Scope & Closures","Promises & Async/Await","Array Methods (map, filter, reduce)","Event Listeners & DOM Events","Fetch API & Working with JSON"])],
           ["JS Video Resources","fa-play",r]]),
        3:M("Build Your First Projects","fa-hammer","green","Projects cement your learning. Build these in order — each teaches a new concept.",
          [["Project Progression","fa-code",TL(["Portfolio Page (HTML + CSS only)","To-Do List (JS DOM manipulation)","Weather App (Fetch API + JSON)","Quiz App (State management)","Clone any popular UI (Netflix/Spotify)"])],
           ["Project Tutorials","fa-hammer",r]]),
        4:M("Junior Dev Interview Prep","fa-briefcase","yellow","Entry-level interviews focus on fundamentals, JS knowledge, and your portfolio.",
          [["What Interviewers Test","fa-list-check",TL(["HTML semantics & accessibility","CSS specificity & the box model","JS closures, hoisting, 'this' keyword","Event delegation & bubbling","REST API concepts & HTTP methods"])],
           ["Prep Resources","fa-briefcase",r]]),
        5:quizBlock(),6:nextLevelBlock()
      },
      web_beginner_docs:{
        1:M("Web Dev Foundations — Documentation Path","fa-file-lines","blue","Learn from official docs. Reading MDN is a superpower most devs skip.",
          [["Reading Plan","fa-list-ol",TL(["MDN HTML — all core elements","MDN CSS — Box Model → Layout → Flexbox","JavaScript.info — Parts 1 & 2","MDN Web APIs — DOM basics","W3C Accessibility Guidelines (basics)"])],
           ["Core Documentation Sources","fa-book-open",r]],true),
        2:M("JavaScript — Deep Text Study","fa-book-open","orange","JavaScript.info is the best written JS resource on the internet.",
          [["Must-Read Chapters","fa-book",TL(["Fundamentals (ch 1–10)","Objects & Prototypes (ch 4–8)","Async: Callbacks, Promises, Async/Await","Error Handling","Modules & Import/Export"])],
           ["Documentation Resources","fa-file-lines",r]]),
        3:M("Project Building — Read Then Build","fa-hammer","green","Read the concept documentation first, then build something that uses it. No tutorials.",
          [["Docs-First Build Approach","fa-rotate",TL(["Read MDN Fetch API → Build a news aggregator","Read MDN LocalStorage → Build a notes app","Read CSS Grid spec → Build a photo gallery","Read Web Animations API → Add scroll animations"])],
           ["Resources","fa-laptop-code",r]]),
        4:M("Interview Prep — Docs-Based","fa-briefcase","yellow","Re-read key MDN articles before interviews. Know the specification, not just common usage.",
          [["Re-read Before Interviews","fa-book",TL(["MDN — Event Bubbling & Capturing","MDN — Closures (with all examples)","MDN — Promises & Microtask Queue","MDN — this keyword","MDN — Prototype Chain"])],
           ["Interview Resources","fa-briefcase",r]]),
        5:quizBlock(),6:nextLevelBlock()
      },
      web_beginner_ai:{
        1:M("Web Dev Foundations — AI-Assisted","fa-robot","blue","Use AI as a tutor, code reviewer, and debugger — all in one.",
          [["How AI Helps Web Dev Beginners","fa-wand-magic-sparkles",TL(["Explain HTML/CSS concepts in plain English","Debug your code without judgment","Show multiple ways to achieve the same result","Generate practice exercises on demand","Review your code and suggest improvements"])],
           ["Best AI Tools for Web Dev","fa-robot",r],
           ["Power Prompts","fa-comment-dots",PB('"Explain JavaScript closures to me like I\'m 15. Give me a real-world analogy first, then show code."')+PB('"I wrote this code: [paste]. Explain what each line does and tell me if anything is wrong."')+PB('"Create 5 beginner JS exercises on array methods. Give me only the problems — no solutions."')]],true),
        2:M("JS Concepts — Ask AI to Teach","fa-lightbulb","orange","Don't just read or watch — have a dialogue. The best learning is asking follow-up questions.",
          [["AI Prompts for JS Learning","fa-comment-dots",PB('"I\'m confused about \'this\' in JavaScript. Show me 4 different scenarios where it behaves differently."')+PB('"Quiz me on the difference between var, let, and const. Ask me 5 questions."')+PB('"I just learned about Promises. Give me a real project scenario where I\'d use them."')],
           ["AI Tools","fa-robot",r]]),
        3:M("Building Projects with AI Help","fa-hammer","green","Use AI to unstick yourself — not to build for you. The goal is to learn, not just ship.",
          [["Project + AI Workflow","fa-rotate",TL(["Plan your project in plain English","Ask AI to break it into small tasks","Try each task alone first","Paste broken code to AI: 'What's wrong here?'","Ask AI: 'How could I improve this code?'"])],
           ["AI Coding Tools","fa-robot",r]]),
        4:M("Interview Prep with AI","fa-briefcase","yellow","Use AI as your mock interviewer and on-demand explainer.",
          [["Interview Prep Prompts","fa-comment",PB('"Ask me 10 beginner web developer interview questions one at a time. After each answer, tell me what I missed."')+PB('"What are the most common web dev interview questions for a fresher? List them with short answers."')],
           ["Tools","fa-robot",r]]),
        5:quizBlock(),6:nextLevelBlock()
      },
      web_intermediate_video:{
        1:M("Intermediate Web Dev — Video Track","fa-rocket","blue","You know HTML/CSS/JS. Now build real apps with frameworks, APIs, and proper architecture.",
          [["Phase Topics","fa-list-check",TL(["React.js — Components, Hooks, State","Node.js + Express Backend","REST APIs & HTTP deep dive","Databases — MongoDB or PostgreSQL basics","Authentication (JWT, Sessions)"])],
           ["Video Playlists","fa-play-circle",r]],true),
        2:M("React + Backend Mastery","fa-atom","orange","Build full-stack projects. Frontend + backend + database = real developer skills.",
          [["Full-Stack Tech Stack","fa-layer-group",TL(["React + Vite (Frontend)","Express.js (Backend API)","MongoDB + Mongoose (Database)","Axios / Fetch for API calls","Tailwind CSS for styling"])],
           ["Resources","fa-play",r]]),
        3:M("Intermediate Projects to Build","fa-hammer","green","Each project should go on your GitHub and portfolio. Quality over quantity.",
          [["Project Ideas","fa-code",TL(["Full-Stack Blog (React + Node + MongoDB)","E-commerce Product Page (with cart)","Chat App (Socket.io)","Job Tracker Dashboard (CRUD)","Authentication System (JWT + refresh tokens)"])],
           ["Resources","fa-hammer",r]]),
        4:M("Mid-Level Dev Interview Prep","fa-briefcase","yellow","React, performance, and system design concepts are now fair game.",
          [["Interview Focus Areas","fa-list-check",TL(["React lifecycle & reconciliation","Virtual DOM & performance optimization","RESTful API design principles","Database indexing basics","Basic system design (URL shortener, etc.)"])],
           ["Resources","fa-briefcase",r]]),
        5:quizBlock(),6:nextLevelBlock()
      },
      web_intermediate_docs:{
        1:M("Intermediate Web Dev — Documentation Track","fa-file-lines","blue","Read official docs for every tool you use. What separates senior devs from juniors.",
          [["Core Docs to Study","fa-list-ol",TL(["React Official Docs (react.dev)","Node.js Official Docs","Express.js Guide","MDN — Fetch & HTTP in depth","JWT.io — Token auth documentation"])],
           ["Documentation Sources","fa-book-open",r]],true),
        2:M("Framework Deep Dives — Read the Source","fa-book-open","orange","Don't just use React — understand how it works.",
          [["Documentation Study Plan","fa-book",TL(["React — Describing the UI (all sections)","React — Adding Interactivity","React — Managing State","React — Escape Hatches (useEffect, refs)","Express.js — Routing & Middleware"])],
           ["Resources","fa-file-lines",r]]),
        3:M("Build Without Tutorials","fa-hammer","green","Use only documentation to build your projects. This is how real devs work.",
          [["Docs-Only Build Challenge","fa-rotate",TL(["Build a REST API using only Express docs","Build a React CRUD app using only react.dev","Implement auth reading only JWT.io docs","Style with Tailwind using only Tailwind docs"])],
           ["Resources","fa-laptop-code",r]]),
        4:M("Interview Prep — Docs Knowledge","fa-briefcase","yellow","Mid-level interviews reward those who understand WHY things work.",
          [["Deep Reads for Interviews","fa-book",TL(["React reconciliation algorithm (official blog)","HTTP/2 vs HTTP/1.1 (MDN)","IndexedDB vs LocalStorage vs Cookies","CORS explained (MDN)","Browser rendering pipeline"])],
           ["Resources","fa-briefcase",r]]),
        5:quizBlock(),6:nextLevelBlock()
      },
      web_intermediate_ai:{
        1:M("Intermediate Web Dev — AI Accelerated","fa-robot","blue","AI supercharges mid-level growth. Use it for architecture decisions, code review, and learning frameworks fast.",
          [["Intermediate AI Strategies","fa-wand-magic-sparkles",TL(["Ask AI to review your project architecture","Use AI to generate boilerplate & scaffolding","Ask AI to explain React internals on demand","Use AI to write tests for your code","Let AI suggest better patterns when stuck"])],
           ["AI Tool Stack","fa-robot",r]],true),
        2:M("Framework Learning with AI","fa-lightbulb","orange","Use AI to fast-track framework knowledge — edge cases, anti-patterns, best practices.",
          [["AI Prompts for React/Node","fa-comment-dots",PB('"What are the 5 most common React anti-patterns I should avoid as an intermediate developer?"')+PB('"Explain useEffect cleanup function. When is it needed and what happens if I skip it?"')+PB('"Review my React component: [paste code]. What could be optimized or refactored?"')],
           ["AI Tools","fa-robot",r]]),
        3:M("AI-Assisted Project Building","fa-hammer","green","Build full projects with AI as your senior dev. Ask it to review PRs and suggest architecture.",
          [["AI-Powered Dev Workflow","fa-rotate",TL(["Use v0.dev to prototype UI components","Use Copilot for repetitive code generation","Use Claude/GPT for architecture decisions","Paste error messages to AI for fast debug","Ask AI to write unit tests for your functions"])],
           ["Tools","fa-robot",r]]),
        4:M("AI-Powered Interview Prep","fa-briefcase","yellow","Simulate mid-level interviews and get feedback on architecture explanations.",
          [["Interview Simulation Prompts","fa-comment",PB('"Act as a frontend tech lead interviewing me for a mid-level React role. Challenge my answers on state management."')+PB('"What are the top 10 React interview questions for an intermediate developer? Quiz me one by one."')],
           ["Tools","fa-robot",r]]),
        5:quizBlock(),6:nextLevelBlock()
      },
      web_advanced_video:{
        1:M("Advanced Web Dev — Video Track","fa-crown","blue","Performance, architecture, DevOps, and system design. The skills that make you a senior engineer.",
          [["Advanced Topics","fa-list-check",TL(["Web Performance Optimization (Core Web Vitals)","Advanced React Patterns (Compound, Render Props)","Micro-frontend Architecture","CI/CD Pipelines & DevOps basics","TypeScript in depth"])],
           ["Video Resources","fa-play-circle",r]],true),
        2:M("Architecture & Performance Deep Dives","fa-layer-group","orange","Senior devs solve problems at the architectural level. Systems thinking videos.",
          [["Advanced Architecture Topics","fa-layer-group",TL(["SSR vs CSR vs ISR","State management at scale (Zustand, Jotai, TanStack Query)","Monorepo setup (Turborepo)","Edge computing & CDN strategy","Web security (XSS, CSRF, CSP)"])],
           ["Resources","fa-play",r]]),
        3:M("Senior-Level Project Portfolio","fa-hammer","green","Build things that impress a senior engineer — architecture and DX, not just functionality.",
          [["Advanced Project Ideas","fa-code",TL(["SaaS App with subscription billing (Stripe)","Real-time collaborative editor (CRDT / OT)","Custom design system & component library","Multi-tenant application architecture","CI/CD pipeline for your existing projects"])],
           ["Resources","fa-hammer",r]]),
        4:M("Senior / Staff Engineer Interview Prep","fa-briefcase","yellow","System design, architectural trade-offs, and technical leadership signals.",
          [["Senior Interview Focus","fa-star",TL(["Frontend system design (design Twitter feed)","Performance budget & optimization strategy","Accessibility at scale (WCAG 2.2)","Monorepo vs polyrepo trade-offs","Technical mentorship & code review philosophy"])],
           ["Resources","fa-briefcase",r]]),
        5:quizBlock(),6:nextLevelBlock()
      },
      web_advanced_docs:{
        1:M("Advanced Web Dev — Documentation Mastery","fa-crown","blue","Primary sources are specs, RFCs, and official documentation. Read the source.",
          [["Primary Source Reading List","fa-book",TL(["W3C Web Performance specs","TC39 Proposals (ECMAScript future)","WHATWG HTML Living Standard (advanced)","WCAG 2.2 Accessibility Guidelines","HTTP/3 & QUIC spec overview"])],
           ["Advanced Documentation Sources","fa-file-lines",r]],true),
        2:M("Spec-Level Learning","fa-graduation-cap","orange","Understanding specs gives you an edge — when docs disagree with behavior, you'll know why.",
          [["Spec Deep Dives","fa-book",TL(["CSS Cascade & Specificity (CSS spec)","JavaScript Event Loop (HTML spec)","Service Worker lifecycle (W3C)","Web Components standard (WHATWG)","Fetch API spec vs XMLHttpRequest"])],
           ["Spec Resources","fa-file-lines",r]]),
        3:M("Production-Grade Projects","fa-hammer","green","Build with production requirements: performance budgets, a11y, security, monitoring.",
          [["Production Checklist","fa-clipboard-check",TL(["Performance: LCP < 2.5s, CLS < 0.1","Accessibility: WCAG 2.2 AA compliance","Security: CSP headers, input sanitization","Monitoring: Error tracking (Sentry)","Testing: >80% coverage (Vitest/Jest)"])],
           ["Resources","fa-laptop-code",r]]),
        4:M("Staff Engineer Technical Interviews","fa-briefcase","yellow","Influence architecture, mentor others, and think in trade-offs.",
          [["Key Discussion Areas","fa-star",TL(["Document your architectural decisions (ADR format)","Teach a junior concept from documentation","Compare two specifications — when to use each","Performance audit a public website live","Write your own TypeScript utility types"])],
           ["Resources","fa-briefcase",r]]),
        5:quizBlock(),6:nextLevelBlock()
      },
      web_advanced_ai:{
        1:M("Advanced Web Dev — AI-Powered Engineering","fa-crown","blue","At senior level, AI is a force multiplier. Prototype faster, review architecture, stay current.",
          [["Senior-Level AI Strategies","fa-wand-magic-sparkles",TL(["Use AI to explore architectural trade-offs","Let AI generate performance optimization hypotheses","Use AI for rapid PoC building","Ask AI to review your code as a CTO would","Use AI to stay current — summarize new RFCs/specs"])],
           ["Advanced AI Stack","fa-robot",r]],true),
        2:M("Architecture Discussion with AI","fa-lightbulb","orange","Use AI as a senior architect to pressure-test your system design ideas.",
          [["Architecture Prompts","fa-comment-dots",PB('"I\'m building a real-time collaborative app. Compare WebSockets vs SSE vs Long Polling. Ask me about my constraints first."')+PB('"I\'m choosing between Next.js App Router and Remix for a new SaaS product. Act as a senior architect and ask me the right questions."')+PB('"Review this API design: [paste]. What REST principles am I violating?"')],
           ["AI Tools","fa-robot",r]]),
        3:M("AI-Augmented Senior Projects","fa-hammer","green","Use AI to ship production projects faster, with better code quality.",
          [["Senior AI Dev Workflow","fa-rotate",TL(["Use Cursor for full-codebase context AI help","Use Claude to review architectural decisions","Generate test suites with AI, verify edge cases manually","Use AI to write documentation and README","Use Perplexity to research new patterns before implementing"])],
           ["Tools","fa-robot",r]]),
        4:M("Staff Engineer Interview with AI","fa-briefcase","yellow","Practice the high-level discussions that define staff-level interviews.",
          [["Staff-Level Prompts","fa-comment",PB('"Act as a VP of Engineering. I\'m pitching a migration from REST to GraphQL. Challenge my proposal with tough questions."')+PB('"I\'m designing a component library from scratch. Ask me hard questions about API design, accessibility, and versioning."')],
           ["Tools","fa-robot",r]]),
        5:quizBlock(),6:nextLevelBlock()
      },
    };
  }

  function generateFallbackContent(key){
    const[subj,lvl,sty]=key.split("_");
    return{
      1:`<div class="sc-header sc-accent-blue"><div class="sc-icon"><i class="fa-solid fa-book"></i></div><div><h3>${subjectLabels[subj]||subj} — ${levelLabels[lvl]||lvl}</h3><p class="rm-desc">Your personalized ${styleLabels[sty]||sty} roadmap.</p></div></div><button class="step-btn" id="downloadRoadmapBtn" style="margin-top:20px;"><i class="fa-solid fa-download"></i> Download Plan</button>`,
      2:`<p class="rm-desc">Core learning resources coming soon.</p>`,
      3:`<p class="rm-desc">Practice resources coming soon.</p>`,
      4:`<p class="rm-desc">Interview prep coming soon.</p>`,
      5:quizBlock(),6:nextLevelBlock()
    };
  }

  function attachDynamicHandlers(step){
    document.getElementById("downloadRoadmapBtn")?.addEventListener("click",()=>{
      const txt=["LearnSwitch Personalized Roadmap","================================",
        `Subject  : ${subjectLabels[prefs.subject]||prefs.subject}`,
        `Level    : ${levelLabels[prefs.level]||prefs.level}`,
        `Style    : ${styleLabels[prefs.style]||prefs.style}`,"",
        `Progress : ${progress.completedSteps.join(", ")||"None"} completed`,
        `Quiz     : ${progress.quizPassed?"Passed":"Not taken"}`,"",
        "Generated by LearnSwitch"].join("\n");
      const a=document.createElement("a");
      a.href=URL.createObjectURL(new Blob([txt],{type:"text/plain"}));
      a.download=`LearnSwitch-${prefs.subject}-${prefs.level}-Roadmap.txt`; a.click();
    });
    document.getElementById("aiPromptBtn")?.addEventListener("click",()=>{
      const prompts={
        dsa:`"I want to learn ${levelLabels[prefs.level]} DSA. Give me a structured 4-week learning plan with specific topics for each week."`,
        web:`"I want to improve my ${levelLabels[prefs.level]} Web Development skills. Give me a structured 4-week plan with specific topics."`,
      };
      const out=document.getElementById("aiPromptOutput");
      if(out)out.innerHTML=`<div class="prompt-box" style="margin-top:12px;">Copy to ChatGPT or Claude:<br><br><strong>${prompts[prefs.subject]||prompts.dsa}</strong></div>`;
    });
    document.getElementById("levelGoBtn")?.addEventListener("click",()=>{
      const next=prefs.level==="beginner"?"intermediate":prefs.level==="intermediate"?"advanced":null;
      if(!next){alert("🏆 You've reached the highest level!");return;}
      prefs.level=next; localStorage.setItem("ls_roadmapPrefs",JSON.stringify(prefs)); location.reload();
    });
  }

  function checkQuizReturn(){
    const result=JSON.parse(localStorage.getItem("quizResult"));
    if(!result||result.progressKey!==progressKey)return;
    if(result.topic){
      const topicKey=`topicResults_${progressKey}`;
      const tr=JSON.parse(localStorage.getItem(topicKey))||{};
      const prev=tr[result.topic]||{};
      tr[result.topic]={score:result.score,passed:result.score>=80,attempts:(prev.attempts||0)+1,date:Date.now()};
      localStorage.setItem(topicKey,JSON.stringify(tr));
    }
    progress.quizScore=result.score;
    if(result.score>=80){
      const topicKey=`topicResults_${progressKey}`;
      const tr=JSON.parse(localStorage.getItem(topicKey))||{};
      const key=`${prefs.subject}_${prefs.level}`;
      const topics=QUIZ_TOPICS[key]||[];
      const allPassed=topics.length>0&&topics.every(t=>tr[t.slug]?.passed);
      if(allPassed){progress.quizPassed=true;if(!progress.completedSteps.includes(5))progress.completedSteps.push(5);saveProgress();launchConfetti();}
    }
    localStorage.removeItem("quizResult");
  }

  function checkLevelUnlock(){
    const allDone=[1,2,3,4,5].every(s=>progress.completedSteps.includes(s));
    const dot=document.querySelector('.progress-step[data-step="6"]');
    if(allDone&&progress.quizPassed)dot?.classList.remove("locked");
  }

  function launchConfetti(){
    for(let i=0;i<60;i++){
      const p=document.createElement("div"); p.className="confetti-piece";
      p.style.cssText=[`left:${Math.random()*100}%`,`background:hsl(${Math.random()*360},100%,55%)`,
        `animation-duration:${1.5+Math.random()*2}s`,`animation-delay:${Math.random()*0.8}s`,
        `transform:rotate(${Math.random()*360}deg)`].join(";");
      document.body.appendChild(p); p.addEventListener("animationend",()=>p.remove());
    }
  }

  loadProgress();
}
