/* ============================================================
   MAIN.JS — All portfolio interactivity
   ============================================================ */

/* ── Typing Effect ── */
const phrases = [
  'Robotics and AI',
  'Robotics Engineer',
  'Autonomous Systems Developer',
];

let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  if (!typedEl) return;
  const phrase = phrases[phraseIdx];

  if (!deleting) {
    typedEl.textContent = phrase.slice(0, charIdx + 1);
    charIdx++;
    if (charIdx === phrase.length) {
      deleting = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    typedEl.textContent = phrase.slice(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(type, deleting ? 50 : 80);
}

document.addEventListener('DOMContentLoaded', type);

/* ── Scroll Reveal ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (i * 0.08) + 's';
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── Skill Bar Animation ── */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width + '%';
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-fill').forEach(bar => barObserver.observe(bar));


/* ── Copy Email to Clipboard ── */
document.addEventListener('click', (e) => {
  const btn = e.target.closest && e.target.closest('.copy-email');
  if (!btn) return;
  e.preventDefault();
  const email = btn.dataset.email || btn.getAttribute('data-email') || btn.textContent.trim();

  function showToast(msg) {
    const toast = document.createElement('div');
    toast.textContent = msg;
    Object.assign(toast.style, {
      position: 'fixed',
      right: '20px',
      bottom: '20px',
      padding: '10px 14px',
      background: 'var(--color-accent-alt, #4caf50)',
      color: 'var(--color-bg, #fff)',
      borderRadius: '6px',
      boxShadow: '0 6px 18px rgba(0,0,0,0.12)',
      zIndex: 9999,
      fontSize: '14px'
    });
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = '0'; toast.style.transition = 'opacity 250ms'; }, 1800);
    setTimeout(() => toast.remove(), 2100);
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(() => {
      showToast('Email copied to clipboard');
    }).catch(() => {
      showToast('Copy failed — please select and copy manually');
    });
  } else {
    const ta = document.createElement('textarea');
    ta.value = email;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast('Email copied to clipboard');
    } catch (err) {
      showToast('Copy failed — please select and copy manually');
    }
    ta.remove();
  }
});
