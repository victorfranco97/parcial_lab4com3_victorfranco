const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bio: { type: String },
  birthDate: { type: Date, required: true },
  nationality: { type: String, required: true },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'libros' }]
});

module.exports = mongoose.model('autors', authorSchema);