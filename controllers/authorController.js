const Autor = require('../models/Author');
const Libro = require('../models/Book');

exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await Autor.find().populate('books');
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAuthorById = async (req, res) => {
  try {
    const author = await Autor.findById(req.params.id).populate('books');
    if (!author) return res.status(404).json({ message: 'Autor no encontrado' });
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createAuthor = async (req, res) => {
  try {
    const { name, bio, birthDate, nationality } = req.body;
    if (!name) return res.status(400).json({ message: 'El nombre es obligatorio' });

    const author = new Autor({ name, bio, birthDate, nationality });
    await author.save();
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateAuthor = async (req, res) => {
  try {
    const author = await Autor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!author) return res.status(404).json({ message: 'Autor no encontrado' });
    res.status(200).json(author);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteAuthor = async (req, res) => {
  try {
    const author = await Autor.findByIdAndDelete(req.params.id);
    if (!author) return res.status(404).json({ message: 'Autor no encontrado' });
    res.status(200).json({ message: 'Autor eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addBookToAuthor = async (req, res) => {
  try {
    const { id, bookId } = req.params;
    const author = await Autor.findById(id);
    const book = await Libro.findById(bookId);

    if (!author) return res.status(404).json({ message: 'Autor no encontrado' });
    if (!book) return res.status(404).json({ message: 'Libro no encontrado' });

    if (!author.books.includes(bookId)) {
      author.books.push(bookId);
      await author.save();
    }

    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};