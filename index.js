"use strict";

// Get dom elements
var navbarProfile = document.getElementById("navbar__profile");
var heroProfile = document.getElementById("hero__profile");
var grid = document.querySelector(".grid"); // Categories for pexels api

var categories = ["bosque", "mexico", "playa", "tundra", "pizza"]; // Get user image from github api

fetch("https://api.github.com/users/luisfalconmx").then(function (response) {
  return response.json();
}).then(function (data) {
  navbarProfile.style.backgroundImage = "url('".concat(data.avatar_url, "')");
  heroProfile.style.backgroundImage = "url('".concat(data.avatar_url, "')");
}); // Print images in grid

fetch("https://api.pexels.com/v1/search?query=".concat(categories[Math.floor(Math.random() * categories.length)]), {
  headers: {
    Authorization: "563492ad6f91700001000001917f4472446847cdb73382c8069c4ec2"
  }
}).then(function (resp) {
  return resp.json();
}).then(function (data) {
  data.photos.forEach(function (photo) {
    grid.innerHTML += "<img class=\"grid__image\" src=\"".concat(photo.src.large, "\" alt=\"\" />");
  });
});