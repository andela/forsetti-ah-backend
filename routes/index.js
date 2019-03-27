const router = require("express").Router();

router.use("/api", require("./api"));

router.use('*', (req, res) => {
  res.status(200).json({ message: 'Welcome to forsetti-ah-backend API' });
});

module.exports = router;
