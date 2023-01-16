const mongoose= require("mongoose");

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const postSchema = new Schema({
  title: {type:String, required: true},
  body: String,
  user: {type: Schema.Types.ObjectId, ref:"User"}
}, {timestamps: true});

const postModel = mongoose.model('Posts', postSchema);

module.exports= postModel;
