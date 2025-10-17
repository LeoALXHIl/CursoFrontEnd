import connectToDatabase from '../src/lib/mongodb';
import MenuItem from '../src/models/MenuItem';
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
    // Close mongoose connection if available
    if (typeof (await import('mongoose')).default.disconnect === 'function') {
      await (await import('mongoose')).default.disconnect();
    }
    process.exit(0);
  } catch (error) {
    console.error('Error seeding menu:', error);
    process.exit(1);
  }
}

seedMenu();
