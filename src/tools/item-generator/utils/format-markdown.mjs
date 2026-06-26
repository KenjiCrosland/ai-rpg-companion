/**
 * Minimal, XSS-safe inline markdown → HTML for Lore Builder prose.
 *
 * Escapes the source first (so any raw HTML in AI output is inert), then
 * applies bold (`**…**`) and italic (`*…*`). Shared by LoreBuilderTab and
 * its LoreSummonCard preview so the two render event prose identically.
 */
export function formatMarkdown(text) {
  if (!text) return text;

  const div = document.createElement('div');
  div.textContent = text;
  let html = div.innerHTML;

  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  return html;
}
