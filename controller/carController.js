const { Car } = require("../models");
const imagekit = require("../lib/imagekit");

async function getAllCars(req, res) {
    try {
        const cars = await Car.findAll();

        res.status(200).json({
            status: "200",
            message: "Success get cars data",
            isSuccess: true,
            data: { cars },
        });
    } catch (error) {
        res.status(500).json({
            status: "500",
            message: "Failed to get cars data",
            isSuccess: false,
            error: error.message,
        });
    }
}

async function getCarById(req, res) {
    const id = req.params.id;
    try {
        const car = await Car.findByPk(id);

        if (!car) {
            return res.status(404).json({
                status: "404",
                message: "Car Not Found!",
            });
        }

        res.status(200).json({
            status: "200",
            message: "Success get cars data",
            isSuccess: true,
            data: { car },
        });
    } catch (error) {
        res.status(500).json({
            status: "500",
            message: "Failed to get cars data",
            isSuccess: false,
            error: error.message,
        });
    }
}

async function deleteCarById(req, res) {
    const id = req.params.id;
    try {
        const car = await Car.findByPk(id);

        if (car) {
            await car.destroy();

            res.status(200).json({
                status: "200",
                message: "Success get cars data",
                isSuccess: true,
                data: { car },
            });
        } else {
            res.status(404).json({
                status: "404",
                message: "Car Not Found!",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "500",
            message: "Failed to get cars data",
            isSuccess: false,
            error: error.message,
        });
    }
}

async function updateCar(req, res) {
    const id = req.params.id;
    const { plate, model, type, year } = req.body;

    try {
        const car = await Car.findByPk(id);

        if (car) {
            car.plate = plate;
            car.model = model;
            car.type = type;
            car.year = year;

            await car.save();

            res.status(200).json({
                status: "200",
                message: "Success get cars data",
                isSuccess: true,
                data: { car },
            });
        } else {
            res.status(404).json({
                status: "404",
                message: "Car Not Found!",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "500",
            message: "Failed to get cars data",
            isSuccess: false,
            error: error.message,
        });
    }
}

async function createCar(req, res) {
    const imgUrl = [];
    const requestBody = req.body;
    const files = req.files;

    try {
        const uploadingFile = files.map(async (file, index) => {
            const split = file.originalname.split(".");
            // get extension
            const ext = split[split.length - 1];
            const filename = split[0];

            // upload into imagekit
            const uploadedImage = await imagekit.upload({
                file: file.buffer,
                fileName: `${filename}-${Date.now()}.${ext}`,
            });

            imgUrl.push(uploadedImage.url);
        });

        // Wait for all file are succesfully uploaded
        await Promise.all(uploadingFile);

        const newCar = await Car.create({ ...requestBody, images: imgUrl });

        res.status(200).json({
            status: "Success",
            message: "Ping successfully",
            isSuccess: true,
            data: { car: newCar },
        });
    } catch (error) {
        res.status(500).json({
            status: "500",
            message: "Failed to get cars data",
            isSuccess: false,
            error: error.message,
        });
    }
}

module.exports = {
    createCar,
    getAllCars,
    getCarById,
    deleteCarById,
    updateCar,
};
