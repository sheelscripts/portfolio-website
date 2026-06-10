// Inline script injected into <head> to set data-theme before paint.
// Prevents the dark/light flash on first load.
// Stored on localStorage; defaults to system prefers-color-scheme.

export const themeBootstrapScript = `
(function () {
  try {
    var stored = localStorage.getItem('sheeldn-theme');
    var system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var theme = stored === 'dark' || stored === 'light' ? stored : system;
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`.trim();
