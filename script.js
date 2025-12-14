const users = {
 prince:"prince@123",
 sukhdev:"sukh@123",
 harsh:"harsh@123",
 meet:"meet@123",
 bhumi:"bhumi@123"
};

const bc = new BroadcastChannel("secure-chat");

function encrypt(t){return btoa(t.split('').reverse().join(''))}
function decrypt(t){return atob(t).split('').reverse().join('')}

function login(){
 if(users[uid.value]===pwd.value){
  localStorage.setItem("me",uid.value);
  location.href="users.html";
 }else err.innerText="Wrong Login";
}

const me = localStorage.getItem("me");
const chatWith = localStorage.getItem("chatWith");

if(document.getElementById("users")){
 Object.keys(users).forEach(u=>{
  if(u!==me){
   let d=document.createElement("div");
   d.innerText=u;
   d.onclick=()=>{localStorage.setItem("chatWith",u);location.href="chat.html";}
   usersDiv.appendChild(d);
  }
 });
}

if(chatWith){
 name.innerText=chatWith;
 load();
}

function send(){
 let text=msg.value;
 if(!text)return;
 let data=JSON.parse(localStorage.getItem("msgs")||"[]");
 data.push({from:me,to:chatWith,msg:encrypt(text)});
 localStorage.setItem("msgs",JSON.stringify(data));
 bc.postMessage("new");
 msg.value="";
 load();
}

function load(){
 chatBox.innerHTML="";
 let data=JSON.parse(localStorage.getItem("msgs")||"[]");
 data.forEach(m=>{
  if((m.from===me && m.to===chatWith)||(m.from===chatWith && m.to===me)){
   let d=document.createElement("div");
   d.className="msg "+(m.from===me?"me":"");
   d.innerText=decrypt(m.msg);
   chatBox.appendChild(d);
  }
 });
 chatBox.scrollTop=chatBox.scrollHeight;
}

bc.onmessage=()=>load();