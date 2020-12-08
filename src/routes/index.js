const express = require('express');
const router = express.Router();

// ============================================================================================
// Function Import
// ============================================================================================

// Middleware

const { auth, adminAuth } = require('../../middlewares/auth');
const { fileUpload } = require('../../middlewares/fileUpload');
const { premium } = require('../../middlewares/premium');

// Artist Actions

const { getArtists, getArtist, postArtist, putArtist, deleteArtist } = require('../controllers/artist');

// Music Actions

const { getMusics, getMusic, postMusic, putMusic, deleteMusic } = require('../controllers/music');

// User Actions

const { getUsers, getUser, deleteUser } = require('../controllers/user');

// Transaction Actions

const { getTransactions, getTransaction, postTransaction, putTransaction, deleteTransaction } = require('../controllers/transaction');

// Transaction Actions

const { register, login, loadUser } = require('../controllers/auth');

// Like Actions

const { addLike, removeLike } = require('../controllers/like');

// Playlist Actions

const { addPlaylist, removePlaylist } = require('../controllers/playlist');

// Administration Actions

const { approvePayment, rejectPayment } = require('../controllers/administration');

// File

const { fileDownload } = require('../controllers/file');

// ============================================================================================
// ROUTING
// ============================================================================================

// ------------------------------------------------
// Music
// ------------------------------------------------

router.get('/musics', auth, getMusics);
router.get('/music/:id', auth, getMusic);
router.post('/music', auth, adminAuth, fileUpload('img', 'audio'), postMusic);
router.put('/music/:id', auth, adminAuth, fileUpload('img', 'audio'), putMusic);
router.delete('/music/:id', auth, adminAuth, deleteMusic);

// ------------------------------------------------
// Artist
// ------------------------------------------------

router.get('/artists', auth, getArtists);
router.get('/artist/:id', auth, getArtist);
router.delete('/artist/:id', auth, adminAuth, deleteArtist);
router.put('/artist/:id', auth, adminAuth, fileUpload('img', null), putArtist);
router.post('/artist/', auth, adminAuth, fileUpload('img', null), postArtist);

// ------------------------------------------------
// User
// ------------------------------------------------

router.get('/users', auth, adminAuth, getUsers);
router.get('/user/:id', auth, adminAuth, getUser);
router.delete('/user/:id', auth, adminAuth, deleteUser);

// ------------------------------------------------
// Transaction
// ------------------------------------------------

router.get('/transactions', auth, adminAuth, getTransactions);
router.get('/transaction/:id', auth, adminAuth, getTransaction);
router.post('/transaction', auth, fileUpload('img', null), postTransaction);
router.put('/transaction/:id', auth, fileUpload('img', null), putTransaction);
router.delete('/transaction/:id', auth, adminAuth, deleteTransaction);

// ------------------------------------------------
// Like
// ------------------------------------------------

router.post('/music/like/:MusicId', auth, addLike);
router.delete('/music/like/:MusicId', auth, removeLike);

// ------------------------------------------------
// Playlist
// ------------------------------------------------

router.post('/user/playlist/:MusicId', auth, addPlaylist);
router.delete('/user/playlist/:MusicId', auth, removePlaylist);

// ------------------------------------------------
// Auth
// ------------------------------------------------

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth', auth, premium, loadUser);

// ------------------------------------------------
// Administration
// ------------------------------------------------

router.post('/admin/:id', auth, adminAuth, approvePayment);
router.put('/admin/:id', auth, adminAuth, rejectPayment);

// ------------------------------------------------
// File
// ------------------------------------------------

router.get('/file/:file', fileDownload);

module.exports = router;
