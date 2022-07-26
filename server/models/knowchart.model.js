const mongoose = require("mongoose");

const KnowChartSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required!"],
        minlength: [2, "Name must be 2 characters long!"]
    },
    data: {
        type: String,
        required: [true, "this blob may change depending on react-flow things"]
        
    }
}, {timestamps: true})

const KnowChart = mongoose.model('KnowChart', KnowChartSchema);

module.exports = KnowChart;