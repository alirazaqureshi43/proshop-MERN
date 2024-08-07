import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);
    console.log('Data Imported!'.green.inverse);
    process.exit(0); // Exit successfully
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1); // Exit with error
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();
    console.log('Data Destroyed!'.red.inverse);
    process.exit(0); // Exit successfully
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1); // Exit with error
  }
};

// Correct the argument index to process.argv[2]
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
