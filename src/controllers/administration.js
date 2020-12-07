const { User, Transaction } = require('../../models');

// =================================================================================
// APPROVE
// =================================================================================

exports.approvePayment = async (req, res) => {
  const userId = req.body.userId;
  const transactionId = req.params.id;
  try {
    const user = await User.findOne({ where: { id: userId } });

    const transaction = await Transaction.findOne({ where: { id: transactionId } });

    const until = new Date(user.until).getTime();

    const now = Date.now();

    if (until < now && transaction.status !== 'APPROVED') {
      const days = Date.now() / (24 * 60 * 60 * 1000) + 30;

      const millisecond = days * (24 * 60 * 60 * 1000);

      const date = new Date(millisecond);

      await User.update({ until: date, premium: true }, { where: { id: userId } });

      await Transaction.update({ status: 'APPROVED' }, { where: { id: transactionId } });

      const response = await Transaction.findOne({
        where: { id: transactionId },

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

      return res.status(200).json({
        status: 'success',
        message: 'Approved',
        data: {
          transaction: response,
        },
      });
    } else if (until > now && transaction.status !== 'APPROVED') {
      const days = new Date(user.until).getTime() / (24 * 60 * 60 * 1000) + 30;

      const millisecond = days * (24 * 60 * 60 * 1000);

      const date = new Date(millisecond);

      await User.update({ until: date, premium: true }, { where: { id: userId } });

      await Transaction.update({ status: 'APPROVED' }, { where: { id: transactionId } });

      const response = await Transaction.findOne({
        where: { id: transactionId },

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

      return res.status(200).json({
        status: 'success',
        message: 'Approved',
        data: {
          transaction: response,
        },
      });
    } else {
      return res.status(400).json({
        status: 'success',
        message: 'Transaction has been approved',
      });
    }
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
// REJECT
// =================================================================================

exports.rejectPayment = async (req, res) => {
  const userId = req.body.userId;
  const transactionId = req.params.id;
  try {
    const user = await User.findOne({ where: { id: userId } });
    const transaction = await Transaction.findOne({ where: { id: transactionId } });
    if (transaction.status === 'PENDING') {
      await Transaction.update({ status: 'REJECTED' }, { where: { id: transactionId } });

      const response = await Transaction.findOne({
        where: { id: transactionId },

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

      return res.status(200).json({
        status: 'success',
        message: 'Transaction Rejected',
        data: {
          transaction: response,
        },
      });
    } else if (transaction.status === 'APPROVED') {
      const days = new Date(user.until).getTime() / (24 * 60 * 60 * 1000) - 30;

      const millisecond = days * (24 * 60 * 60 * 1000);

      const date = new Date(millisecond);

      await User.update({ until: date }, { where: { id: userId } });

      await Transaction.update({ status: 'REJECTED' }, { where: { id: transactionId } });

      const response = await Transaction.findOne({
        where: { id: transactionId },

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

      return res.status(200).json({
        status: 'success',
        message: 'Transaction Rejected',
        data: {
          transaction: response,
        },
      });
    } else {
      return res.status(400).json({
        status: 'failed',
        message: 'Transaction has been rejected',
      });
    }
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
