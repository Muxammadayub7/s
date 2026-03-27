document.addEventListener('DOMContentLoaded', () => {
  // 1. Elementlarni to'g'ri ID orqali topamiz
  const modal = document.querySelector('#registrationModal'); 
  const regForm = document.querySelector('#registrationForm');
  const phoneInput = document.querySelector('#phone');
  const closeModalBtn = document.querySelector('#closeModalBtn');
  
  const scriptURL = 'https://script.google.com/macros/s/AKfycbxjg-a3rcf39G4sfRjJXAkvA9-zfmBVFBnDcKMGpxqvi37OFf6qnSDigb0-MFoO-OuEjg/exec';

  // 2. Barcha "open" ID li tugmalarni topish va modalni ochish
  document.querySelectorAll('#open').forEach(btn => {
    btn.onclick = e => {
      e.preventDefault();
      if (modal) {
        modal.style.display = 'block'; // 'active' klassi o'rniga display ishlatamiz
        document.body.style.overflow = 'hidden';
      }
    };
  });

  // 3. Modalni yopish funksiyasi
  const closeModal = () => {
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  };

  if (closeModalBtn) closeModalBtn.onclick = closeModal;

  // Modal tashqarisiga bosganda yopish
  window.onclick = e => {
    if (e.target.classList.contains('homeModalOverlay')) closeModal();
  };

  // 4. Telefon formatlash (90 123 45 67 ko'rinishida)
  if (phoneInput) {
    phoneInput.oninput = e => {
      let val = e.target.value.replace(/\D/g, '');
      let res = '';
      if (val.length > 0) res = val.substring(0, 2);
      if (val.length > 2) res += ' ' + val.substring(2, 5);
      if (val.length > 5) res += ' ' + val.substring(5, 7);
      if (val.length > 7) res += ' ' + val.substring(7, 9);
      e.target.value = res;
    };
  }

  // 5. Formani yuborish
  if (regForm) {
    regForm.onsubmit = e => {
      e.preventDefault();
      const submitBtn = regForm.querySelector('#submitBtn');
      submitBtn.disabled = true;
      submitBtn.innerText = 'Yuborilmoqda...';

      const formData = new FormData();
      formData.append('name', document.querySelector('#name').value);
      formData.append('phone', "+998 " + phoneInput.value);

      fetch(scriptURL, { method: 'POST', body: formData, mode: 'no-cors' })
        .then(() => {
          window.location.href = 'thankYou.html';
        })
        .catch(() => {
          // Xatolik bo'lsa ham thankYou sahifasiga o'tish (no-cors tufayli)
          window.location.href = 'thankYou.html';
        });
    };
  }
});

// Taymer kodi (bu qismi to'g'ri)
const totalSeconds = 2 * 60 + 59;
const displayMin = document.querySelector('#minutes');
const displaySec = document.querySelector('#seconds');

if (displayMin && displaySec) {
    let timer = totalSeconds;
    setInterval(() => {
        let m = parseInt(timer / 60, 10);
        let s = parseInt(timer % 60, 10);
        displayMin.textContent = m < 10 ? '0' + m : m;
        displaySec.textContent = s < 10 ? '0' + s : s;
        if (--timer < 0) timer = 0;
    }, 1000);
}