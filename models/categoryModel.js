const {Schema,model} = require("mongoose")

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,

  },
  isDeleted: {
    type: Boolean,
    default: false,
  },

},{ timestamps: true });

const Category = model("Category", categorySchema);

module.exports = Category;
