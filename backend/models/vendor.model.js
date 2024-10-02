import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    partIds: [{
        type: String
    }]
});

const Vendor = mongoose.model("Vendor", vendorSchema)
export default Vendor;