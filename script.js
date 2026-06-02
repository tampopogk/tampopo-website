(() => {
  const year = document.querySelector("[data-year]");
  if (year) {
    year.textContent = new Date().getFullYear().toString();
  }

  const button = document.querySelector("[data-contact-button]");
  const status = document.querySelector("[data-contact-status]");

  if (!button) {
    return;
  }

  const parts = {
    local: ["ad", "min"],
    domain: ["tampopo", "myoko"],
    tld: "com"
  };

  const buildAddress = () => {
    const local = parts.local.join("");
    const domain = parts.domain.join("");
    return `${local}@${domain}.${parts.tld}`;
  };

  button.addEventListener("click", () => {
    const address = buildAddress();
    const subject = encodeURIComponent("Tampopo LLC inquiry");
    window.location.href = `mailto:${address}?subject=${subject}`;

    if (status) {
      status.textContent = "メール作成画面を開きます。 / Opening your email client.";
    }
  });
})();
