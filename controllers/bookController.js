const Libro = require('../models/Book');
const Autor = require('../models/Author');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Libro.find().populate('author');
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Libro.findById(req.params.id).populate('author');
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const { title, summary, genre, publication, available, author } = req.body;
    const authorExists = await Autor.findById(author);
    if (!authorExists) return res.status(400).json({ message: 'Autor no encontrado' });

    const book = new Libro({ title, summary, genre, publication, available, author });
    await book.save();

    await Autor.findByIdAndUpdate(author, { $push: { books: book._id } });
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Libro.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Libro.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });

    const author = await Autor.findOne({ books: book._id });
    if (author) return res.status(400).json({ message: 'No se puede eliminar un libro asignado a un autor' });

    await Libro.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Libro eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};