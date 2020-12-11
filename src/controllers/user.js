const { Transaction, User, Music } = require('../../models');
const Joi = require('joi');

// =================================================================================
// GET USERS
// =================================================================================

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
      include: [
        {
          model: Music,
          through: { attributes: [] },
          as: 'playlists',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: Transaction,
          as: 'transactions',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
      order: [
        ['createdAt', 'DESC'],
        [{ model: Music, as: 'playlists' }, 'createdAt', 'DESC'],
        [{ model: Transaction, as: 'transactions' }, 'createdAt', 'DESC'],
      ],
    });
    res.status(200).json({
      status: 'success',
      message: 'Users loaded successfully',
      data: {
        users,
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
// GET USER BY ID
// =================================================================================

exports.getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({
      where: { id },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'password'],
      },
      include: [
        {
          model: Music,
          through: { attributes: [] },
          as: 'playlists',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: Transaction,
          as: 'transactions',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
      order: [
        ['createdAt', 'DESC'],
        [{ model: Music, as: 'playlists' }, 'createdAt', 'DESC'],
        [{ model: Transaction, as: 'transactions' }, 'createdAt', 'DESC'],
      ],
    });

    if (!user) {
      res.status(400).json({
        status: 'failed',
        message: `No user found with ID of ${id}`,
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'User loaded successfully',
      data: {
        user,
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
// DELETE USER
// =================================================================================

exports.deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ where: { id } });

    if (!user) {
      res.status(400).json({
        status: 'failed',
        message: `No Music with ID of ${id}`,
      });
    }

    const remove = await User.destroy({ where: { id } });

    if (!remove) {
      res.status(400).json({
        status: 'failed',
        message: 'Failed to delete the user',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'User deleted Successfuly',
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
