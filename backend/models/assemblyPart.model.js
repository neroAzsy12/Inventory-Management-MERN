import mongoose from "mongoose";

// Create the Component Schema as a subdocument
const componentSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['InventoryItem', 'AssemblyPart'],
        required: true
    },
    referenceId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        refPath: 'type'
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    }
}, { _id: false });

// Define the Assembly Part Schema
const assemblyPartSchema = new mongoose.Schema({
    assemblyNumber: {
        type: String, 
        required: true
    },
    quantity: {
        type: Number, 
        required: true,
        min: 0,
        default: 0
    },
    description: {
        type: String,
        required: true
    },
    components: [componentSchema],
    lastModified: {
        type: Date,
        default: Date.now
    },
    lastModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

const AssemblyPart = mongoose.model("AssemblyPart", assemblyPartSchema);
export default AssemblyPart;

/*
EX)
{
    "name": "someName",
    "quantity": 10,
    "components": [
        {
            "type": "InventoryItem",
        },
        {
            "type": "AssemblyPart",
            "referenceId": objectId
            "quantity": 1
        }
    ]
}
*/