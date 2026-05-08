const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const announcementBar = document.querySelector('[data-announcement]');
const announcementClose = document.querySelector('[data-announcement-close]');
const announcementCta = document.querySelector('[data-announcement-cta]');

const ANNOUNCEMENT_DELAY_MS = 5000;
const ANNOUNCEMENT_DISMISS_KEY = 'ltx23-home-announcement-dismissed-v1';
const ANNOUNCEMENT_DELAY_KEY = 'ltx23-home-announcement-delay-ms';

function trackEvent(name, props) {
  if (typeof window.plausible !== 'function') {
    return;
  }

  window.plausible(name, props ? { props } : undefined);
}

function readStorage(key) {
  try {
    return window.localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

function writeStorage(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    return;
  }
}

function getAnnouncementDelay() {
  if (!announcementBar) {
    return ANNOUNCEMENT_DELAY_MS;
  }

  const configuredDelay = Number(announcementBar.dataset.delayMs || readStorage(ANNOUNCEMENT_DELAY_KEY));

  if (!Number.isFinite(configuredDelay) || configuredDelay < 0) {
    return ANNOUNCEMENT_DELAY_MS;
  }

  return configuredDelay;
}

function revealAnnouncement() {
  if (!announcementBar || announcementBar.hidden) {
    if (!announcementBar) {
      return;
    }
  } else {
    return;
  }

  announcementBar.hidden = false;
  announcementBar.setAttribute('aria-hidden', 'false');
  trackEvent('home announcement shown', { delay_ms: String(getAnnouncementDelay()) });
}

function dismissAnnouncement(reason) {
  if (!announcementBar || announcementBar.hidden) {
    return;
  }

  announcementBar.hidden = true;
  announcementBar.setAttribute('aria-hidden', 'true');
  writeStorage(ANNOUNCEMENT_DISMISS_KEY, '1');
  trackEvent('home announcement dismissed', { reason });
}

async function copyText(text) {
  if (!text) {
    return false;
  }

  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const helper = document.createElement('textarea');
  helper.value = text;
  helper.setAttribute('readonly', '');
  helper.style.position = 'absolute';
  helper.style.left = '-9999px';
  document.body.appendChild(helper);
  helper.select();
  const copied = document.execCommand('copy');
  document.body.removeChild(helper);
  return copied;
}

function flashButtonState(button, nextLabel) {
  if (!button.dataset.originalLabel) {
    button.dataset.originalLabel = button.textContent.trim();
  }

  button.textContent = nextLabel;

  window.setTimeout(() => {
    button.textContent = button.dataset.originalLabel;
  }, 1800);
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('is-open');
  });
}

document.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
  document.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target)) {
      dropdown.removeAttribute('open');
    }
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    document.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
      dropdown.removeAttribute('open');
    });
  }
});

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

document.querySelectorAll('[data-copy-target]').forEach((button) => {
  button.addEventListener('click', async () => {
    const selector = button.getAttribute('data-copy-target');
    const source = selector ? document.querySelector(selector) : null;

    if (!source) {
      flashButtonState(button, 'Not Found');
      return;
    }

    const text = 'value' in source ? source.value.trim() : source.textContent.trim();

    try {
      const copied = await copyText(text);
      flashButtonState(button, copied ? 'Copied' : 'Copy Failed');
    } catch (error) {
      flashButtonState(button, 'Copy Failed');
    }
  });
});

document.querySelectorAll('[data-prompt-builder]').forEach((builder) => {
  const fields = Array.from(builder.querySelectorAll('[data-prompt-part]'));
  const output = builder.querySelector('[data-prompt-output]');
  const trigger = builder.querySelector('[data-generate-prompt]');

  if (!fields.length || !output || !trigger) {
    return;
  }

  const buildPrompt = () => {
    const parts = fields
      .map((field) => field.value.trim())
      .filter(Boolean);

    const prompt = parts.length
      ? `${parts.join(', ')}.`
      : 'Describe the subject, action, setting, camera, lighting, and style to generate a usable LTX 2.3 prompt.';

    output.value = prompt;
  };

  trigger.addEventListener('click', buildPrompt);
  buildPrompt();
});

if (announcementBar) {
  if (readStorage(ANNOUNCEMENT_DISMISS_KEY) !== '1') {
    window.setTimeout(revealAnnouncement, getAnnouncementDelay());
  }

  if (announcementClose) {
    announcementClose.addEventListener('click', () => {
      dismissAnnouncement('close_button');
    });
  }

  if (announcementCta) {
    announcementCta.addEventListener('click', () => {
      trackEvent('home announcement clicked', { target: 'primary_cta' });
    });
  }
}
