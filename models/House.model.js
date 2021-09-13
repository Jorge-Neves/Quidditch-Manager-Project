const { Schema, model, Mongoose } = require("mongoose");


const houseSchema = new Schema({
      name: String,
      commonRoom: String,
      darkArtsMod: {
            Type: Number,
          },
          defenseAgainstTheDarkArtsMod: {
              Type: Number,
            },
          transfigurationMod: {
              Type: Number,
            
            },
          alchemyMod: {
              Type: Number,
   
            },
            darkArtsFail:{
                  type:Boolean,
             
            },
            defenseArtsFail:{
                  type: Boolean,
                
            },
            alchemyFail: {
                  Type: Boolean,
               
            },
            transfigurationFail: {
                  type: Boolean,
                 

            },
      values: String,
      sortedInto: {
            type: Boolean,
      },      
      houseMembers: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Student",
          },
});

const House = model("House", houseSchema);

module.exports = House;