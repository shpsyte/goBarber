const path = require('path')

class FileController {
  show(req, res) {
    const { file } = req.params
    // recupera o caminho completo do arquivo salvo na máquina
    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      'tmp',
      'uploads',
      file
    )
    return res.sendFile(filePath)
  }
}
module.exports = new FileController()
