require('dotenv').config();
const mongoose = require('mongoose');

// 1. A simple test schema
const testSchema = new mongoose.Schema({
    name: String,
    timestamp: Date
});

// 2. A model for our test data. This will create a 'tests' collection.
const Test = mongoose.model('Test', testSchema);

// 3. The main function to connect and add data
const runTest = async () => {
    console.log('Connecting to database...');
    try {
        // Connect using your .env file
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully!');

        // Create a new test document
        const testData = new Test({
            name: 'Database Connection Test',
            timestamp: new Date()
        });

        // Save it to the database
        await testData.save();
        console.log('Test data saved successfully!');

    } catch (err) {
        console.error('An error occurred:', err);
    } finally {
        // Disconnect from the database
        mongoose.connection.close();
        console.log('Database connection closed.');
    }
};

// 4. Run the test
runTest();