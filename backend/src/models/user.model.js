const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
    },
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    avatar: {
      type: String,
      default : "https://thumbs.dreamstime.com/b/user-profile-icon-vector-avatar-person-picture-portrait-symbol-neutral-gender-silhouette-circle-button-photo-blank-272664038.jpg"
    },
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ]
  },
  { timeStamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}
const User = mongoose.model("User", userSchema);
module.exports = User