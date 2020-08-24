const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");

const loginCheck = (user) => {
  if (user) {
    loggedInLinks.forEach((link) => (link.style.display = "block"));
    loggedOutLinks.forEach((link) => (link.style.display = "none"));
  } else {
    loggedInLinks.forEach((link) => (link.style.display = "none"));
    loggedOutLinks.forEach((link) => (link.style.display = "block"));
  }
};

// SignUp
const signUpForm = document.querySelector("#signup-form");
signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signUpForm["signup-email"].value;
  const password = signUpForm["signup-password"].value;
  if (email.length < 6) {
    alert('Please enter a valid email address.');
    return;
  }
  if (password.length < 6) {
    alert('Password length must be greater then 6.');
    return;
  }
  auth
  .createUserWithEmailAndPassword(email, password).then((userCredential) => {
    if(password.length==6)
    {
      alert("we recommmend you to increase your password length beyond 6  😄")
    }
     // clear the form 
    
      signUpForm.reset();
      // close the modal
      
        const jin=auth.currentUser;
        jin.sendEmailVerification().then(function() {
              // Email Verification sent!
              // [START_EXCLUDE]
              alert('Email Verification Sent! ✉️ ,please verify it 🖐');
              // [END_EXCLUDE]




            });
            // [END sendemailverification]
          



      $("#signupModal").modal("hide");
    








  })
  .catch(function(error) {
    // Handle Errors here.
    const errorCode = error.code;
    //var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/email-already-in-use') {
      alert('The email already in use in our database. 🔴');
      
    } 
    $("#signupModal").modal("hide");   
  });

});







// Logout
const logout = document.querySelector("#logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("signup out");
  });
});

// SingIn
const signInForm = document.querySelector("#login-form");

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signInForm["login-email"].value;
  const password = signInForm["login-password"].value;

  if (email.length < 4) {
    alert('Please enter correct email i.e. email used for signup.  🔴');
    return;
  }
  if (password.length < 4) {
    alert('Please enter  a valid password. 🔴');
    return;
  }

  // Authenticate the User
  auth.signInWithEmailAndPassword(email, password).then((userCredential) => {

    alert("Success full login ! 💚")
    // clear the form
    signInForm.reset();
    // close the modal
    $("#signinModal").modal("hide");
  }).catch(function(error) {
    // Handle Errors here.
    const errorCode = error.code;
    
    // [START_EXCLUDE]
    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
    } 
    $("#signinModal").modal("hide");
    document.getElementById('quickstart-sign-in').disabled = false;
    // [END_EXCLUDE]
  });
});


// Posts
const postList = document.querySelector(".posts");
const setupPosts = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const post = doc.data();
      const li = `
      <li class="list-group-item list-group-item-action">
        <h5>${post.title} 😃 </h5>
        <p>${post.description} 🔥</p>
      </li>
    `;
      html += li;
    });
    postList.innerHTML = html;
  } else {
    postList.innerHTML ='<h4 class="text-black">  Login to See Posts</h4>';
  }
};


// events
// list for auth state changes
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("signin");
    fs.collection("posts")
      .get()
      .then((snapshot) => {
        setupPosts(snapshot.docs);
        loginCheck(user);
      });
  } else {
    console.log("signout");
    setupPosts([]);
    loginCheck(user);
  }
});

//forgot password

const forgotpassword = document.querySelector("#forgot-password");
forgotpassword.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = forgotpassword["reset-email"].value;
  auth.sendPasswordResetEmail(email).then(function() {
    // Password Reset Email Sent!
    // [START_EXCLUDE]
    alert('Password Reset Email Sent!');
    // [END_EXCLUDE]
  $("#forgotpassword").modal("hide");


  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/invalid-email') {
      alert(errorMessage);
    } else if (errorCode == 'auth/user-not-found') {
      alert(errorMessage);
    }
    $("#forgotpassword").modal("hide");
    // [END_EXCLUDE]
  });
  
});











// Login with Google

/*
const googleButton = document.querySelector("#googleLogin");

googleButton.addEventListener("click", (e) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then((result) => {
    //console.log(result);
    var user = result.user;
    console.log("google sign in");
    //e.preventDefault();
    signInForm.reset();
    //Close modal
    $("#signinModal").modal("hide");
  })
  .catch(err => {
    console.log(err);
  })
});
*/

function googlelogin()
{

const provider =new firebase.auth.GoogleAuthProvider();
firebase.auth().signInWithPopup(provider).then(function(){
alert("done");

}).catch(function(error)
  {
const errormess=error.message;
alert(errormess);
  })

}
















// Login with Facebook
const facebookButton = document.querySelector('#facebookLogin');

facebookButton.addEventListener('click', e => {
  e.preventDefault();
  signInForm.reset();
  $("#signinModal").modal("hide");

  const provider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithPopup(provider).then((result) => {
    console.log(result);
    console.log("facebook sign in");
  })
  .catch(err => {
    console.log(err);
  })

})