const { Like, Music, User, Artist } = require('../../models');

// =================================================================================
// ADD LIKE
// =================================================================================

exports.addLike = async (req, res) => {
  const { MusicId } = req.params;
  const UserId = req.user.id;
  try {
    const check = await Like.findOne({ where: { UserId, MusicId } });

    if (check) {
      return res.status(400).json({
        status: 'failed',
        message: 'Already liked',
      });
    }

    const like = await Like.create({
      UserId: UserId,
      MusicId: MusicId,
    });

    if (!like) {
      return res.status(400).json({
        status: 'failed',
        message: 'Failed to add like, please try again',
      });
    }

    const response = await Music.findOne({
      where: { id: MusicId },
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
      message: 'Liked Successfully',
      data: {
        like: response,
      },
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

// =================================================================================
// REMOVE LIKE
// =================================================================================

exports.removeLike = async (req, res) => {
  const { MusicId } = req.params;
  const UserId = req.user.id;
  try {
    const check = await Like.findOne({ where: { UserId, MusicId } });

    if (!check) {
      return res.status(400).json({
        status: 'failed',
        message: 'Not Liked yet',
      });
    }

    const like = await Like.destroy({ where: { UserId, MusicId } });

    if (!like) {
      return res.status(400).json({
        status: 'failed',
        message: 'Failed to remove like, please try again',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Disiked Successfully',
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
