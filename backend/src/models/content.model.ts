// import mongoose, { Schema, Document, Types } from "mongoose";

// const contentSchema: Schema = new Schema({
//   user: { type: Schema.Types.ObjectId, ref: "User" },
//   type: String,
//   description: String,
//   url: String,
//   likes: { type: Number, default: 0 },
// });

// export default mongoose.model("Content", contentSchema);


import mongoose, { Schema, Document, Types } from "mongoose";

// Define an interface for the Content document
interface ContentDocument extends Document {
  user: Types.ObjectId;
  type: string;
  description: string;
  url: string;
  likes: Types.ObjectId[]; // Array of user IDs who liked the content
}

// Define the schema
const contentSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  type: String,
  description: String,
  url: String,
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }], // Array of user IDs
});

export default mongoose.model<ContentDocument>("Content", contentSchema);
