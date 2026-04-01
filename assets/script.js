const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

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
