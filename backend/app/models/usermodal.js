var mongoose=require("mongoose");
//var increment=require("mongoose-auto-increment")
var Schema=mongoose.Schema;

var estimation=new Schema({

    area:{ type: String, default: "" },
    coordinates:{ type: String, default: "" },
    material:{ type: String, default: "" },
    slope:{ type: String, default: "" },
    estimatedamount:{ type: String, default: "" },
    slopecost:{ type: String, default: "" },
    materialcost:{ type: String, default: "" },
    labour:{ type: String, default: "" },
    address:{ type: String, default: "" },
    property_type: { type: String, default: "" },
    floors: { type: String, default: "" },
    roof_pitch: { type: String, default: "" },
    created_date:{type:Date ,default:Date.now }


})

var timings=new Schema({

    date:{ type: String, default: "" },
    time:{ type: String, default: "" },
    created_date:{type:Date,default:Date.now }


})

var UserSchema=new Schema({
	name: { type: String, default: "" }, 
    phone:{ type: String, default: "" },
    Password:{ type: String, default: "" },
    email:{ type: String, default: "" },
    profilepic:{ type: String, default: "" },
    cratedon :{ type: String, default: "" },
    updateon : { type: String, default: "" },
    businessname:{ type: String, default: "" },
    website:{ type: String, default: "" },
    address:{ type: String, default: "" },
    organization_number:{ type: String, default: "" },
    type:String,
    estdet:[estimation],
    connecttime:[timings] 

   

})

module.exports=mongoose.model('Users',UserSchema);