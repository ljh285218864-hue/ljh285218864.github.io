const observer = new IntersectionObserver((entries)=>{entries.forEach((entry)=>{if(entry.isIntersecting)entry.target.classList.add('show')})},{threshold:.12});
document.querySelectorAll('.reveal').forEach((el)=>observer.observe(el));
const mobileMenu=document.querySelector('.mobile-menu');
const nav=document.querySelector('.desktop-nav');
mobileMenu?.addEventListener('click',()=>{if(!nav)return;nav.classList.toggle('open')});
