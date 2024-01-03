const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    sentimentType: {
        type: String,
        required: true,
        enum: ["audio", "chat"],
    },
    result: Object,
}, {
    timestamps: true,
});



module.exports = mongoose.model("Report", reportSchema);
