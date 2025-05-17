const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
    comment:{ type:String

    },
    rating:{
        type:Number,
        min:1,
        max:5
    },
    created_at:{
        type:Date,
        default:Date.now()

    },
     author:{
              type:mongoose.Schema.Types.ObjectId,
              ref:"User"
            }
        
    
})
const Review = mongoose.model("Review",ReviewSchema);
module.exports=Review;

