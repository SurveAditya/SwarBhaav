import { Schema, model, models } from 'mongoose';

// const reportSchema = new Schema({
//     userId: String,
//     date: String,
//     time: String,
//     sentimentType: {
//         type: String,
//         required: true,
//         enum: ["audio", "chat"]
//     },
//     result: Object
// }, {
//     timestamps: true
// })

// const Reports = models.report || model('report', reportSchema);

const reportSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: String,
    time: String,
    sentimentType: {
        type: String,
        required: true,
        enum: ["audio", "chat"],
    },
    result: Object,
}, {
    timestamps: true,
});

// module.exports = mongoose.model("Report", reportSchema);
const Reports = models.report || model('report', reportSchema);

export default Reports;