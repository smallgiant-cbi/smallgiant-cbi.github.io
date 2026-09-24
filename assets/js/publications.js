(function () {
  'use strict';

  var page = document.querySelector('[data-publications-page]');
  if (!page) return;

  var buttons = Array.prototype.slice.call(page.querySelectorAll('[data-publication-filter]'));
  var sections = Array.prototype.slice.call(page.querySelectorAll('[data-publication-section]'));
  var status = page.querySelector('[data-publication-status]');
  var validFilters = buttons.map(function (button) {
    return button.getAttribute('data-publication-filter');
  });

  function setFilter(filter, updateUrl) {
    if (validFilters.indexOf(filter) === -1) filter = 'all';

    buttons.forEach(function (button) {
      var isActive = button.getAttribute('data-publication-filter') === filter;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    sections.forEach(function (section) {
      section.hidden = filter !== 'all' && section.getAttribute('data-publication-section') !== filter;
    });

    if (status) {
      var activeButton = buttons.filter(function (button) {
        return button.getAttribute('data-publication-filter') === filter;
      })[0];
      status.textContent = filter === 'all' ? 'Showing all publications.' : 'Showing ' + activeButton.textContent.trim() + '.';
    }

    if (updateUrl && window.history && window.history.replaceState) {
      var url = new URL(window.location.href);
      if (filter === 'all') url.searchParams.delete('type');
      else url.searchParams.set('type', filter);
      window.history.replaceState({}, '', url.pathname + url.search + url.hash);
    }
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      setFilter(button.getAttribute('data-publication-filter'), true);
    });
  });

  setFilter(new URLSearchParams(window.location.search).get('type') || 'all', false);
}());
