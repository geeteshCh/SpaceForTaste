const express= require('express')
const bodyParser= require('body-parser')
const request= require('request')
const https = require('https')

const app=express()
app.use(express.static(__dirname))
app.use(bodyParser.urlencoded({extended: true}))




app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/signup.html")
})

app.post("/",(req,res)=>{
    var firstName,lastName,email;
    firstName=req.body.fname
    lastName=req.body.lname
    email=req.body.email
    var data={
        members:[{
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME : firstName,
                LNAME :lastName
            }
        }
        ]
    }
    const jsonData= JSON.stringify(data)
    const url="https://us6.api.mailchimp.com/3.0/lists/602c17862c"
    const options={
        method : "POST",
        auth : "geeteshCh:b85d1db33ebf21be70a345565f6b4d81-us6"
    }
    const request= https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html")
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }
       
        response.on("data",function(data){
            console.log(JSON.parse(data)) 
        })
    })

        
    request.write(jsonData)
    request.end()
    
})
app.post('/failure',function(req,res){
    res.redirect("/")
})

app.listen(process.env.PORT || 3000,()=>{
    console.log("listening on port 3000....")
})
//1bcb8cae253c6cda0673622aa2e41b0e-us6
// audience id:602c17862c