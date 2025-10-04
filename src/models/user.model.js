import mongoose ,{Schema} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const userSchema = new Schema
(
    {
        username:
        {
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:
        {
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        fullname:
        {
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avatar:
        {
            type:String,  //cloudinary url
            required:true
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"video"
            }
        ],
        password:
        {
            type:String,
            required:[true, "Password is required"]
        },
        refreshTokens:
        {
            type:String
        }

    },
    {
        timestamps:true
    }
)


// don't use callback function because it has no this keyword for knowing context.
userSchema.pre("save", async function (next){
    if(!this.isModified("password"))return next(); //only call if password is modified
    this.password = bcrypt.hash(this.password,10)
    next();
}) 


//check password
userSchema.methods.isPasswordCorrect = async function
(password){
    return await bcrypt.compare(password, this.password)
}


//token generation
userSchema.methods.generateAccessToken = function()
{
    jwt.sign(
        {
            _id:this._id,
            username:this.username,
            email:this.email,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:ACCESS_TOKEN_EXPIRY
        }
        
    )
}


userSchema.methods.generateRefreshToken = function()
{
    jwt.sign(
    {
        _id:this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:REFRESH_TOKEN_EXPIRY
    }
)
} 

export const User = mongoose.model("User",userSchema)