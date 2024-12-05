



function formvalidation(){

    let username = document.getElementById("username")
    let usermail = document.getElementById("usermail")
    let password = document.getElementById("userpass")
    let repassword = document.getElementById("userrepass")


    let leftform = document.getElementById("leftform");
    let rightform = document.getElementById("rightform");
    
    if(username.value == '' || username.value == null ){
        let inputtext = document.getElementById("usernametext");
        inputtext.style.display = "block";
        username.style.borderBottom = "solid red 0.13em";
        return false;
        
    }
    else if(usermail.value == '' || usermail.value == null){
        let inputtext = document.getElementById("usermailtext");
        inputtext.style.display = "block";
        usermail.style.borderBottom = "solid red 0.13em";
        return false;
        
    }
    else if ((password.value != repassword.value) || (password.value == "" || repassword.value == "" ) || (password.value == null || repassword.value == null ) ){
            
            let inputtext = document.getElementById("userpasstext");
            let inputtext2 = document.getElementById("userrepasstext");
            
            password.style.borderBottom = "solid red 0.13em";
            repassword.style.borderBottom = "solid red 0.13em";
            
            inputtext.style.display = "block";
            inputtext2.style.display = "block";
            
            return false;
    }
    else{
        true;
    }

}


function loginvalidation (){

    let cookie = document.cookie
    if (cookie == null || cookie == ""){
        document.getElementById("loginerror").innerHTML = `Please <a href="/login">Login</a>`
        return false
    }else {
        
        let token = cookie.split(";")[0].split("=")[1]
        console.log("the token :",token)
        return true 
        
    }
}