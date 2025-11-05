const Product = require("../models/productModel")

const getProduct = async (req, res) => {
    try {
        const product = await Product.find();

        if(!product) {
            res.status(400);
            throw new Error("product not found bro")
        }
        return res.status(200).json(product);
    } catch (error) {
        next(error)
    }
};

//create product
const createProduct = async(req, res, next ) => {
   try{
    //validate data from user w joi
    const product = await Product.create(req.body);

    if(!product) {
        res.status(400);
        throw new Error("there was a problem while creating ");
    }
    return res.status(201).json(product);
   } catch (error) {
    next(error);
   }
};

// update product
const updateProduct = async(req,res, next) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );

        if(!updatedProduct) {
            res.status(400);
            throw new Error("cant Upd this product");
        }

        return res.status(200).json(updatedProduct);

    } catch (error) {
        next(error);
    }
};

const deleteProduct = async(req, res, next) => {

    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product) {
            res.status(400);
          throw new Error("Product alr deleted");
        }

        return res.status(200).json({id: req.params.id});
    } catch(error){
        next(error)
    }
}

 // get haircut
// const getHaircut = async(req, res, next) => {
//     try {
//         const haircut = await Product.findById(req.params.id);

//         if (!haircut) {
//             res.status(400);
//             throw new Error("Product not found");
//         }
//     } catch (error) {
//         next(error)
//     }
// }

module.exports = {
    getProduct,
    createProduct,
    // getHaircut,
    updateProduct,
    deleteProduct,
}