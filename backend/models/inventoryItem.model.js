import mongoose from "mongoose";

const inventoryItemSchema = new mongoose.Schema({
    itemNumber: {
        type: Number, 
        unique: true
    },
    partNumber: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false
    },
    quantity: {
        type: Number,
        required: true
    },
    minQuantity: {
        type: Number,
        required: true
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Vendor",
        default: null
    },
    lastModified: {
        type: Date,
        default: Date.now
    },
    reorderNeeded: {
        type: Boolean,
        default: false
    },
    isAssemblyPart: {
        type: Boolean,
        default: false
    }
});

// Middleware to determine if reorder is needed
inventoryItemSchema.pre('save', function(next) {
    this.reorderNeeded = this.quantity < this.minQuantity;
    next();
});

const InventoryItem = mongoose.model("InventoryItem", inventoryItemSchema)
export default InventoryItem;