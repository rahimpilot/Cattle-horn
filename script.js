// Cattle Horn — small interactions only. No booking is created here;
// reservations go to OpenTable, directions to Google Maps.
(function () {
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function () {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  // Occasion picker -> suggested note to mention when booking.
  // Wording is a request only, never a promise of a private room.
  var notes = {
    birthday: "\u201CWe're celebrating a birthday \u2014 if possible, we'd love a gathering table near the fireplace.\u201D",
    anniversary: "\u201CWe're celebrating an anniversary \u2014 if possible, we'd love a quiet corner table for two.\u201D",
    candlelight: "\u201CWe're planning a candle-light dinner \u2014 if possible, we'd love a candlelit evening table.\u201D",
    gathering: "\u201CWe're gathering with family and friends \u2014 if possible, we'd love a patio table in season, or a bar table for cocktails.\u201D"
  };
  var noteEl = document.getElementById('booking-note-text');
  var cards = document.querySelectorAll('.occasion-card');
  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      cards.forEach(function (c) {
        c.classList.remove('is-active');
        c.setAttribute('aria-pressed', 'false');
      });
      card.classList.add('is-active');
      card.setAttribute('aria-pressed', 'true');
      var key = card.getAttribute('data-occasion');
      if (noteEl && notes[key]) noteEl.textContent = notes[key];
    });
  });

  // Copy the suggested note
  var copyBtn = document.getElementById('copy-note');
  var statusEl = document.getElementById('copy-status');
  if (copyBtn && noteEl) {
    copyBtn.addEventListener('click', async function () {
      var text = noteEl.textContent;
      try {
        await navigator.clipboard.writeText(text);
        if (statusEl) statusEl.textContent = 'Copied \u2014 paste it into your reservation note or mention it when you call.';
      } catch (e) {
        if (statusEl) statusEl.textContent = 'Copy did not work in this browser \u2014 please select the note text above and copy it manually.';
      }
    });
  }
})();
