const mongoose = require('mongoose'); 

const accountSchema = new mongoose.Schema({ 
    accountType: { type: String, required: true }, // Savings, Checking, Business
    balance: { type: Number, default: 0 }, 
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }, 

    createdBy: {  
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'User',  
        required: true  
    }, 
    createdAt: { type: Date, default: Date.now } 
}); 

module.exports = mongoose.model('Account', accountSchema);