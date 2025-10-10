import connectToDatabase from '../src/lib/mongodb.js';
import User from '../src/models/User.js';
import { hashPassword } from '../src/lib/auth.js';

async function seedUser() {
  try {
    await connectToDatabase();
    const email = 'leoaleixohilario@gmail.com';
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists.');
      return;
    }
    const name = 'Leonardo';
    const password = '123456';
    const hashedPassword = await hashPassword(password);
    const user = new User({ name, email, password: hashedPassword, role: 'manager' });
    await user.save();
    console.log('Default user created: Leonardo (manager) with email leonardo@example.com and password 123456');
  } catch (error) {
    console.error('Error seeding user:', error);
  }
}

seedUser();
