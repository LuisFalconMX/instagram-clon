// Get dom elements
const navbarProfile = document.getElementById("navbar__profile");
const heroProfile = document.getElementById("hero__profile");
const grid = document.querySelector(".grid");

// Categories for pexels api
const categories = ["bosque", "mexico", "playa", "tundra", "pizza"];

// Get user image from github api
fetch("https://api.github.com/users/luisfalconmx")
  .then((response) => response.json())
  .then((data) => {
    navbarProfile.style.backgroundImage = `url('${data.avatar_url}')`;
    heroProfile.style.backgroundImage = `url('${data.avatar_url}')`;
  });

// Print images in grid
fetch(
  `https://api.pexels.com/v1/search?query=${
    categories[Math.floor(Math.random() * categories.length)]
  }`,
  {
    headers: {
      Authorization: "563492ad6f91700001000001917f4472446847cdb73382c8069c4ec2",
    },
  }
)
  .then((resp) => resp.json())
  .then((data) => {
    data.photos.forEach((photo) => {
      grid.innerHTML += `<img class="grid__image" src="${photo.src.medium}" alt="" />`;
    });
  });
