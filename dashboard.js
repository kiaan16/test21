import {auth,db,isConfigured} from "./firebase.js";
import {onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {doc,getDoc} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
const roles={
donor:{label:"Food Donor",icon:"♧",title:"Your food can make a difference.",description:"Share safe surplus food with people and organisations in your community.",next:"Food listings, collection details, photo uploads and donation tracking are the next donor tools."},
receiver:{label:"Receiver",icon:"♡",title:"Find food shared by your community.",description:"View available food announcements and share feedback about collection experiences.",next:"Nearby food announcements, collection information, ratings and reporting are the next receiver tools."},
distributor:{label:"Distributor",icon:"⇢",title:"Help food reach more people.",description:"Coordinate collection and delivery with donors and food organisations.",next:"Distribution requests, donor approval, delivery records and handover confirmation are the next tools."},
organisation:{label:"Food Organisation",icon:"✳",title:"Coordinate support at community level.",description:"Coordinate beneficiaries, volunteers and food distribution activities.",next:"Organisation verification, team coordination and distribution management are the next tools."}};
document.getElementById("logout-button").addEventListener("click",async()=>{if(auth)await signOut(auth);location.href="index.html"});
if(!isConfigured){document.getElementById("user-name").textContent="Firebase setup required";document.getElementById("role-title").textContent="Connect your Firebase project";document.getElementById("role-description").textContent="Add your Firebase web configuration in js/firebase.js, then enable Authentication and Firestore."}
else onAuthStateChanged(auth,async user=>{if(!user){location.href="login.html";return}
document.getElementById("user-name").textContent=user.email||"Signed in";document.getElementById("profile-email").textContent=user.email||"—";
try{const snap=await getDoc(doc(db,"users",user.uid));if(!snap.exists()){document.getElementById("role-title").textContent="Account profile not found";return}
const p=snap.data(),r=roles[p.role]||roles.receiver,name=p.fullName||user.displayName||"there";
document.getElementById("welcome-name").textContent=name.split(" ")[0];document.getElementById("profile-name").textContent=name;document.getElementById("profile-phone").textContent=p.phone||"—";document.getElementById("profile-area").textContent=p.area||"—";document.getElementById("profile-role").textContent=r.label;document.getElementById("role-chip").textContent=r.label;document.getElementById("role-icon").textContent=r.icon;document.getElementById("role-title").textContent=r.title;document.getElementById("role-description").textContent=r.description;document.getElementById("next-copy").textContent=r.next;
}catch(e){document.getElementById("role-description").textContent="We could not load your profile. Refresh the page and try again."}
});