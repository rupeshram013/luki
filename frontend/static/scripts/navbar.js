

const navbar = document.getElementById('navbar')
navbar.innerHTML = `

<link rel="stylesheet" href="/styling/navbar.css">


<div id="innernav">

    <div id="menu">
         <button onclick="menu()">
            <img src="/images/icon/menu.png"
         </button>
    </div>
    <div id="title">
        <a href="/">
            <p>LUKI</p>
        </a>
    </div>

    <div id="category">
    <!--
        <a href="/category?name=men">Mens</a>
        <a href="/category?name=women">Women</a>
        <a href="category?name=gym">Gym</a>
    -->
    </div>
    
    <div id="options">
        <button id="search" onclick="searchbox()">
            <img src="/images/icon/search.png" alt="no img" srcset="" />
        </button>

        <a href="/register" id="login">
            <img src="/images/icon/user.png" alt="" />
        </a>

    </div>
</div>

<div id="bottomnav">


    <div id="outsearchbox" style="display: none;">
        <form action="/search" method="get" id="searchbox" required >
            <input type="text" id="searchbutton" name="name" value="" placeholder="search">
            <button type="submit">
                <img src="/images/icon/search.png">
            </button>
        </form>
        
    </div>

</div>


`

cookiehtml = document.getElementById('sign')
let dataarray = document.cookie.split('; ')

const webcookie = document.cookie

let profile = document.getElementById("options");
let menubox = document.getElementById("menubox");

if(webcookie == "" || webcookie == null) {
    
    profile.innerHTML = `
        <button id="search" onclick="searchbox()">
            <img src="/images/icon/search.png" alt="no img" srcset="" />
        </button>
        <a href="/register" id="login">
            <img src="/images/icon/user.png" alt="" />
        </a>

    `
}else{

    
    let token = webcookie.split(";")[0].split("=")[1]
    let username = webcookie.split("username=")[1]
    fetch("/users")
    .then(response => response.json())
    .then(users => {
        for (i in users){

            if (users[i]["token"] == token){
                if(users[i]["admin"] == 1){
                    profile.innerHTML = `
                    <button id="search" onclick="searchbox()">
                        <img src="/images/icon/search.png" alt="no img" srcset="" />
                    </button>
                    <a href="/dashboard" id="login">
                        <img src="/images/icon/user.png" alt="" />
                        
                    </a>
                
                    <button onclick='logout()' id="logout">logout</button>
                    `

                    menubox.innerHTML = 
                    `
                    <a href="/category?name=latest"><p>latest</p></a>
                    <a href="/category?name=men"><p>mens</p></a>
                    <a href="/category?name=women"><p>women</p></a>
                    <a href="/category?name=unisex"><p>unisex</p></a>
                    <a href="/contact"><p>contact us</p></a>
                    <a href="/about" ><p style="  border-bottom: 1px solid rgb(189, 189, 189);">about us</p></a>
                    <button onclick='logout()' id="logout">logout</button>
                    `
                    
                }else {
                    profile.innerHTML = `
                    <button id="search" onclick="searchbox()">
                    <img src="/images/icon/search.png" alt="no img" srcset="" />
                    </button>
                    <a href="/profile" id="login">
                    <img src="/images/icon/user.png" alt="" />
                    
                    </a>
                    
                    <button onclick='logout()' id="logout">Logout</button>
                    `
                    menubox.innerHTML = 
                    `
                    <a href="/category?name=latest"><p>latest</p></a>
                    <a href="/category?name=men"><p>mens</p></a>
                    <a href="/category?name=women"><p>women</p></a>
                    <a href="/category?name=unisex"><p>unisex</p></a>
                    <a href="/contact"><p>contact us</p></a>
                    <a href="/about" ><p style="  border-bottom: 1px solid rgb(189, 189, 189);">about us</p></a>
                    <button onclick='logout()' id="logout">logout</button>
                    `
                    
                }

            }
            

        }
    })

}


function searchbox(){
    if(document.getElementById("outsearchbox").style.display == "block" ){
        document.getElementById("outsearchbox").style.display = "none";
    }else{
        if(document.getElementById("menubox").style.display == "block"){
            document.getElementById("menubox").style.display = "none";
            document.getElementById("wholebox").style.display = "block"
            document.getElementById("outsearchbox").style.display = "block";
        }else{
            document.getElementById("outsearchbox").style.display = "block";
        }
    }
    
}
function menu(){
    if(document.getElementById("menubox").style.display == "block"){
        document.getElementById("menubox").style.display = "none";
        document.getElementById("wholebox").style.display = "block";
        console.log("homebox offline")
    }else{
        document.getElementById("menubox").style.display = "block"
        document.getElementById("wholebox").style.display = "none";
        document.getElementById("outsearchbox").style.display = "none";
        
    }
}




const logout = function() {
    var Cookies = document.cookie.split(';');
    for (var i = 0; i < Cookies.length; i++){
        document.cookie = Cookies[i] + "=;expires=" + new Date(0).toUTCString();
    }
    location.href = "/"
}
