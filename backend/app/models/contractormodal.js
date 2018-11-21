var mongoose=require("mongoose");

var Schema=mongoose.Schema;

var ContractorSchema=new Schema({
	name: String, 
    email: String,
    phone:String,
    password: String,

    profilepic: String,

    businessname:String,
    website:String,
    address:String,
    organization_number:String,

    cratedon :{ type: Date, default: Date.now },
    updateon : Date

})

module.exports=mongoose.model('UserSchema',ContractorSchema);