const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String },
  genre: { type: String, required: true },
  publication: { type: Date, required: true },
  available: { type: Boolean, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'autors', required: true }
});

module.exports = mongoose.model('libros', bookSchema);