// ============ 滚动显现动画 ============
const revealEls = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => observer.observe(el));

// ============ 图片灯箱 ============
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('.lightbox-img');
const lightboxCaption = lightbox.querySelector('.lightbox-caption');
const lightboxClose = lightbox.querySelector('.lightbox-close');

function openLightbox(imgEl) {
  lightboxImg.src = imgEl.src;
  lightboxCaption.textContent = imgEl.closest('.gallery-item').dataset.caption || imgEl.alt || '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('click', () => openLightbox(item.querySelector('img')));
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// ============ 技能条进场动画 ============
const bars = document.querySelectorAll('.bar i');
const barObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.style.width;
        bar.style.width = '0';
        requestAnimationFrame(() => {
          bar.style.transition = 'width 1.2s cubic-bezier(.22,1,.36,1)';
          bar.style.width = width;
        });
        barObserver.unobserve(bar);
      }
    });
  },
  { threshold: 0.5 }
);
bars.forEach((bar) => barObserver.observe(bar));
