const { User } = require('../models');

exports.premium = async (req, res, next) => {
  const { id } = req.user;

  try {
    const user = await User.findOne({ where: { id } });

    const now = Date.now();
    const until = new Date(user.until).getTime();
    console.log(until);

    if (until < now) {
      const premium = await User.update({ premium: false }, { where: { id } });

      if (!premium) {
        res.status(400).json({
          status: 'failed',
          message: 'Failed to update user subscription state',
        });
      }
    } else if (until > now) {
      const premium = await User.update({ premium: true }, { where: { id } });
      if (!premium) {
        res.status(400).json({
          status: 'failed',
          message: 'Failed to update user subscription state',
        });
      }
    }
    next();
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
