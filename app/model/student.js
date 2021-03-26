let mongoose=require("mongoose"),
Schema= mongoose.Schema


let studentSchema=new Schema({


    studentId:{
        type:String,
        default:"",
        unique:true
    },
    name:{
        type:String,
        default:""
    },
    gender:{
        type:String,
        default:""
    },
    address:{
        type:String,
        default:""
    },
    mobileNumber:{
        type:String,
        default:""
    },
    createdOn:{
        type:Date,
        default:""
    },
    


})



mongoose.model("student",studentSchema)