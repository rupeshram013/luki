

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
        <a href="/cart" id="cart">
            <img src="/images/icon/cart.png" alt="" />
        </a>
        <a href="/register" id="login">
            <img src="/images/icon/user.png" alt="" />
        </a>

    </div>
</div>

<div id="bottomnav">

    <div id="menubox" style="display: none;">
        <a href="/category?name=men">Mens</a>
        <a href="/category?name=women">Women</a>
        <a href="/category?name=unisex">Unisex</a>
    </div>
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

if(webcookie == "" || webcookie == null) {
    
    profile.innerHTML = `
        <button id="search" onclick="searchbox()">
            <img src="/images/icon/search.png" alt="no img" srcset="" />
        </button>
        <a href="/cart" id="cart">
            <img src="/images/icon/cart (2).png" alt="" />
        </a>
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
                
                    <button onclick='logout()' id="logout">Logout</button>
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
            document.getElementById("outsearchbox").style.display = "block";
        }else{
            document.getElementById("outsearchbox").style.display = "block";
        }
    }

}
function menu(){
    if(document.getElementById("menubox").style.display == "block"){
        document.getElementById("menubox").style.display = "none";
    }else{
        if(document.getElementById("outsearchbox").style.display == "block"){
            document.getElementById("outsearchbox").style.display = "none";
            document.getElementById("menubox").style.display = "block";
        }else{
            document.getElementById("menubox").style.display = "block";
        }

    }

}



const logout = function() {
    var Cookies = document.cookie.split(';');
    for (var i = 0; i < Cookies.length; i++){
        document.cookie = Cookies[i] + "=;expires=" + new Date(0).toUTCString();
    }
    location.href = "/"
}
