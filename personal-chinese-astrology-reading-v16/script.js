const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

document.querySelector('.menu-toggle')?.addEventListener('click', () => {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  nav.style.position = 'absolute';
  nav.style.top = '72px';
  nav.style.left = '20px';
  nav.style.right = '20px';
  nav.style.flexDirection = 'column';
  nav.style.padding = '18px';
  nav.style.border = '1px solid rgba(255,255,255,.12)';
  nav.style.borderRadius = '18px';
  nav.style.background = 'rgba(20,15,31,.96)';
});
