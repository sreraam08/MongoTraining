const mongoose=require('mongoose');

var employeeSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:'Enter First Name'
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    city:{
        type:String
    }
})

employeeSchema.path('email').validate((val)=>{
    emailregex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailregex.test(val);
},'Invalid Email-ID')

mongoose.model('Employee',employeeSchema);