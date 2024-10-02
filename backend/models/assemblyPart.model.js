import mongoose from "mongoose";

// Create the Component Schema as a subdocument
const componentSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['InventoryItem', 'AssemblyPart'],
        required: true
    },
    ref: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true
    }
});

// Define the Assembly Part Schema
const assemblyPartSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true
    },
    components: [componentSchema],
    quantity: {
        type: Number, 
        required: true
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
});

const AssemblyPart = mongoose.model("AssemblyPart", assemblyPartSchema);
export default AssemblyPart;