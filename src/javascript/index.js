const navbarProfile = document.getElementById("navbar__profile");
const heroProfile = document.getElementById("hero__profile");

fetch("https://api.github.com/users/luisfalconmx")
  .then((response) => response.json())
  .then((data) => {
    navbarProfile.style.backgroundImage = `url('${data.avatar_url}')`;
    heroProfile.style.backgroundImage = `url('${data.avatar_url}')`;
  });
