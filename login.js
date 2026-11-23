import {auth,isConfigured} from "./firebase.js";
import {signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
const form=document.getElementById("login-form"),msg=document.getElementById("form-message");
form.addEventListener("submit",async e=>{e.preventDefault();msg.textContent="";
if(!isConfigured){msg.textContent="Firebase is not connected. Add your project configuration in js/firebase.js first.";return}
const d=new FormData(form),button=form.querySelector("button");button.disabled=true;button.textContent="Logging in…";
try{await signInWithEmailAndPassword(auth,String(d.get("email")).trim().toLowerCase(),String(d.get("password")));window.location.href="dashboard.html"}
catch(err){const map={"auth/invalid-credential":"Email or password is incorrect.","auth/user-not-found":"No account was found with this email.","auth/too-many-requests":"Too many attempts. Please wait and try again."};msg.textContent=map[err.code]||"Unable to log in. Check your details and try again.";button.disabled=false;button.textContent="Log in →"}
});