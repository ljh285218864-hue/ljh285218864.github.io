 /* ---------- Scroll reveal ---------- */
(() => {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('show'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) {
        en.target.classList.add('show');
        io.unobserve(en.target);
      }
    });
  }, {threshold: .12});
  els.forEach(el => io.observe(el));
})();

/* ---------- Fix nav links / hero button ---------- */
(() => {
  const exploreHero = document.querySelector('[data-explore]');
  if (exploreHero) exploreHero.href = 'destiny-packages.html';

  const navDest = document.querySelectorAll('a[href="destiny.html"], a[href="/destiny.html"]');
  navDest.forEach(a => a.setAttribute('href','destiny-packages.html'));
})();

/* ---------- Checkout mapping & logic ---------- */
const SKUS = {
  // Destiny readings
  single: { title:'Single written destiny reading', price:39.95, currency:'USD' },
  three : { title:'Three-question destiny reading',  price:89.95, currency:'USD' },
  full  : { title:'Full destiny overview',           price:129.95, currency:'USD' },

  // Feng Shui sessions
  fs_corner : { title:'Home corner refresh (Feng Shui)', price:49.95, currency:'USD' },
  fs_home   : { title:'Whole home review (Feng Shui)',   price:119.95, currency:'USD' },
  fs_work   : { title:'Workspace & career (Feng Shui)',  price:89.95, currency:'USD' },
};

function qs(key){
  return new URLSearchParams(location.search).get(key);
}

(() => {
  const checkout = document.querySelector('[data-checkout]');
  if (!checkout) return;

  const sku = qs('sku') || 'single';
  const data = SKUS[sku] || SKUS.single;

  const t = document.querySelector('[data-item-title]');
  const p = document.querySelector('[data-item-price]');
  if (t) t.textContent = data.title;
  if (p) p.textContent = `$${data.price.toFixed(2)} ${data.currency}`;

  const btn = document.querySelector('[data-pay]');
  const radios = document.querySelectorAll('input[name="paymethod"]');

  function currentMethod(){
    const r = Array.from(radios).find(r=>r.checked);
    return r ? r.value : 'card';
  }

  btn && btn.addEventListener('click', () => {
    if (currentMethod() === 'paypal') {
      const url = `https://paypal.me/suanmingfuwu/${data.price.toFixed(2)}`;
      window.location.href = url;
    } else {
      alert('Card payment: please connect Stripe / PayPal card in the future.\nFor now, choose PayPal to complete this order.');
    }
  });
})();

/* ---------- Why required modal ---------- */
(() => {
  const open = document.querySelector('[data-why]');
  const modal = document.querySelector('#why-modal');
  const close = modal ? modal.querySelector('[data-close]') : null;
  if(!modal) return;
  open && open.addEventListener('click', ()=> modal.classList.add('open'));
  close && close.addEventListener('click', ()=> modal.classList.remove('open'));
})();
