const app = require('./middlewares').prototype.middleware_principal()

app.listen(3000, () => console.log("Servidor corriendo en el puerto : "+3000))

module.exports = app