import mongoose from "mongoose";

const vendorItemSchema = new mongoose.Schema({
    inventoryItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "InventoryItem",
        required: true
    },
    vendorPartId: {
        type: String,
        default: "N/A"
    },
}, { _id: false });

const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    items: [vendorItemSchema],
    lastModified: {
        type: Date,
        default: Date.now
    },
    lastModifiedBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }
});

const Vendor = mongoose.model("Vendor", vendorSchema)
export default Vendor;