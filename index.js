"use strict";

var navbarProfile = document.getElementById("navbar__profile");
var heroProfile = document.getElementById("hero__profile");
fetch("https://api.github.com/users/luisfalconmx").then(function (response) {
  return response.json();
}).then(function (data) {
  navbarProfile.style.backgroundImage = "url('".concat(data.avatar_url, "')");
  heroProfile.style.backgroundImage = "url('".concat(data.avatar_url, "')");
});