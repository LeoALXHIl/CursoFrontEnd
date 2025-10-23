const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
async function setupDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/inventory', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Define schemas
    const UserSchema = new mongoose.Schema({
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      name: { type: String, required: true },
      role: { type: String, enum: ['admin', 'user'], default: 'user' },
    }, { timestamps: true });

    const ProductSchema = new mongoose.Schema({
      name: { type: String, required: true },
      description: { type: String, required: true },
      category: { type: String, required: true },
      size: { type: String, required: true },
      weight: { type: Number, required: true },
      material: { type: String, required: true },
      currentStock: { type: Number, default: 0 },
      minStock: { type: Number, required: true },
      price: { type: Number, required: true },
    }, { timestamps: true });

    const StockMovementSchema = new mongoose.Schema({
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      type: { type: String, enum: ['entrada', 'saida'], required: true },
      quantity: { type: Number, required: true },
      date: { type: Date, required: true },
      responsible: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      notes: { type: String },
    }, { timestamps: true });

    // Create models
    const User = mongoose.model('User', UserSchema);
    const Product = mongoose.model('Product', ProductSchema);
    const StockMovement = mongoose.model('StockMovement', StockMovementSchema);

    // Create default admin user
    const adminExists = await User.findOne({ username: 'admin' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const admin = new User({
        username: 'admin',
        password: hashedPassword,
        name: 'Administrator',
        role: 'admin',
      });
      await admin.save();
      console.log('Admin user created: username=admin, password=admin123');
    }

    // Sample products
    const sampleProducts = [
      {
        name: 'Martelo de Cabeça em Aço',
        description: 'Martelo profissional com cabeça em aço carbono',
        category: 'Ferramentas de Impacto',
        size: '30cm',
        weight: 0.8,
        material: 'Aço Carbono',
        currentStock: 50,
        minStock: 10,
        price: 45.90,
      },
      {
        name: 'Chave de Fenda Isolada',
        description: 'Chave de fenda com revestimento isolante para eletricidade',
        category: 'Ferramentas Manuais',
        size: '15cm',
        weight: 0.1,
        material: 'Aço com Isolante',
        currentStock: 100,
        minStock: 20,
        price: 12.50,
      },
      {
        name: 'Alicate Universal',
        description: 'Alicate universal para múltiplas funções',
        category: 'Ferramentas de Preensão',
        size: '20cm',
        weight: 0.3,
        material: 'Aço Cromado',
        currentStock: 75,
        minStock: 15,
        price: 28.90,
      },
      {
        name: 'Serra de Ponta Imantada',
        description: 'Serra de ponta com ímã para fixação de parafusos',
        category: 'Ferramentas de Corte',
        size: '25cm',
        weight: 0.4,
        material: 'Aço com Ponta Imantada',
        currentStock: 30,
        minStock: 8,
        price: 35.00,
      },
      {
        name: 'Nível a Bolha',
        description: 'Nível de bolha profissional para medições precisas',
        category: 'Ferramentas de Medição',
        size: '40cm',
        weight: 0.6,
        material: 'Alumínio',
        currentStock: 40,
        minStock: 12,
        price: 55.00,
      },
    ];

    for (const productData of sampleProducts) {
      const existingProduct = await Product.findOne({ name: productData.name });
      if (!existingProduct) {
        const product = new Product(productData);
        await product.save();
        console.log(`Product created: ${productData.name}`);
      }
    }

    console.log('Database setup completed successfully!');
  } catch (error) {
    console.error('Database setup error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
  }
}

setupDatabase();
