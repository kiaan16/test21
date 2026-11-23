import {auth,db,isConfigured} from "./firebase.js";
import {createUserWithEmailAndPassword,updateProfile} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {doc,setDoc,serverTimestamp} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
const form=document.getElementById("register-form"), role=document.getElementById("role"), org=document.getElementById("organisation-fields"), msg=document.getElementById("form-message");
role.addEventListener("change",()=>{org.hidden=role.value!=="organisation";org.querySelectorAll("input,select").forEach(x=>x.required=role.value==="organisation")});
form.addEventListener("submit",async e=>{e.preventDefault();msg.className="message";msg.textContent="";
if(!isConfigured){msg.textContent="Firebase is not connected. Add your project configuration in js/firebase.js first.";return}
const d=new FormData(form), button=form.querySelector("button");button.disabled=true;button.textContent="Creating account…";
try{
const fullName=String(d.get("fullName")).trim(), email=String(d.get("email")).trim().toLowerCase(), roleValue=String(d.get("role"));
if(!["donor","receiver","distributor","organisation"].includes(roleValue))throw new Error("Select a valid account type.");
const cred=await createUserWithEmailAndPassword(auth,email,String(d.get("password")));
await updateProfile(cred.user,{displayName:fullName});
const profile={uid:cred.user.uid,fullName,email,phone:String(d.get("phone")).trim(),area:String(d.get("area")).trim(),role:roleValue,accountStatus:"pending",createdAt:serverTimestamp()};
if(roleValue==="organisation"){profile.organisationName=String(d.get("organisationName")||"").trim();profile.organisationType=String(d.get("organisationType")||"").trim()}
await setDoc(doc(db,"users",cred.user.uid),profile);window.location.href="dashboard.html";
}catch(err){const map={"auth/email-already-in-use":"An account already exists with this email. Please log in.","auth/invalid-email":"Enter a valid email address.","auth/weak-password":"Choose a stronger password.","auth/network-request-failed":"Network error. Check your connection."};msg.textContent=map[err.code]||err.message||"Could not create your account. Please try again.";button.disabled=false;button.textContent="Create account →"}
});