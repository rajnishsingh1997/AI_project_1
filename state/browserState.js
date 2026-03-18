let page = null;

export function setPage(p) {
  page = p;
}

export function getPage() {
  if (!page) {
    throw new Error("Browser not initialized. Call openBrowser first.");
  }
  return page;
}