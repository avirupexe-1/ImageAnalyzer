/* =============================================
   VintageLogin — script.js
   Buddy animations, image upload, AI describe
   ============================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ── Buddy greetings per buddy key ── */
  const GREETINGS = {
    duck:    ["Quack!! Welcome back!! The pixels are dancing for you!!", "OH WOY OH WOY you're here!! Duck dance time!!", "I've been waiting!! Quack quack!!"],
    cat:     ["You again. I suppose that's acceptable.", "Hmm. You've returned. I wasn't worried. Obviously.", "Another day, another human. How terribly… intriguing."],
    fox:     ["Ah, you slipped in quietly — I noticed.", "Clever of you to show up. I had a feeling you would.", "The fox sees all. Welcome back, sly one."],
    frog:    ["*sits on lily pad contemplatively* …oh, hello.", "The pond is calm. Your arrival disturbs it pleasantly.", "Ribbit. The moment arrives when it must. And here you are."],
    bunny:   ["YOURE HERE YOURE HERE YOURE HERE!!! 🐰", "OH MY GOODNESS HI HI HI I MISSED YOU SO MUCH!!!", "THE BEST HUMAN IS BACK AND I AM SO HAPPY!!!"],
    bear:    ["Mmm. Welcome home, friend. Warm like honey.", "Come in, come in. Like settling into a cozy den.", "Ah. The good one is here. Sweet as honeycomb."],
    penguin: ["Ah — good day. Your punctuality is… noted.", "Welcome. I trust you are well. *adjusts posture*", "I am — ahem — quite pleased to see you. Properly."],
  };

  /* ── Typing animation ── */
  function typeText(el, text, speed = 28) {
    el.textContent = "";
    const cursor = el.querySelector?.(".typing-cursor");
    let i = 0;
    const interval = setInterval(() => {
      el.textContent = text.slice(0, i + 1);
      if (cursor) el.appendChild(cursor);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
  }

  /* ── Init buddy speech on dashboard ── */
  const speechEl = document.getElementById("buddy-speech-text");
  const buddyKey  = document.getElementById("buddy-key")?.value || "cat";

  if (speechEl) {
    const greetings = GREETINGS[buddyKey] || GREETINGS.cat;
    const msg = greetings[Math.floor(Math.random() * greetings.length)];
    setTimeout(() => typeText(speechEl, msg), 500);
  }

  /* ── Buddy selector buttons ── */
  const buddyBtns = document.querySelectorAll(".buddy-btn");
  const buddyKeyInput = document.getElementById("buddy-key");
  const buddyNameEl   = document.getElementById("buddy-display-name");
  const buddySpriteEl = document.getElementById("buddy-sprite");

  const BUDDY_META = {
    duck:    { name: "Pip the Duck",    emoji: "🦆" },
    cat:     { name: "Mochi the Cat",   emoji: "🐱" },
    fox:     { name: "Rusty the Fox",   emoji: "🦊" },
    frog:    { name: "Lily the Frog",   emoji: "🐸" },
    bunny:   { name: "Coco the Bunny",  emoji: "🐰" },
    bear:    { name: "Bruno the Bear",  emoji: "🐻" },
    penguin: { name: "Percy the Penguin", emoji: "🐧" },
  };

  buddyBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      buddyBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const key = btn.dataset.buddy;
      if (buddyKeyInput) buddyKeyInput.value = key;

      const meta = BUDDY_META[key];
      if (buddyNameEl) buddyNameEl.textContent = meta.name;
      if (buddySpriteEl) buddySpriteEl.textContent = meta.emoji;

      // New greeting
      if (speechEl) {
        const greetings = GREETINGS[key] || GREETINGS.cat;
        const msg = greetings[Math.floor(Math.random() * greetings.length)];
        typeText(speechEl, msg);
      }
    });
  });

  /* ── Image drop zone & file input ── */
  const dropZone     = document.getElementById("drop-zone");
  const fileInput    = document.getElementById("file-input");
  const previewImg   = document.getElementById("image-preview");
  const analyzeBtn   = document.getElementById("btn-analyze");
  const resultBox    = document.getElementById("analysis-result");
  const resultBuddy  = document.getElementById("result-buddy");
  const resultText   = document.getElementById("result-text");

  let currentImageB64 = null;

  function handleFile(file) {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      currentImageB64 = e.target.result;
      previewImg.src = e.target.result;
      previewImg.style.display = "block";
      analyzeBtn.style.display = "inline-block";
      resultBox.style.display = "none";
      dropZone.querySelector("p").textContent = "✓ Image loaded — click Analyse to proceed";
    };
    reader.readAsDataURL(file);
  }

  if (dropZone) {
    dropZone.addEventListener("dragover", e => { e.preventDefault(); dropZone.classList.add("dragover"); });
    dropZone.addEventListener("dragleave", () => dropZone.classList.remove("dragover"));
    dropZone.addEventListener("drop", e => {
      e.preventDefault();
      dropZone.classList.remove("dragover");
      handleFile(e.dataTransfer.files[0]);
    });
  }

  if (fileInput) {
    fileInput.addEventListener("change", () => handleFile(fileInput.files[0]));
  }

  /* ── Analyse button ── */
  if (analyzeBtn) {
    analyzeBtn.addEventListener("click", async () => {
      if (!currentImageB64) return;

      const key = document.getElementById("buddy-key")?.value || "cat";
      analyzeBtn.innerHTML = '<span class="spinner"></span> Analysing…';
      analyzeBtn.disabled = true;

      try {
        const res = await fetch("/describe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: currentImageB64, buddy: key }),
        });
        const data = await res.json();

        resultBuddy.textContent = data.buddy || "Your Buddy";
        resultText.textContent  = "";
        resultBox.style.display = "block";

        // Type out the analysis
        typeText(resultText, data.analysis || "Hmm, nothing to say.", 18);

        // Mirror to buddy speech
        if (speechEl) typeText(speechEl, data.analysis?.slice(0, 120) || "Interesting...", 18);

      } catch (err) {
        resultBuddy.textContent = "Error";
        resultText.textContent  = "Could not reach the analysis service. Please try again.";
        resultBox.style.display = "block";
      } finally {
        analyzeBtn.innerHTML = "✦ Analyse Image";
        analyzeBtn.disabled = false;
      }
    });
  }

  /* ── Dancing animals strip – click to bounce ── */
  document.querySelectorAll(".animal-item").forEach(el => {
    el.addEventListener("click", () => {
      el.style.animation = "none";
      el.offsetHeight; // reflow
      el.style.animation = "";
      el.style.transform = "scale(1.4)";
      setTimeout(() => el.style.transform = "", 300);
    });
  });

});
