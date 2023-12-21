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


const signupbutton = document.querySelector(".signupbutton")
const SignUpUserName = document.querySelector(".SignUpUserName")
const SignUpPassword = document.querySelector(".SignUpPassword")
function PostData(username, password){

const body = {


  username : username,
  password:password

}

fetch(`https://localhost:7272/api/user`,{

method: "POST",
headers: {

  'Content-Type': 'application/json'
},
body: JSON.stringify(body)


}).then(resp => resp.json()).then(data => console.log(data))


}
signupbutton.addEventListener("click", ()=> {

if (SignUpUserName.value != "" || SignUpPassword.value != "") {
  PostData(SignUpUserName.value, SignUpPassword.value)
}


})


const loginbutton = document.querySelector(".LogInButton");
const loginUserName = document.querySelector(".LoginUserName");
const loginPassword = document.querySelector(".LoginPasswrod");

function GetData() {
  fetch(`https://localhost:7272/api/user`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(resp => resp.json())
  .then(data => {
    // Check if fetched data is equal to login input value
    let isLoggedIn = false;

    data.forEach(element => {
      if (loginUserName.value === element.username && loginPassword.value === element.password) {
        alert("Logged In Successfully");
        // Set the username in local storage
        localStorage.setItem("UserName", element.username);
        isLoggedIn = true;
        // Break out of the loop since we found a match
        return;
      }
    });

    if (!isLoggedIn) {
      alert("Login Failed. Please check your username and password.");
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    // Handle error, e.g., display an error message to the user
    alert('Error fetching data. Please try again.');
  });
}

// Assuming loginbutton is the button element triggering the login attempt
loginbutton.addEventListener("click", () => {
  GetData();
});
  
  
 
