const navs = document.querySelectorAll(".nav__item");
const header = document.querySelector("header");
const startSection = document.getElementById("start");
const buttonSection = document.getElementById("button");
const cardSection = document.getElementById("card");

const START = "start";
const BUTTON = "button";
const CARD = "card";

const ACTIVE = "active";
const HOVER = "hover";

const validatedSection = (sections, name) => {
  Object.values(sections).map((section) => {
    const lowerText = String(section.innerText).toLocaleLowerCase();
    if (lowerText === name) {
      section.classList.add(ACTIVE);
    } else {
      section.classList.remove(ACTIVE);
    }
  });
};

const handleNavClick = (e) => {
  const targetText = e.currentTarget.innerText.toLowerCase();
  const targetEl = document.getElementById(targetText);
  const LOCATION = targetEl.offsetTop;
  const HEADERHEIGHT = header.clientHeight;
  window.scrollTo({
    top: LOCATION - (HEADERHEIGHT + 30),
    left: 0,
    behavior: "smooth",
  });
};

const handleNavMouseEvent = (e) => {
  const target = e.currentTarget;
  target.classList.add(HOVER);
  target.addEventListener("mouseleave", () => {
    target.classList.remove(HOVER);
  });
};

const handleScroll = () => {
  const HALFOFWINDOW = window.innerHeight / 2;
  if (
    Math.floor(window.scrollY) > 0 &&
    Math.floor(window.scrollY) <= buttonSection.offsetTop - HALFOFWINDOW
  ) {
    validatedSection(navs, START);
  } else if (
    Math.floor(window.scrollY) > buttonSection.offsetTop - HALFOFWINDOW &&
    Math.floor(window.scrollY) <= cardSection.offsetTop - HALFOFWINDOW
  ) {
    validatedSection(navs, BUTTON);
  } else if (
    Math.floor(window.scrollY) >
    cardSection.offsetTop - HALFOFWINDOW
  ) {
    validatedSection(navs, CARD);
  }
};

const init = () => {
  validatedSection(navs, START);

  navs.forEach((nav) => {
    nav.addEventListener("click", handleNavClick);
    nav.addEventListener("mouseover", handleNavMouseEvent);
  });

  window.addEventListener("scroll", handleScroll);
};

init();
