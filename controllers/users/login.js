const login = async (req, res) => {
  res.status(200).json({"message": "You have successfully reached login endpoint"})
}

module.exports = {login};