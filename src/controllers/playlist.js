const { Playlist, User, Music, Transaction, Artist } = require('../../models');

// =================================================================================
// ADD PLAYLIST
// =================================================================================

exports.addPlaylist = async (req, res) => {
  const { MusicId } = req.params;
  const UserId = req.user.id;
  try {
    const check = await Playlist.findOne({ where: { UserId, MusicId } });

    if (check) {
      return res.status(400).json({
        status: 'failed',
        message: 'Already added to playlist',
      });
    }

    const playlist = await Playlist.create({
      UserId: UserId,
      MusicId: MusicId,
    });

    if (!playlist) {
      return res.status(400).json({
        status: 'failed',
        message: 'Failed to add to playlist, please try again',
      });
    }

    const response = await User.findOne({
      where: { id: UserId },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
      include: [
        {
          model: Music,
          through: { attributes: [] },
          as: 'playlists',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: [
            {
              model: Artist,
              as: 'artist',
              attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
            {
              model: User,
              as: 'likes',
              attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
          ],
        },
        {
          model: Transaction,
          as: 'transactions',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
    });

    res.status(200).json({
      status: 'success',
      message: 'Added Successfully',
      data: {
        user: response,
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
// REMOVE PLAYLIST
// =================================================================================

exports.removePlaylist = async (req, res) => {
  const { MusicId } = req.params;
  const UserId = req.user.id;
  try {
    const check = await Playlist.findOne({ where: { UserId, MusicId } });

    if (!check) {
      return res.status(400).json({
        status: 'failed',
        message: 'Not added to playlist yet',
      });
    }

    const like = await Playlist.destroy({ where: { UserId, MusicId } });

    if (!like) {
      return res.status(400).json({
        status: 'failed',
        message: 'Failed to remove from playlist, please try again',
      });
    }

    const response = await User.findOne({
      where: { id: UserId },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
      include: [
        {
          model: Music,
          through: { attributes: [] },
          as: 'playlists',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: [
            {
              model: Artist,
              as: 'artist',
              attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
            {
              model: User,
              as: 'likes',
              attributes: { exclude: ['createdAt', 'updatedAt'] },
            },
          ],
        },
        {
          model: Transaction,
          as: 'transactions',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
    });

    res.status(200).json({
      status: 'success',
      message: 'Removed Successfully',
      data: {
        user: response,
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
