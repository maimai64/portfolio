// ─── フェードインアニメーション ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ─── ハンバーガーメニュー ───
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  hamburger.classList.toggle('is-open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', false);
  });
});

// ─── お問い合わせフォーム送信 ───
const contactForm = document.getElementById('contact-form-el');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = document.getElementById('submit-btn');
    btn.textContent = '送信中...';
    btn.disabled = true;

    const data = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        window.location.href = 'https://maimai64.github.io/portfolio/thanks.html';
      } else {
        throw new Error('送信失敗');
      }
    } catch (error) {
      btn.textContent = '送信に失敗しました。もう一度お試しください。';
      btn.disabled = false;
    }
  });
}