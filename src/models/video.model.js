import mongoose, {Schema} from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'; //plugins, extra functionality/information to schema
const videoSchema = new Schema
(
    {
        videoFile: 
        {
            type: String, //cloudinary
            required: true
        },
        thumbnail:
        {
            type: String,
            required: true
        },
        title:
        {
            type: String,
            required: true
        },
        description:
        {
            type: String,
            required: true
        },
        duration:
        {
            type:Number,
            required: true
        },
        views:
        {
            type:Number,
            default:0
        },
        ispublished:
        {
            type:Boolean,
            default:true
        },
        owner:
        {
            type:Schema.Types.ObjectId,
            ref: "User"
        }


    },
    {
        timestamps: true
    }
)

videoSchema.plugin(mongooseAggregatePaginate);//adding extra functionality/information to videoSchema

export const video = mongoose.model("video",videoSchema)



//for jwt token:jwt.io