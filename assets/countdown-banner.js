/* =============================================
   COUNTDOWN BANNER JS — Dawn Theme
   ============================================= */

function initCountdown(timerEl, endDateStr, startDateStr) {
  if (!timerEl) return;

  var now       = new Date();
  var startDate = startDateStr ? new Date(startDateStr) : null;
  var endDate   = endDateStr   ? new Date(endDateStr)   : null;

  if (!endDate || isNaN(endDate.getTime())) return;

  var bannerSection = timerEl.closest('.countdown-banner');

  if (startDate && !isNaN(startDate.getTime()) && now < startDate) {
    if (bannerSection) bannerSection.style.display = 'none';
    return;
  }

  if (now >= endDate) {
    showExpired(timerEl);
    return;
  }

  var daysEl    = timerEl.querySelector('[data-unit="days"]');
  var hoursEl   = timerEl.querySelector('[data-unit="hours"]');
  var minutesEl = timerEl.querySelector('[data-unit="minutes"]');
  var secondsEl = timerEl.querySelector('[data-unit="seconds"]');

  function pad(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function flipCard(el, newVal) {
    if (!el) return;
    if (el.textContent === newVal) return;
    var card = el.closest('.cb-card');
    el.textContent = newVal;
    if (card) {
      card.classList.remove('cb-flip');
      void card.offsetWidth;
      card.classList.add('cb-flip');
    }
  }

  function tick() {
    var remaining = endDate - new Date();
    if (remaining <= 0) {
      showExpired(timerEl);
      return;
    }

    var days    = Math.floor(remaining / (1000 * 60 * 60 * 24));
    var hours   = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    flipCard(daysEl,    pad(days));
    flipCard(hoursEl,   pad(hours));
    flipCard(minutesEl, pad(minutes));
    flipCard(secondsEl, pad(seconds));
  }

  tick();

  // Limpiar interval previo si existe (importante en reloads del customizer)
  if (timerEl._countdownInterval) {
    clearInterval(timerEl._countdownInterval);
  }
  timerEl._countdownInterval = setInterval(tick, 1000);
}

function showExpired(timerEl) {
  if (timerEl._countdownInterval) {
    clearInterval(timerEl._countdownInterval);
  }
  timerEl.innerHTML = '<p class="cb-expired-msg">¡La oferta ha finalizado!</p>';
}

// Esperar a que el DOM esté completamente listo
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.countdown-banner').forEach(function (section) {
    var timerEl   = section.querySelector('[id^="cb-timer-"]');
    var endDate   = section.getAttribute('data-end-date');
    var startDate = section.getAttribute('data-start-date');
    if (timerEl) {
      initCountdown(timerEl, endDate, startDate);
    }
  });
});