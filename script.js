// Phone Chatting area
let chatInput = document.querySelector(".screen-input input")
let sendBtn = document.querySelector(".screen-input .send-btn")
let screenChatArea = document.querySelector(".screen")
let sender = "me"
let msgNum = 0

let myName = "(Not Set!)"
let hisName = "(Not Set!)"

let ImageChosenMe = localStorage.getItem("MyImage")
if (ImageChosenMe){
    document.querySelector(".sender-image-bottom img").setAttribute("src" , ImageChosenMe)
}
let ImageChosenHim = localStorage.getItem("HisImage")
if (ImageChosenHim){
    document.querySelector(".sender-image-bottom img").setAttribute("src" , ImageChosenHim)
}

if (localStorage.MyName != null){
    myName = JSON.parse(localStorage.MyName)
}
if (localStorage.HisName != null){
    hisName = JSON.parse(localStorage.HisName)
}

if (sender == "me") {
    document.querySelector(".sender-name").innerHTML = `Sender is: ${myName}`
    document.querySelector(".sender-image-bottom img").setAttribute("src" , ImageChosenMe)
}else {
    document.querySelector(".sender-name").innerHTML = `Sender is: ${hisName}`
    document.querySelector(".sender-image-bottom img").setAttribute("src" , imageUploadBoxHim)
}

window.onload = function () {
    screenChatArea.scrollTo(0, screenChatArea.scrollHeight)
}
let allMessages
if (localStorage.Messages != null)
    {allMessages = JSON.parse(localStorage.Messages)}
else
    {allMessages = [] ;}

    document.querySelector(".sender-me-name").innerHTML = myName
    document.querySelector(".sender-him-name").innerHTML = hisName
// -------------------------------------------------------------------------
// On load ( to get chat filled by localStorage )
for (let i = 0 ; i < allMessages.length ; i++){
    var currentMsg = JSON.parse(localStorage.Messages)
    if (currentMsg[i].sender == "me"){
        screenChatArea.innerHTML += (`
        <div class="message-container send">
            <div class="sender-image sender-me">
                <img src="${ImageChosenMe}" alt="">
            </div>
            <div class="msg-and-date">
            <h4 class="message">${currentMsg[i].msg}</h4>
            <p class="msg-date">${currentMsg[i].date}</p>
            </div>
        </div>
        `)
    }else if (currentMsg[i].sender == "him") {
        screenChatArea.innerHTML += (`
        <div class="message-container recieve">
            <div class="sender-image sender-him">
                <img src="${ImageChosenHim}" alt="">
            </div>
            <div class="msg-and-date">
            <h4 class="message">${currentMsg[i].msg}</h4>
            <p class="msg-date">${currentMsg[i].date}</p>
            <div>
        </div>
        `)
    }
}
// ---------------------------------------------------------------------------
function ShowNamesWhenTouchImage() {
    let senderImageMe = document.querySelectorAll(".sender-me")

for (let i = 0 ; i < senderImageMe.length ; i++){
    senderImageMe[i].addEventListener("mouseenter" , ()=> {
        document.querySelector(".sender-me-name").classList.remove("hidden")
    })
    senderImageMe[i].addEventListener("mouseleave" , ()=> {
        document.querySelector(".sender-me-name").classList.add("hidden")
    })
}
let senderImagehim = document.querySelectorAll(".sender-him")

for (let i = 0 ; i < senderImagehim.length ; i++){
    senderImagehim[i].addEventListener("mouseenter" , ()=> {
        document.querySelector(".sender-him-name").classList.remove("hidden")
    })
    senderImagehim[i].addEventListener("mouseleave" , ()=> {
        document.querySelector(".sender-him-name").classList.add("hidden")
    })
}
}
ShowNamesWhenTouchImage()


// ---------------------------------------------------------------------------
// Send Message Function
let sendMsg = function () {
    if (chatInput.value != ""){

        let time = new Date;
        let minutes = time.getMinutes()
        let hours = time.getHours()
        let AmPm = "AM"
        hours < 10?   hours = "0" + hours     : hours
        minutes < 10? minutes = "0" + minutes : minutes
        hours > 12?   hours -= 12             : hours
        hours > 11? AmPm = "PM" : AmPm = "AM"
        let msgDate = `${hours}:${minutes} ${AmPm}`

        let msgData = { msg: chatInput.value ,sender: sender ,date: msgDate }
        allMessages.push(msgData)
        localStorage.setItem("Messages" ,JSON.stringify(allMessages))
        msgNum += 1

        if (sender == "me"){
            screenChatArea.innerHTML += (`
            <div class="message-container send">
                <div class="sender-image sender-me">
                    <img src="${ImageChosenMe}" alt="">
                </div>
                <div class="msg-and-date">
                <h4 class="message">${allMessages[allMessages.length-1].msg}</h4>
                <p class="msg-date">${allMessages[allMessages.length-1].date}</p>
                <div>
            </div>
            `)
        }else {
            screenChatArea.innerHTML += (`
            <div class="message-container recieve">
                <div class="sender-image sender-him">
                    <img src="${ImageChosenHim}" alt="">
                </div>
                <div class="msg-and-date">
                <h4 class="message">${allMessages[allMessages.length-1].msg}</h4>
                <p class="msg-date">${allMessages[allMessages.length-1].date}</p>
                <div>
            </div>
            `)
        }
        chatInput.value = ""
    }
    chatInput.focus()
    screenChatArea.scrollTo(0, screenChatArea.scrollHeight)
    ShowNamesWhenTouchImage()
}
sendBtn.addEventListener("click" , sendMsg)

chatInput.addEventListener("keyup" , (event) => {
    if (event.key == "Enter"){
        sendMsg()
    }
})

let senderImage = document.querySelector("#sender-img")
senderImage.onclick = ( ()=>{
    document.querySelector(".sender-img-menu").classList.toggle("hidden")
    let changeToMeBtn = document.querySelector(".changeToMe")
    let changeToHimBtn = document.querySelector(".changeToHim")

    changeToMeBtn.onclick = () => {
        sender = "me"
        document.querySelector(".sender-name").innerHTML = `Sender is: ${myName}`
        document.querySelector(".sender-image-bottom img").setAttribute("src" , ImageChosenMe)
        document.querySelector(".sender-img-menu").classList.add("hidden")
}
    changeToHimBtn.onclick =  () => {
        sender = "him"
        document.querySelector(".sender-name").innerHTML = `Sender is: ${hisName}`
        document.querySelector(".sender-image-bottom img").setAttribute("src" , ImageChosenHim)
        document.querySelector(".sender-img-menu").classList.add("hidden")
}
})
document.querySelector(".screen-input").onmouseleave = ()=>{
    document.querySelector(".sender-img-menu").classList.add("hidden")
}

// ---------------------------------------------------------------------
// Time
setInterval(() => {
    let time = new Date;

    let minutes = time.getMinutes()
    let hours = time.getHours()
    let AmPm = "AM"
    let timeArea = document.querySelector(".time")

    hours < 10?   hours = "0" + hours     : hours
    minutes < 10? minutes = "0" + minutes : minutes
    hours > 12?   hours -= 12             : hours

    hours > 11? AmPm = "PM" : AmPm = "AM"
        timeArea.innerHTML =`${hours}:${minutes} ${AmPm}`
}, 1000);






// ------------------------------------------------------------------------
// input right Side
let saveBtn = document.querySelector(".submit")
let meRadio = document.querySelector(".me-radio")
let himRadio = document.querySelector(".him-radio")

let myNameInput = document.querySelector("#my-name")
let hisNameInput = document.querySelector("#his-name")
let MyNameShow = document.querySelector(".names-view1")
let HisNameShow = document.querySelector(".names-view2")

let senderImg = document.getElementById("sender-img")

saveBtn.addEventListener("click" , () => {
    if (meRadio.checked == true) {
        sender = "me"
    }
    if (himRadio.checked == true) {
        sender = "him"
    }
    meRadio.checked = false
    himRadio.checked = false

    if (myNameInput.value != ""){
        localStorage.MyName = JSON.stringify(myNameInput.value) 
        myName = JSON.parse(localStorage.getItem("MyName"))
        myNameInput.value = ""
        MyNameShow.innerHTML = "My Name: " + myName
    }
    if (hisNameInput.value != ""){
        localStorage.HisName =  JSON.stringify(hisNameInput.value) 
        hisName = JSON.parse(localStorage.getItem("HisName")) 
        hisNameInput.value =""
        HisNameShow.innerHTML = "His Name: " + hisName
    }

    if (sender == "me") {
        document.querySelector(".sender-name").innerHTML = `Sender is: ${myName}`
        document.querySelector(".sender-image-bottom img").setAttribute("src" , ImageChosenMe)
    }else {
        document.querySelector(".sender-name").innerHTML = `Sender is: ${hisName}`
        document.querySelector(".sender-image-bottom img").setAttribute("src" , ImageChosenHim)
    }
})

MyNameShow.innerHTML = "My Name: " + myName
HisNameShow.innerHTML = "His Name: " + hisName


let clearBtn = document.querySelector(".clear-chat")
clearBtn.addEventListener("click" , () => {
    document.querySelector(".page-cover").classList.remove("hidden")
    document.querySelector(".areYouSure").classList.remove("hidden")

    document.querySelector(".yes").addEventListener("click" , () => {
        localStorage.removeItem("Messages")
        msgNum = 0
        screenChatArea.innerHTML = ""
        document.querySelector(".page-cover").classList.add("hidden")
        document.querySelector(".areYouSure").classList.add("hidden")
    })
    document.querySelector(".no").addEventListener("click" , () => {
        document.querySelector(".page-cover").classList.add("hidden")
        document.querySelector(".areYouSure").classList.add("hidden")
    })
})

let imageUploadBoxMe = document.querySelector(".image-choose-me")
let imageUploadBoxHim = document.querySelector(".image-choose-him")

imageUploadBoxMe.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load" , ()=> {
        localStorage.setItem("MyImage" , reader.result)
    });
    reader.readAsDataURL(this.files[0]);
})


imageUploadBoxHim.addEventListener("change", function () {
    const reader = new FileReader();
    reader.addEventListener("load" , ()=> {
        localStorage.setItem("HisImage" , reader.result)
    });
    reader.readAsDataURL(this.files[0]);
})


// To switch sender
addEventListener("keydown" , (event) => {
    if (event.key == "L"){
        if (sender == "me"){
            sender = "him"
        }else {
            sender = "me"
        }
    }
    if (sender == "me") {
        document.querySelector(".sender-name").innerHTML = `Sender is: ${myName}`
        document.querySelector(".sender-image-bottom img").setAttribute("src" , ImageChosenMe)
    }else {
        document.querySelector(".sender-name").innerHTML = `Sender is: ${hisName}`
        document.querySelector(".sender-image-bottom img").setAttribute("src" , ImageChosenHim)
    }
})