const mainLogo = document.querySelector(".logo");

const handleLogoClick = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
};

mainLogo.addEventListener("click", handleLogoClick);
