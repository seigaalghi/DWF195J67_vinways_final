const { Artist, Music, User } = require('../../models');
const Joi = require('joi');

// =================================================================================
// GET ARTIST
// =================================================================================

exports.getArtists = async (req, res) => {
  try {
    const artists = await Artist.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: { model: Music, as: 'musics', attributes: { exclude: ['createdAt', 'updatedAt'] } },
    });
    res.status(200).json({
      status: 'success',
      message: 'Artist loaded successfully',
      data: {
        artists,
      },
    });
  } catch (error) {
    console.log(error);
    res.satus(500).json({
      status: 'error',
      error: {
        message: 'Internal Server Error',
      },
    });
  }
};

// =================================================================================
// GET ARTIST BY ID
// =================================================================================

exports.getArtist = async (req, res) => {
  const id = req.params.id;
  try {
    const artist = await Artist.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: {
        model: Music,
        include: [
          { model: User, as: 'likes', attributes: ['id', 'name'], through: { attributes: [] } },
          { model: Artist, as: 'artist', attributes: { exclude: ['createdAt, updatedAt'] } },
        ],
        as: 'musics',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
      },
    });

    if (!artist) {
      res.status(400).json({
        status: 'failed',
        message: `No Artist Found with ID of ${id}`,
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Artist loaded successfully',
      data: {
        artist,
      },
    });
  } catch (error) {
    console.log(error);
    res.satus(500).json({
      status: 'error',
      error: {
        message: 'Internal Server Error',
      },
    });
  }
};

// =================================================================================
// POST ARTIST
// =================================================================================

exports.postArtist = async (req, res) => {
  const body = req.body;
  const file = req.files;
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      age: Joi.number().required(),
      type: Joi.string().required(),
      start: Joi.number().required(),
      img: Joi.string().required(),
    });

    const { error } = schema.validate({ ...req.body, img: file.img ? file.img[0].filename : null }, { abortEarly: false });

    if (error) {
      return res.status(400).send({
        status: 'failed',
        message: error.details[0].message,
        errors: error.details.map((detail) => detail.message),
      });
    }

    const artist = await Artist.create({
      name: body.name,
      img: file.img[0].filename,
      age: body.age,
      type: body.type,
      start: body.start,
    });

    if (!artist) {
      return res.status(400).json({
        status: 'failed',
        message: 'Failed to add artist please try again',
      });
    }

    const response = await Artist.findOne({
      where: { id: artist.id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: { model: Music, as: 'musics', attributes: { exclude: ['createdAt', 'updatedAt'] } },
    });

    res.status(200).json({
      status: 'success',
      message: 'Artist added successfully',
      data: {
        artist: response,
      },
    });
  } catch (error) {
    console.log(error);
    res.satus(500).json({
      status: 'error',
      error: {
        message: 'Internal Server Error',
      },
    });
  }
};

// =================================================================================
// PUT ARTIST
// =================================================================================

exports.putArtist = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const file = req.files;
  try {
    const schema = Joi.object({
      name: Joi.string().required(),
      age: Joi.number().required(),
      type: Joi.string().required(),
      start: Joi.number().required(),
    });

    const { error } = schema.validate({ ...req.body, img: file.img ? file.img[0].filename : null }, { abortEarly: false });

    if (error) {
      return res.status(400).send({
        status: 'failed',
        message: error.details[0].message,
        errors: error.details.map((detail) => detail.message),
      });
    }
    const artist = await Artist.update(
      {
        name: body.name,
        img: file.img[0].filename,
        age: body.age,
        start: body.start,
        type: body.type,
        updatedAt: new Date(),
      },
      {
        include: 'musics',
        where: { id: id },
      }
    );

    if (!artist) {
      return res.status(400).json({
        status: 'failed',
        message: 'Failed to edit artist please try again',
      });
    }

    const response = await Artist.findOne({
      where: { id: id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: { model: Music, as: 'musics', attributes: { exclude: ['createdAt', 'updatedAt'] } },
    });

    res.status(200).json({
      status: 'success',
      message: 'Artist edited successfully',
      data: {
        artist: response,
      },
    });
  } catch (error) {
    console.log(error);
    res.satus(500).json({
      status: 'error',
      error: {
        message: 'Internal Server Error',
      },
    });
  }
};

// =================================================================================
// DELETE ARTIST
// =================================================================================

exports.deleteArtist = async (req, res) => {
  const id = req.params.id;
  try {
    await Artist.destroy({ where: { id: id } });
    res.status(200).json({
      status: 'success',
      message: 'Artist deleted successfully',
    });
  } catch (error) {
    console.log(error);
    res.satus(500).json({
      status: 'error',
      error: {
        message: 'Internal Server Error',
      },
    });
  }
};
