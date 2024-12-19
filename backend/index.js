const expressjs = require('express')
const bodyparser = require('body-parser')
const database = require('mariadb')
const { connect } = require('http2')
const path = require('path')
console.log("Libraries loaded ;")
const multer = require('multer')
const fs = require('fs')
const { sign } = require('crypto')

const frontendtemplates = path.join(__dirname , "../frontend/templates")
const frontendstatic = path.join(__dirname , "../frontend/static")
console.log("Paths were defined ; " + "Template : " + frontendtemplates , "Static : " + frontendstatic)

const backend = expressjs()
const port = 80
backend.use('/',expressjs.static(frontendstatic))
const databaseconnection = database.createPool({
    connectionLimit : 1000,
    connectTimeout  : 60 * 60 * 1000,
    acquireTimeout  : 60 * 60 * 1000,
    timeout : 60 * 60 * 1000,
    host : 'localhost',
    user : 'root',
    password : 'sqldata123!@#',
    database : 'luki',
    connectionLimit : 100,
});


async function signup( token, firstname , secondname, username, usermail , phone, userpassword) {
    let conn;
    try {
  
        conn = await databaseconnection.getConnection();
        var insertquery ;
        const res = await conn.query(`insert into users (token,firstname,secondname,username, usermail , phone, userpass ) VALUES (?,?,?,?,?,?,?)`,[token , firstname , secondname , username , usermail , phone,userpassword]);

    } finally {
      if (conn) conn.release(); 
    }
}

async function productdata(category) {
    let conn;
    try {
  
        conn = await databaseconnection.getConnection();
        const res = await conn.query(`select * from products where productcategory = ? ` ,[category]);
        return (res)
  
    } finally {
      
    }
}

async function productupload( id, name , price, quantity , desc , path , imagenumber, category) {
    let conn;
    try {
  
        conn = await databaseconnection.getConnection();
        const res = await conn.query(`insert into products (productid,productname,productprice,productquantity, description , path , imagenumber , productcategory) VALUE (? ,?,?, ?,?, ? , ? , ?)`, [id , name , price , quantity , desc , path , imagenumber , category] )
  
    } finally {
      if (conn) conn.release();
    }
}

const urlencodedparser = bodyparser.urlencoded( {
    extended:false
})    

bodyparser.json()

backend.get('/' , (req, res) => {
    res.sendFile(path.join(frontendtemplates, "index.html"))
})
backend.get('/home' , (req, res) => {
    res.sendFile(path.join(frontendtemplates, "home.html"))
})




backend.get('/product' , (req, res) => {
    res.sendFile(path.join(frontendtemplates, "product.html"))
})
backend.post('/product',urlencodedparser , (req, res) => {
    let id = req.body.id
    let quantity = req.body.quantity
    let category = req.body.category
    let color = req.body.color
    let sizes = ""
    sizes = req.body.sizes
    res.redirect(`/buy?quantity=${quantity}&sizes=${sizes}&id=${id}&category=${category}&color=${color}`);
})





backend.get('/category' , (req, res) => {
    res.sendFile(path.join(frontendtemplates, "category.html"))
})


async function users() {
    let conn;
    try {
  
        conn = await databaseconnection.getConnection();
        const res = await conn.query(`select token , firstname , secondname , username , usermail , phone, spending , admin  from users`);
        return (res)

  
    } finally {
      
    }
}


backend.get("/users" , (req,res) => {

    async function senddata(){
        const data = await users()
        res.json(data)
    }
    senddata()
})

async function orderdata() {
    let conn;
    try {
  
        conn = await databaseconnection.getConnection();
        const res = await conn.query(`select * from products inner join productorder on products.productid = productorder.id;`);
        return (res)

  
    } finally {
      
    }
}



backend.get("/order" , (req,res) => {

    async function senddata(){
        const data = await orderdata()
        res.json(data)
    }
    senddata()
})
      
backend.get("/women" , (req, res) => {

    async function senddata(){

        const data = await productdata("women")
        res.json(data)
    } 

    senddata()
})
backend.get("/men" , (req, res) => {

    async function senddata(){

        const data = await productdata("men")
        res.json(data)
    } 

    senddata()
})
backend.get("/gym" , (req, res) => {

    async function senddata(){

        const data = await productdata("gym")
        res.json(data)
    } 

    senddata()
})

async function orderupload( id, name , email,phonenum, address , total , token ,category , size , ordercode , quantity) {
    let conn;
    try {
  
        conn = await databaseconnection.getConnection();
        const res = await conn.query(`insert into productorder (id,customername,email,phonenum  , address , total , token , category , size , ordercode , quantity) VALUES (?,?,?,?,?,?,?,?,?,?,?)`,[id ,name ,email , phonenum , address, total , token , category, size ,ordercode,quantity]);
  
    } finally {
      if (conn) conn.release();
    }
}
async function orderdelete( ordercode) {
    let conn;
    try {
  
        conn = await databaseconnection.getConnection();
        const res = await conn.query(`delete from productorder where ordercode = ?`, [ordercode] )

  
    } finally {
      if (conn) conn.release();
    }
}


backend.get("/profile" , (req,res) => {
    res.sendFile(path.join(frontendtemplates, "profile.html"))
    
})

backend.post("/profile" , urlencodedparser , (req,res) => {
    orderdelete(req.body.ordercode)
    res.redirect("/profile")
})


backend.get("/buy" , (req, res) => {

    res.sendFile(path.join(frontendtemplates, "buy.html"))

})

backend.post("/buy" ,urlencodedparser, (req,res) => {
    var id = req.body.id
    var name = req.body.name
    var email = req.body.email
    var number = req.body.number
    var address = req.body.address
    var price = req.body.price
    var token = req.body.token
    var category = req.body.categoryform
    var size = req.body.size
    var quantity = req.body.quantity
    let ordercode = Math.ceil(Math.random() * 13131313);

    orderupload(id , name , email , number ,  address, price , token , category , size , ordercode , quantity)
    res.redirect("/profile")

})

backend.post("/deleteorder" , urlencodedparser ,(req,res) => {

    let ordercode = req.body.ordercode

    orderdelete(ordercode)
    res.redirect("/")
    
})


backend.get("/dashboard" , (req,res) => {
    res.sendFile(path.join(frontendtemplates, "dashboard.html"))

})


async function fullproductdata() {
    let conn;
    try {
  
        conn = await databaseconnection.getConnection();
        const res = await conn.query(`select * from products`);

        return (res)
  
    } finally {
      
    }
}



backend.get("/products" , (req,res) => {
    async function senddata(){

        const data = await fullproductdata()
        res.json(data)
    } 

    senddata()
})

let imageindex = 1
let id = Math.ceil(Math.random()*13131313)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let category = req.body.productcategory
        const productpath = "frontend/static/images/product/" + category +"/" + id +"/"
        fs.mkdir(productpath,
        (err) => {
            if (err) {
            console.log("Dir Couldn't be created!")
                return console.error(err);

        }
            console.log('Directory created successfully!');
        });

        cb(null, productpath);
    },
    filename: (req, file, cb) => {

        cb(null,imageindex+".png");
        imageindex = imageindex + 1;
        
    },
  });


const upload = multer({ storage: storage });

backend.post("/upload",urlencodedparser , upload.array('productimages' , 13)  , (req,res) => {

        let name = req.body.productname
        let category = req.body.productcategory
        let price = req.body.productprice
        let quantity = Math.ceil(req.body.productquantity)
        let desc = req.body.productdesc
        let path = "../frontend/static/images/product/" + category+"/" + id 
        productupload(id , name , price , quantity , desc, path , imageindex , category)
        
        imageindex = 1
        id = Math.ceil(Math.random()*13131313)
        res.redirect("/dashboard")
})

async function productdelete(id) {
    let conn;
    try {
        conn = await databaseconnection.getConnection();
        const res = await conn.query(`delete from products where productid = ?` , [id]);

        return (res)
  
    } finally {
      
    }
}


backend.post("/deleteproduct" , urlencodedparser ,(req,res) => {

    let productid = req.body.productid

    productdelete(productid)
    res.redirect("/dashboard")
    
})

backend.get('/login' , (req,res) => {
    res.sendFile(path.join(frontendtemplates, "login.html"))
})

async function readinglogindata(usermail) {
    let conn;
    try {
  
        conn = await databaseconnection.getConnection();
        const res = await conn.query(`select * from users where usermail = ?` , [usermail]);
        return res

  
    } finally {
      
    }
}

backend.post("/login", urlencodedparser , (req , res) => {
    let usermail = req.body.usermail 
    let userpassword = req.body.userpass 
    
    
    async function login(req,res){
        const checkdata = await readinglogindata( usermail)

        if(checkdata == null || checkdata == ""){
            res.redirect("/login?error=1")
            
        }else {

        if(userpassword != checkdata[0]["userpass"]){
            res.redirect("/login?error=2")
        }else if(checkdata != null){
            res.cookie('token',checkdata[0]["token"]);
            res.cookie('username',checkdata[0]["username"]);
            res.cookie.expires = false;
            
            res.redirect('/');
            
            }
        }
    }
    login(req,res)
            
})
        
backend.get("/register" , (req, res) => {
    res.sendFile(path.join(frontendtemplates, 'register.html'));
})


backend.post("/register" , urlencodedparser , (req , res) => {
    
    let Fullusername = req.body.fullname.split(" ")
    var firstname = Fullusername[0]
    var secondname = Fullusername[1]
    var username = req.body.username
    let usermail = req.body.usermail 
    let phone = req.body.phone 
    let userpassword = req.body.userpass 
    let token = Math.ceil(Math.random() * 13131313)
    
    async function checklogin(res){
        
        const checkdata = await readinglogindata( usermail)
        
        if(checkdata == null || checkdata == ''){
            var signinsucess = signup(token , firstname , secondname,username , usermail , phone, userpassword)
            console.log(signinsucess);
            if(signinsucess){
                res.cookie('token',token);
                res.cookie('username',username);
            }
            res.redirect('/');
            
        }else {
            
            console.log("Redirected into same page;");
            res.redirect('/register?user=1');
            
            
        }
    }
    checklogin(res)                        
                        
})

backend.get("/password" , (req,res) => {
    
    res.sendFile(path.join(frontendtemplates, 'password.html'));
    
})

backend.get("*" , (req,res) => {
    
    res.send("<h1>404 Error , Page not found ;</h1>");
} )

backend.listen(port, () => {
    console.log(`\n`)
    console.log(`SERVER is LISTENING at PORT ${port}`)
} )

