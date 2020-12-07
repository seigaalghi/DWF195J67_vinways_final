const { Music, Artist, User } = require('../../models');
const Joi = require('joi');

// =================================================================================
// GET MUSICS
// =================================================================================

exports.getMusics = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await User.findOne({ where: { id } });
    const until = new Date(user.until).getTime();
    const now = Date.now();
    if (until < now) {
      const musics = await Music.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'artistId', 'audio'],
        },
        include: [
          {
            model: User,
            through: { attributes: [] },
            as: 'likes',
            attributes: ['id', 'name'],
          },
          {
            model: Artist,
            as: 'artist',
            attributes: ['id', 'name'],
          },
        ],
      });
      return res.status(200).json({
        status: 'success',
        message: 'Musics loaded successfully',
        data: {
          musics,
        },
      });
    } else {
      const musics = await Music.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'artistId'],
        },
        include: [
          {
            model: User,
            through: { attributes: [] },
            as: 'likes',
            attributes: ['id', 'name'],
          },
          {
            model: Artist,
            as: 'artist',
            attributes: ['id', 'name'],
          },
        ],
      });
      return res.status(200).json({
        status: 'success',
        message: 'Musics loaded successfully',
        data: {
          musics,
        },
      });
    }
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
// GET MUSIC BY ID
// =================================================================================

exports.getMusic = async (req, res) => {
  const id = req.params.id;
  try {
    const music = await Music.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: User,
          through: { attributes: [] },
          as: 'likes',
          attributes: ['id', 'name'],
        },
        {
          model: Artist,
          as: 'artist',
          attributes: ['id', 'name'],
        },
      ],
    });

    if (!music) {
      res.status(400).json({
        status: 'failed',
        message: `No Music Found with ID of ${id}`,
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Music loaded successfully',
      data: {
        music,
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
// POST MUSIC
// =================================================================================

exports.postMusic = async (req, res) => {
  const body = req.body;
  const file = req.files;
  try {
    const schema = Joi.object({
      title: Joi.string().required(),
      artistId: Joi.string().required(),
      year: Joi.string().required(),
      img: Joi.string().required(),
      audio: Joi.string().required(),
    });

    const { error } = schema.validate(
      {
        ...req.body,
        audio: file.audio ? file.audio[0].filename : null,
        img: file.img ? file.img[0].filename : null,
      },
      { abortEarly: false }
    );

    if (error) {
      return res.status(400).send({
        status: 'failed',
        message: error.details[0].message,
        errors: error.details.map((detail) => detail.message),
      });
    }

    const music = await Music.create({
      title: body.title,
      artistId: body.artistId,
      year: body.year,
      img: file.img[0].filename,
      audio: file.audio[0].filename,
    });

    if (!music) {
      res.status(400).json({
        status: 'failed',
        message: 'Failed to add music, please try again',
      });
    }

    const response = await Music.findOne({
      where: { id: music.id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: User,
          through: { attributes: [] },
          as: 'likes',
          attributes: ['id', 'name'],
        },
        {
          model: Artist,
          as: 'artist',
          attributes: ['id', 'name'],
        },
      ],
    });

    res.status(200).json({
      status: 'success',
      message: 'Music added successfully',
      data: {
        music: response,
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
// EDIT MUSIC
// =================================================================================

exports.putMusic = async (req, res) => {
  const body = req.body;
  const file = req.files;
  const id = req.params.id;
  try {
    const schema = Joi.object({
      title: Joi.string().required(),
      artistId: Joi.number().required(),
      year: Joi.string().required(),
      img: Joi.string().required(),
      audio: Joi.string().required(),
    });

    const { error } = schema.validate(
      {
        ...req.body,
        audio: file.audio ? file.audio[0].filename : null,
        img: file.img ? file.img[0].filename : null,
      },
      { abortEarly: false }
    );

    if (error) {
      return res.status(400).send({
        status: 'failed',
        message: error.details[0].message,
        errors: error.details.map((detail) => detail.message),
      });
    }

    const music = await Music.update(
      {
        title: body.title,
        artistId: body.artistId,
        year: body.year,
        img: file.img[0].filename,
        audio: file.audio[0].filename,
      },
      {
        where: {
          id: id,
        },
      }
    );

    if (!music) {
      return res.status(400).json({
        status: 'failed',
        message: 'Failed to edit music, Please Try Again',
      });
    }

    const response = await Music.findOne({
      where: { id: id },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'artistId'],
      },
      include: [
        {
          model: User,
          through: { attributes: [] },
          as: 'likes',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Artist,
          as: 'artist',
          attributes: ['id', 'name'],
        },
      ],
    });

    res.status(200).json({
      status: 'success',
      message: 'Music edited successfully',
      data: {
        music: response,
      },
    });
  } catch (error) {
    console.log(error);
    res.satus(500).json({
      error: {
        message: 'Internal Server Error',
      },
    });
  }
};

// =================================================================================
// DELETE MUSIC
// =================================================================================

exports.deleteMusic = async (req, res) => {
  const id = req.params.id;
  try {
    const music = await Music.findOne({ where: { id } });
    if (!music) {
      res.status(400).json({
        status: 'failed',
        message: `No Music with ID of ${id}`,
      });
    }

    const remove = await Music.destroy({ where: { id } });

    if (!remove) {
      res.status(400).json({
        status: 'failed',
        message: 'Failed to delete the music',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Music deleted Successfuly',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      error: {
        message: 'Internal Server Error',
      },
    });
  }
};
