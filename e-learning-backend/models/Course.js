const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    lessons: [{ type: String }], // Array of lesson URLs
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
