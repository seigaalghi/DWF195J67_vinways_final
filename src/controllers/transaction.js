const { Transaction, User } = require('../../models');
const Joi = require('joi');

// =================================================================================
// GET TRANSACTIONS
// =================================================================================

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'userId'],
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'until', 'premium'],
        },
      ],
    });
    res.status(200).json({
      status: 'success',
      message: 'Transactions loaded successfully',
      data: {
        transactions,
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
// GET TRANSACTION BY ID
// =================================================================================

exports.getTransaction = async (req, res) => {
  const id = req.params.id;
  try {
    const transaction = await Transaction.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'until'],
        },
      ],
    });

    if (!transaction) {
      res.status(400).json({
        status: 'failed',
        message: `No transaction found with ID of ${id}`,
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Transaction loaded successfully',
      data: {
        transaction,
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
// POST TRANSACTION
// =================================================================================

exports.postTransaction = async (req, res) => {
  const body = req.body;
  const file = req.files;
  const userId = req.user.id;
  try {
    const schema = Joi.object({
      account: Joi.string().required(),
      userId: Joi.number().required(),
      img: Joi.string().required(),
    });

    const { error } = schema.validate(
      {
        ...req.body,
        img: file.img ? file.img[0].filename : null,
        userId,
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

    const transaction = await Transaction.create({
      account: body.account,
      userId,
      img: file.img[0].filename,
    });

    if (!transaction) {
      res.status(400).json({
        status: 'failed',
        message: 'Failed to add transaction, please try again',
      });
    }

    const response = await Transaction.findOne({
      where: { id: transaction.id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'until'],
        },
      ],
    });

    res.status(200).json({
      status: 'success',
      message: 'Transaction added successfully',
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
// EDIT TRANSACTION
// =================================================================================

exports.putTransaction = async (req, res) => {
  const body = req.body;
  const file = req.files;
  const id = req.params.id;
  try {
    const schema = Joi.object({
      account: Joi.string().required(),
      userId: Joi.number().required(),
      img: Joi.string().required(),
    });

    const { error } = schema.validate(
      {
        ...req.body,
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

    const transaction = await Transaction.update(
      {
        account: body.account,
        userId: body.userId,
        img: file.img[0].filename,
      },
      {
        where: {
          id,
        },
      }
    );

    if (!transaction) {
      return res.status(400).json({
        status: 'failed',
        message: 'Failed to edit transaction, please try again',
      });
    }

    const response = await Transaction.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email', 'until'],
        },
      ],
    });

    res.status(200).json({
      status: 'success',
      message: 'Transaction edited successfully',
      data: {
        transaction: response,
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

exports.deleteTransaction = async (req, res) => {
  const id = req.params.id;
  try {
    const transaction = await Transaction.findOne({ where: { id } });
    if (!transaction) {
      res.status(400).json({
        status: 'failed',
        message: `No transaction with ID of ${id}`,
      });
    }

    const remove = await Transaction.destroy({ where: { id } });

    if (!remove) {
      res.status(400).json({
        status: 'failed',
        message: 'Failed to delete the transaction',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Transaction deleted successfully',
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
