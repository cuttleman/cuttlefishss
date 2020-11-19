const cuttleItems = document.querySelectorAll(".cuttleItem");

const modal = (top, left) => {
  const modalEl = document.getElementById("jsModal");
  modalEl.classList.add("show");
  modalEl.style.top = `${top - 7}px`;
  modalEl.style.left = `${left - 13}px`;
  setTimeout(() => modalEl.classList.remove("show"), 800);
};

const handleClick = (e) => {
  let {
    outerHTML: copyHTML,
    offsetTop,
    offsetLeft,
    localName,
  } = e.currentTarget;
  if (localName == "code") {
    const LINKTAG =
      "<link rel='stylesheet' href='https://Front-Juno.github.io/cuttlefishss/cuttlefish.min.css'>";
    navigator.clipboard.writeText(LINKTAG).then(() => {
      return modal(offsetTop, offsetLeft);
    });
  } else {
    copyHTML = copyHTML.replace(" cuttleItem", "");
    navigator.clipboard.writeText(copyHTML).then(() => {
      return modal(offsetTop, offsetLeft);
    });
  }
};

cuttleItems.forEach((item) => {
  item.addEventListener("click", handleClick);
});
