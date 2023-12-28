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
  document.getElementById("accountmistake").style.display = "none";
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

 return fetch(`https://localhost:7272/api/user`,{
   method: "POST",
   headers: {
     'Content-Type': 'application/json'
   },
   body: JSON.stringify(body)
 }).then(resp => {
   if (!resp.ok) {
     throw new Error('HTTP error ' + resp.status);
   }
   return resp.json();
 })
}

signupbutton.addEventListener("click", ()=> {
 if (SignUpUserName.value != "" || SignUpPassword.value != "") {
   PostData(SignUpUserName.value, SignUpPassword.value)
     .then(data => {
       document.getElementById("signupdone").style.display = "block";
       document.getElementById("signuperror").style.display = "none";
       document.querySelector(".signupbutton").style.display="none";
     })
     .catch(error => {
       document.getElementById("signuperror").style.display = "block";
     });
 }
});


//sign up end
//sign up end
//sign up end

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
        if (isLoggedIn == true) {
            document.getElementById("loginopen").style.display = "none";
        document.getElementById("loginit").style.display="none";
        document.getElementById("accounts").style.display="block";
        document.getElementById("AccountUserName").innerHTML = localStorage.getItem("UserName");
        }

      
        // Break out of the loop since we found a match
        
        
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

window.onload = function() {
 const loggedInUser = localStorage.getItem("UserName");
 if (loggedInUser) {
   // Hide login elements
   document.getElementById("loginopen").style.display = "none";
   document.getElementById("loginit").style.display="none";
   // Show account elements
   document.getElementById("accounts").style.display="block";
   document.getElementById("AccountUserName").innerHTML = loggedInUser;
 }
}

function accountsopen() {
  document.getElementById("accountmistake").style.display = "block";
}


function logout() {
 localStorage.removeItem("UserName");
 window.location.reload();
}




fetch(`https://localhost:7272/api/games/`, {
 method: "GET",
})
.then(response => response.json())
.then(data => {
 let gameData = data;
 console.log(gameData);

 for (let i = 0; i < gameData.length; i++) {
 let game = gameData[i];
 console.log(game.gamename);

 const markup = `
 <div class="box">
 <a href=""><img src="${game.mainimg}" alt=""></a>
 <a href=""><h2>${game.gamename}</h2></a>
 </div>
 
 `;

 // Select each box individually
 let box = document.querySelector('.games .box:nth-child(' + (i+1) + ')');
 if(box) {
  box.innerHTML = markup;
 } else {
  break;
 }
 }
})
.catch(error => console.error('Error:', error));




fetch(`https://localhost:7272/api/games/`, {
 method: "GET",
})
.then(response => response.json())
.then(data => {
 let gameData = data;
 let popularBoxContainer = document.querySelector('.populargames');

 for (let i = 0; i < gameData.length; i++) {
   let game = gameData[i];

   const markup = `
     <div class="popularbox">
       <a href=""><img src="${game.miniimg}" alt=""></a>
       <a href=""><h3>${game.gamename}</h3></a>
     </div>
   `;

   popularBoxContainer.insertAdjacentHTML('beforeend', markup);
 }
})
.catch(error => console.error('Error:', error));



document.getElementById('fname').addEventListener('keyup', searchFunction);

function searchFunction() {
 var input = document.getElementById('fname');
 var filter = input.value.toUpperCase();
 var ul = document.querySelector(".games");
 var li = ul.getElementsByTagName("div");

 // Loop through all list items, and hide those who don't match the search query
 for (var i = 0; i < li.length; i++) {
   var txtValue = li[i].textContent || li[i].innerText;
   if (txtValue.toUpperCase().indexOf(filter) > -1) {
     li[i].style.display = "";
   } else {
     li[i].style.display = "none";
   }
 }
}

fetch(`https://localhost:7272/api/games/`, {
 method: "GET",
})
.then(response => response.json())
.then(data => {
 let gameData = data;
 console.log(gameData);

 gameData.forEach(game => {
   console.log(game.gamename);

   const markup = `

<div class="gameroomsec">
<div class="gameroom">
<h1>${game.gamename}</h1>
<div class="dammit">
<p></p>
</div>
<h1>About The Game</h1>
<h5>${game.about}</h5>
<div class="dammit">
<img src="${game.mainimg}" alt="">
</div>
<h1>${game.gamename} download</h1>
<div class="dammit">
<a href="${game.download}" ><button >Download</button></a> 
</div>
<h4><b>size:</b>${game.size} <s>GB</s></h4>
<h2>System Requirements</h2>
<h3><b>OS:</b> Windows 7+</h3>
<h3><b>Processor:</b> Intel i5+</h3>
<h3><b>Memory:</b> 2 GB RAM</h3>
<h3><b>Graphics:</b> Nvidia 450 GTS / Radeon HD 5750 or better</h3>
<h3><b>Storage:</b> 500 MB available space</h3>
<h3><b>Additional Notes:</b> DirectX 9.1+ or OpenGL 3.2+</h3>

<h2>Screenshots</h2>
<div class="gameroomflex">
<img src="${game.screenshot1}" alt="">
<img src="${game.screenshot1}" alt="">
</div>
</div>
</div>
   
   `;
   document.querySelector(".gameroom").insertAdjacentHTML('beforeend', markup);
 });
})
.catch(error => console.error('Error:', error));