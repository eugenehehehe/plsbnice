const coffee = require('../models/index').coffee
const path = require(`path`)
const Op = require(`sequelize`).Op
const fs = require(`fs`)
const upload = require('./upload-image').single("filename")
const sequelize = require(`sequelize`)

exports.searchCoffee = async (request, response) => {
    let search = request.params.search
    let data = await coffee.findAll({
        where: {
            [Op.or]: [
                { name: { [Op.substring]: search } },
                { size: { [Op.substring]: search } },
                { price: { [Op.substring]: search } },
            ]
        }
    })
    return response.json({
        success: true,
        data: data,
        message: `Coffee has retrived`
    })
}

exports.addCoffee = async (request, response) => {
    upload(request, response, async error => {
        if (error) {
            return response.json({ message: error })
        }
        if (!request.file) {
            return response.json({ message: "No file" })
        }

        let newCoffee = {
            name: request.body.name,
            size: request.body.size,
            price: request.body.price,
            image: request.file.filename
        };

        // required field is missing
        if (!newCoffee.name || !newCoffee.size || !newCoffee.price || !newCoffee.image) {
            return response.status(400).json({ message: "data harus diisi!" });
        }

        console.log(newCoffee);

        coffee.create(newCoffee)
            .then(result => {
                return response.json({
                    status: true,
                    data: result,
                    message: "Coffee has been created"
                });
            })
            .catch(error => {
                return response.json({
                    status: false,
                    message: error.message
                });
            });
    });
};


exports.updateCoffee = async (request, response) => {
    upload(request, response, async error => {
        if (error) {
            return response.json({ message: error })
        }
        let id = request.params.id
        let updatedCoffee = {
            name: request.body.name,
            size: request.body.size,
            price: request.body.price,
            // image: request.file.filename
        }
        if (request.file) {
            const cariCoffee = await coffee.findOne({
                where: { id: id }
            })
            const fotolama = cariCoffee.image
            const pathfoto = path.join(__dirname, `../image`, fotolama)
            if (fs.existsSync(pathfoto)) {
                fs.unlinkSync(pathfoto, error => console.log(error))
            }
            cariCoffee.image = request.file.filename
        }
        coffee.update(updatedCoffee, { where: { id: id } })
            .then(result => {
                if (result[0] === 1) {
                    return coffee.findByPk(id)
                        .then(updatedCoffee => {
                            return response.json({
                                success: true,
                                data: updatedCoffee,
                                message: 'Coffee has updated'
                            })
                        })
                        .catch(error => {
                            return response.json({
                                success: false,
                                message: error.message
                            })
                        })
                } else {
                    return response.json({
                        success: false,
                        message: 'Coffee not found'
                    })
                }
            })
            .catch(error => {
                return response.json({
                    success: false,
                    message: error.message
                })
            })
    })
}

exports.deleteCoffee = async (request, response) => {
    const id = request.params.id
    const kopi = await coffee.findOne({ where: { id: id } })
    const oldPhoto = kopi.image;
    const pathFoto = path.join(__dirname, '../image', oldPhoto)

    if (fs.existsSync(pathFoto)) {
        fs.unlinkSync(pathFoto, (error) => console.log(error))
    }

    coffee.destroy({ where: { id: id } })
        .then(result => {
            return response.json({
                success: true,
                data: kopi,
                message: `Coffee has deleted`
            })
        })
        .catch(error => {
            return response.json({
                status: false,
                message: error.message
            })
        })
}

