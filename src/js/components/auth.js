//imports
import refs from './refs';
import firebase from "firebase/app";
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import "firebase/auth";
//const
const { alert } = require('@pnotify/core');
const firebaseConfig = {
apiKey: "AIzaSyBsh1sTBXWGmCNayKn94Jdm8L4dd8oBEh8",
    authDomain: "team-project-js.firebaseapp.com",
    projectId: "team-project-js",
    storageBucket: "team-project-js.appspot.com",
    messagingSenderId: "141999361293",
    appId: "1:141999361293:web:2dd5006750ae334e40f444"
};
firebase.initializeApp(firebaseConfig);

refs.authOpenBtn.addEventListener('click', openAuthnModal);
refs.logOutBtn.addEventListener('click', logOut);


function openAuthnModal() {
    
    createModal(getAuthForm())
    //refs
    refs.authModal.classList.remove('invisible');
    refs.body.classList.add('no-scroll');

    //const
  const authForm = document.querySelector('.authorization__form');
 
 
    //listeners
    refs.authModal.addEventListener('click', closeAuthModalOnBackdrop);
    window.addEventListener('keydown', closeAuthModalOnEsc);
    refs.authCloseBtn.addEventListener('click', closeAuthModal);
    authForm.addEventListener('submit', authFormHeandler, { once: true });
    

}
//modal functions
function createModal(func) {
       refs.authContainerForHTML.insertAdjacentHTML('beforeend', func)
}
function closeAuthModalOnEsc(event) {
  if (event.key !== 'Escape') return;
  closeAuthModal();
}
function closeAuthModalOnBackdrop(event) {
    if (event.target === event.currentTarget) {
        closeAuthModal();
  }
}
function cleanAuthModal(authForm) {
  refs.authContainerForHTML.removeChild(authForm)
}
function closeAuthModal() {
    const authForm = document.querySelector('.authorization__form');
    cleanAuthModal(authForm)
    refs.authModal.classList.add('invisible');
    window.removeEventListener('keydown', closeAuthModalOnEsc);
    window.removeEventListener('click', closeAuthModalOnBackdrop);
    refs.body.classList.remove('no-scroll');    
}
function getAuthForm() {
    const authContent = `
               <form class="authorization__form">
                    <label class="authorization__form-label">Email
            <input type="email" name="user-mail" class="authorization__form-input" id="email" required>
              </label>

              <label class="authorization__form-label">Password
                <input type="password" name="user-password" class="authorization__form-input" id="password" autocomplete="on">
              </label>
    
          <div class="authorization__submit-container">
            <button type="submit" class="authorization__login-btn">Log In</button>
            <button type="submit" class="authorization__registration-btn">Sign Up</button>

            </div>
        </form>`;
    return authContent;
}

//heandler for form
function authFormHeandler(event) {
    event.preventDefault()
    const email = event.target.querySelector('#email').value;
    const password = event.target.querySelector('#password').value;
    const authSignUpBtn = document.querySelector('.authorization__registration-btn');
    const authLoginBtn = document.querySelector('.authorization__login-btn');
    authSignUpBtn.addEventListener('click', createNewUser(email, password, event));
    authLoginBtn.addEventListener('click', loginUser(email, password, event))
}

//sign up function
function createNewUser(email, password, event) {
  if (event.submitter.className !== 'authorization__registration-btn') {
          return
  } else {
    firebase.auth()
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      if (cred.user.uid) {
        successfulSignUp()
        closeAuthModal()
        refs.logOutBtn.classList.remove('hide');
        refs.authOpenBtn.classList.add('hide');

      }
    })
    .catch(function (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        weakPassword()
        closeAuthModal()
      } else {
        errorAlert(errorMessage)
        closeAuthModal()
      }
      console.log(error);
    });
}}

//login func
function loginUser(email, password, event) {
  if (event.submitter.className !== 'authorization__login-btn') return
  else {
    firebase.auth().signInWithEmailAndPassword(email, password).then(cred => {
      if (cred.user.isAnonymous === false) {
        successfulLogIn()
        closeAuthModal()
        refs.logOutBtn.classList.remove('hide');
        refs.authOpenBtn.classList.add('hide');
      }
    })
    .catch(function(error) {
  // Handle Errors here.
  const errorCode = error.code;
  const errorMessage = error.message;
  if (errorCode === 'auth/wrong-password') {
    alert('Wrong password.');
    closeAuthModal()
  } else {
    errorAlert(errorMessage);
    closeAuthModal()
  }
  console.log(error);
});
 } 
}

//logout func
function logOut() {
  firebase.auth().signOut().then(function () {
    refs.logOutBtn.classList.add('hide');
    refs.authOpenBtn.classList.remove('hide');
   loggedout()
}, function(error) {
  errorAlert(error.code);
   errorAlert(error.message);
});
}


//notify
function successfulSignUp() {
   alert({
  text: "Sign Up is successful!",
  type: 'success'
   });
}
function weakPassword() {
   alert({
  text: "The password is too weak.",
  type: 'error'
   });
}
function errorAlert(errorMessage) {
  alert({
  text: `${errorMessage}`,
  type: 'error'
   });
}
function successfulLogIn() {
  alert({
  text: "Log In is successful!",
  type: 'success'
   });
}
function loggedout() {
  alert({
    text: "You are logged out!",
    type: 'success'
  })
};