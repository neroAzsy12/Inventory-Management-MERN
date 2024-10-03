import Vendor from "../models/vendor.model";
import InventoryItem from "../models/inventoryItem.model";

// Create a new vendor with name and optional part numbers
export const createVendor = async(req, res) => {
    try {
        const { name, partNumbers } = req.body; // Extract partNumbers as an array from the request

        if (!name) {
            return res.status(400).json({ message: "Name is required." });
        }

        const vendor = new Vendor({ name });
        await vendor.save();

        // If partNumbers are provided, associate them with the vendor
        if (partNumbers && partNumbers.length) {
            const objectIds = []
            const notFound = [];

            for (const partNumber of partNumbers) {
                const inventoryItem = await InventoryItem.findOne({ partNumber });
                
                if (inventoryItem) {
                    objectIds.push(inventoryItem._id)   // get the object id from the inventory item
                    
                    // update inventory item with the vendor id
                } else {
                    // keep track of part numbers that were not found
                    notFound.push(partNumber);
                }
            }

            // Make sure unique ObjectIds are being kept tracked off, (create a set)
            vendor.partNumbers = [...new Set([...vendor.partNumbers, objectIds])];
            await vendor.save();
        }
        


        res.status(201).json(vendor);
    } catch (error) {
        console.error("Error in createVendor controller:", error);
        res.status(500).json({ message: "Server error" });
    }
}