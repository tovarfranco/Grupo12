// =========== Require's ==============================
const fs = require('fs');                                                        // Para la lectura y escritura de archivos.
const path = require('path');                                                    // Manejo de rutas.

// =========== Lectura BBDD ===========================
const productListPath = path.join(__dirname, "../database/productList.json");    // Ruta del archivo BBDD.
let productList = JSON.parse(fs.readFileSync(productListPath, 'utf-8'));         // Importamos la BBDD que se pasará a las vistas. Lista de objetos.

// =========== Controlador ===========================
const indexController = {
    index: (req,res) => {                                     // ACA se pone el callback que sacamos de ROUTES. Este será el encargado de generar la respuesta.
        res.render('index', {productList: productList});      // ESTE ES UN .EJS (modificar los .html a .ejs). Es NECESARIO setear el VIEW ENGINE en app.js para usar res.render(). // Le envía a ESTA view las variables dinámicas que necesita.
    },
    login: (req,res) => {
        res.render('login');
    },
    register: (req,res) => {
        res.render('register');
    },

    search: (req, res) => {
		let busqueda = req.query.keyword.toLowerCase();
		let resultadoBusqueda = productList.filter(product => product.name.toLowerCase().includes(busqueda))
		res.render('results', {resultadoBusqueda: resultadoBusqueda, 
							   busqueda: busqueda});
	},

    // search: (req, res) => {
	// 	let busqueda = req.query.keyword.toLowerCase();        // De esta forma leo lo que viene en la URL (query string) y lo paso a minúsculas.
	// 	let resultadoBusqueda = productList.filter(product => {
    //         let lowerName = product.name.toLowerCase();
    //         return lowerName.includes(busqueda);
    //     })


	// 	res.render('results', {resultadoBusqueda: resultadoBusqueda, 
	// 						   busqueda: busqueda});
	// },


    crud: (req,res) => {
        res.render('crud');
    }
}

module.exports = indexController                             // Siempre exportarlo porque lo necesitaremos usar en el ROUTES para que sepa a qué controlador enviar la petición.