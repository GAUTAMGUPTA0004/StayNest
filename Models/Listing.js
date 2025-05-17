const mongoose = require('mongoose');
const  passportLocalMongoose = require('passport-local-mongoose');
const ListingSchema = new mongoose.Schema({
    title: {type:String,
      required: true

    }, 
    description: {type:String,
      required: true

    },
    image: { 
       
        filename:String,
         url:String
},
    price:  {type : Number,
      required: true

    },
    location:{type:String,
        required: true

    },
    country:{type:String,
        required: true
    },reviews:[{
          type: mongoose.Schema.Types.ObjectId,
          ref:"Review"
    
    
        }],
        owner:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"User"
        },geometry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },   
  });


  ListingSchema.post("findOneAndDelete",async(listing)=>{
      if(listing){
        await Review.deleteMany({_id: {$in:listing.reviews} });
      }

  });

  const Listing = mongoose.model('Listing', ListingSchema);
  module.exports = Listing;