const jwt = require('jsonwebtoken');
const secret = process.env.SECRET_TOKEN;
const { User } = require('../models');

exports.auth = async (req, res, next) => {
  const header = req.header('Authorization');
  if (!header) {
    return res.status(400).json({
      status: 'failed',
      message: 'No token! Authorization denied',
    });
  }

  const token = header.replace('Bearer ', '');

  console.log(token);

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      status: 'failed',
      message: 'Invalid Token',
    });
  }
};

exports.adminAuth = async (req, res, next) => {
  const user = req.user;
  try {
    if (!user) {
      return res.status(400).json({
        status: 'failed',
        message: 'No token! Authorization denied',
      });
    }

    const admin = await User.findOne({ where: { id: user.id } });

    if (!admin) {
      return res.status(400).json({
        status: 'failed',
        message: 'No user! Admin authorization denied',
      });
    }

    if (admin.admin !== true) {
      return res.status(400).json({
        status: 'failed',
        message: 'Resctricted, you are not admin',
      });
    }

    next();
  } catch (error) {
    res.status(401).json({
      status: 'failed',
      message: 'Invalid Token',
    });
  }
};
