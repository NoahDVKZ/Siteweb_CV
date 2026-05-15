const birthDate = new Date(2004, 1, 25);
const today = new Date();

let age = today.getFullYear() - birthDate.getFullYear();
const hasHadBirthday = today >= new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
if (!hasHadBirthday) age--;

const ageEl = document.getElementById("age");
if (ageEl) ageEl.textContent = `${age} ans · 25 février 2004`;

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .nav-card, .item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(16px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});