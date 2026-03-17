// ── DASHBOARD DATE ──────────────────────────────────
const dateEl = document.getElementById('dash-date');
if (dateEl) {
  const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const now    = new Date();
  dateEl.textContent = `${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`;
}

// ── BUDDY SYSTEM ─────────────────────────────────────
const BUDDIES = [
  { name: 'Pip the Duck',       img: 'duck.png'    },
  { name: 'Mochi the Cat',      img: 'cat.png'     },
  { name: 'Rusty the Fox',      img: 'fox.png'     },
  { name: 'Lily the Frog',      img: 'frog.png'    },
  { name: 'Coco the Bunny',     img: 'bunny.png'   },
  { name: 'Bruno the Bear',     img: 'bear.png'    },
  { name: 'Percy the Penguin',  img: 'penguin.png' },
];

const buddyImg  = document.getElementById('buddy-img');
const buddyName = document.getElementById('buddy-name');
const metCount  = document.getElementById('met-count');

let metSet  = new Set();
let current = Math.floor(Math.random() * BUDDIES.length);

function showBuddy(idx) {
  const b = BUDDIES[idx];
  buddyImg.classList.remove('dancing', 'entrance');
  void buddyImg.offsetWidth;
  buddyImg.src          = `/static/images/animals/${b.img}`;
  buddyImg.alt          = b.name;
  buddyName.textContent = b.name;
  buddyImg.classList.add('entrance');
  setTimeout(() => {
    buddyImg.classList.remove('entrance');
    buddyImg.classList.add('dancing');
  }, 400);
  metSet.add(idx);
  if (metCount) metCount.textContent = metSet.size;
  setTimeout(syncChatBuddy, 100);
}

window.nextBuddy = function () {
  current = (current + 1) % BUDDIES.length;
  showBuddy(current);
};

window.randomBuddy = function () {
  let r;
  do { r = Math.floor(Math.random() * BUDDIES.length); }
  while (r === current && BUDDIES.length > 1);
  current = r;
  showBuddy(current);
};

if (buddyImg) {
  showBuddy(current);
}

// ── TYPING EFFECT — letter by letter ─────────────────
function typeLetters(text) {
  chatText.textContent = '';
  let i = 0;

  function nextLetter() {
    if (i < text.length) {
      chatText.textContent += text[i];
      i++;
      // slightly random speed for natural feel
      const delay = text[i - 1] === '.' || text[i - 1] === '!' || text[i - 1] === '?' ? 150 : Math.random() * 10 + 15;
      setTimeout(nextLetter, delay);
    }
  }
  nextLetter();
}

// ── IMAGE CAPTION ─────────────────────────────────────
const dropZone     = document.getElementById('drop-zone');
const dropInner    = document.getElementById('drop-inner');
const imgInput     = document.getElementById('img-input');
const previewImg   = document.getElementById('preview-img');
const chatBubble   = document.getElementById('chat-bubble');
const chatText     = document.getElementById('chat-text');
const chatBuddyImg = document.getElementById('chat-buddy-img');

function syncChatBuddy() {
  if (chatBuddyImg && buddyImg) {
    chatBuddyImg.src = buddyImg.src;
  }
}

if (dropZone) {
  syncChatBuddy();

  function handleImage(file) {
    if (!file || !file.type.startsWith('image/')) return;

    // show preview
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImg.src           = e.target.result;
      previewImg.style.display = 'block';
      dropInner.style.display  = 'none';
    };
    reader.readAsDataURL(file);

    // get current buddy name from img src
    const src        = buddyImg ? buddyImg.src : '';
    const buddyMatch = src.match(/animals\/(\w+)\.png/);
    const buddyKey   = buddyMatch ? buddyMatch[1] : 'duck';

    const formData = new FormData();
    formData.append('image', file);
    formData.append('buddy', buddyKey);

    chatText.textContent = '';
    chatBubble.classList.add('loading');

    fetch('/describe', { method: 'POST', body: formData })
      .then(r => r.json())
      .then(data => {
        chatBubble.classList.remove('loading');
        if (data.description) {
          typeLetters(data.description);
        } else {
          typeLetters('Hmm, I had trouble seeing that one!');
        }
      })
      .catch(() => {
        chatBubble.classList.remove('loading');
        typeLetters('Oops! Something went wrong. Try again!');
      });
  }

  // click to browse
  dropZone.addEventListener('click', () => imgInput.click());
  imgInput.addEventListener('change', (e) => handleImage(e.target.files[0]));

  // drag and drop
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    handleImage(e.dataTransfer.files[0]);
  });
}