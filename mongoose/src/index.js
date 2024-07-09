const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    
    const userSchema = new mongoose.Schema({
        firstName: String, 
        lastName: String
    })

    const User  = mongoose.model('User', userSchema)

    const user1 = new User({firstName: "John", lastName: "Doe"})
    console.log(user1)

    
}