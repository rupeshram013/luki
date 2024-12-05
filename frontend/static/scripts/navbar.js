

// Full Namebar defining and rendering 
// Share able code to different html file 


const navbar = document.getElementById('navbar')
console.log("start of the navbar")
navbar.innerHTML = `

<link rel="stylesheet" href="/styling/navbar.css">


<div id="innernav">

    <div id="menu">
         <button>
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
    
    <!--
    <form id="search" >
        <button>
            <img src="/images/icon/search.png" alt="" srcset="" />
        </button>
    </form> 
    -->

    <div id="options">
        <button>
            <img src="/images/icon/search.png" alt="no img" srcset="" />
        </button>
        <a href="/cart" id="cart">
            <img src="/images/icon/cart.png" alt="" />
        </a>
        <a href="/login" id="login">
            <img src="/images/icon/user.png" alt="" />
        </a>

    </div>
</div>


`



// Username Defining and Button defining in the navbar 


cookiehtml = document.getElementById('sign')
let dataarray = document.cookie.split('; ')



// Code to split the username and string concanate
// for (i in dataarray){



//     if(dataarray[0].at(0) == 't' ){
        
//         let fusername = dataarray[0].split('=')[1].split("%20")[1]
//         let susername = dataarray[0].split('=')[1].split("%20")[2]
//         let tusername = dataarray[0].split('=')[1].split("%20")[3]
        
//         if(tusername){
            
//             username = fusername + " " + susername + " " + tusername 
//         }else{
//             console.log(fusername , susername)
//             username = fusername + " " + susername  
//         }
        
        
//         console.log("the username :" , username)
//     }
// }   


const webcookie = document.cookie
// console.log(document.cookie.split("; ")[1].split("=")[1])
console.log("End of the navbar ")

// let username = document.cookie.split("; ")[1].split("=")[1]
let profile = document.getElementById("options");

// Displaying the Profile instead of button according to the cookie stored .
if(webcookie == "" || webcookie == null) {
    
    profile.innerHTML = `
        <button id="search">
            <img src="/images/icon/search.png" alt="no img" srcset="" />
        </button>
        <a href="/cart" id="cart">
            <img src="/images/icon/cart (2).png" alt="" />
        </a>
        <a href="/login" id="login">
            <img src="/images/icon/user.png" alt="" />
        </a>

    `
}else{

    
    let token = webcookie.split(";")[0].split("=")[1]
    let username = webcookie.split("username=")[1]

    console.log(token)
  
    fetch("/users")
    .then(response => response.json())
    .then(users => {
        for (i in users){

            if (users[i]["token"] == token){
                console.log(users[i]['admin'])
                if(users[i]["admin"] == 1){
                    profile.innerHTML = `
    
                    <a href="/dashboard" id="login">
                        <img src="/images/icon/user.png" alt="" />
                        
                    </a>
                
                    <button onclick='logout()'>Logout</button>
                    `

                }else {
                    profile.innerHTML = `
    
                    <a href="/profile" id="login">
                        <img src="/images/icon/user.png" alt="" />
                        
                    </a>
                
                    <button onclick='logout()'>Logout</button>
                    `

                }

            }
            

        }
    })

}



const logout = function() {
    var Cookies = document.cookie.split(';');

    // set 1 Jan, 1970 expiry for every cookies
    for (var i = 0; i < Cookies.length; i++){
        document.cookie = Cookies[i] + "=;expires=" + new Date(0).toUTCString();
    }
    location.href = "/"
    
    console.log(document.cookie)
}

