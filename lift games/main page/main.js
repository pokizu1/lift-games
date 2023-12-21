function openNav() {
  document.getElementById("mySidebar").style.width = "250px";

}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}

function loginopen() {
  document.getElementById("loginopen").style.display = "block";
  document.getElementById("signupopen").style.display = "none";
}
function loginclose() {
  document.getElementById("loginopen").style.display = "none";
}

function signupopen() {
  document.getElementById("signupopen").style.display = "block";
  document.getElementById("loginopen").style.display = "none";
}
function signupclose() {
  document.getElementById("signupopen").style.display = "none";
}