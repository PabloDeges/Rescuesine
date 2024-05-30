const path = require('path');

const getMainPageImage = async (req,res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '..','uploads', filename);
    
    res.sendFile(filepath, err => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(404).send('File not found');
      }
    });
  }

  module.exports = {
    getMainPageImage,
  }