/* eslint-disable @typescript-eslint/no-var-requires */

const connectToDatabase = require('./src/lib/mongodb').default;
const MenuItem = require('./src/models/MenuItem').default;

async function seedMenu() {
  try {
    await connectToDatabase();
    const items = [
      { name: 'Prato Português', category: 'Principal', price: 30.00 },
      { name: 'Filé Mignon', category: 'Principal', price: 45.00 },
      { name: 'Sobremesa', category: 'Sobremesa', price: 10.00 },
      { name: 'Entrada', category: 'Entrada', price: 15.00 },
      { name: 'Bebida', category: 'Bebida', price: 5.00 },
      { name: 'Prato Principal', category: 'Principal', price: 25.00 },
    ];

    for (const item of items) {
      const existing = await MenuItem.findOne({ name: item.name });
      if (!existing) {
        const newItem = new MenuItem(item);
        await newItem.save();
        console.log(`Created menu item: ${item.name}`);
      } else {
        console.log(`Menu item exists: ${item.name}`);
      }
    }
    console.log('Menu seeding completed.');
  } catch (error) {
    console.error('Error seeding menu:', error);
  }
}

seedMenu();
