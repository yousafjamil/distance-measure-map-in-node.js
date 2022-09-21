const { Quize, validate } = require("../models/quiz");

const createQuize = async (req, res, next) => {


    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        const quize = await Quize.create({ ...req.body, owner: req.user.id });

        res.status(200).json({ message: "quize successfully created", quize });
    } catch (error) {
        next(error)
    }
};

// get quize
const getQuize = async (req, res, next) => {
    try {
        const quize = await Quize.findById(req.params.id,{answers:0,isPublish:0,owner:0});
        
        if (!quize) return res.status(404).json({ message: "Quize not found" });

        res.status(201).json({ success: true, quize })

    } catch (error) {
        next(error)
    }
}

//  publish  quize
const  publishQuize=async(req,res,next)=>{
    try {
        const quize=await Quize.findById(req.params.id);
        if (!quize) return res.status(404).json({ message: "Quize not found" });
        // if (quize.isPublish) {
        //     return res.status(404).json({ message: "you can not update the published quize" });
        // }
        
        if (!req.user.isAdmin ) {
            return res.status(404).json({ message: "you are not the Authorized to publish the quize." });
        }else{
            quize.isAdmin=true;
           await quize.save()
           return res.status(200).json({ message: "Quize successfully published" });
        }
        
    } catch (error) {
        next(error)
    }
}
// update quize
const updateQuize = async (req, res, next) => {
    try {

        const quize = await Quize.findById(req.params.id);
        if (!quize) return res.status(404).json({ message: "quize not found" });
        if (quize.isPublish) {
            return res.status(404).json({ message: "you can not update the published quize" });
        }

        if (req.user.id !== quize.owner.toString()) {
            return res.status(404).json({ message: "you can not update the quize" });
        } else {
            quize.questions_list = req.body.questions_list;
            quize.name = req.body.name;
            quize.answers = req.body.answers;
            quize.isPublish = req.body.isPublish

            await quize.save()
            res.status(200).json({ message: "quize successfully updated", quize })
        }
    } catch (error) {
        next(error)
    }
};


// delete quize
const deleteQuize = async (req, res, next) => {
    try {
        const quize = await Quize.findById(req.params.id);

        if (!quize) return res.status(404).json({ message: "quize not found" });

        if (quize.isPublish) {
            return res.status(404).json({ message: "you can not delete the published quize" });
        }
        if (req.user.id !== quize.owner.toString()) {
            return res.status(404).json({ message: "you are not the admin to  quize" });
        } else {
       await   Quize.findByIdAndDelete(req.params.id)
            // await deletedQuize.save();
        return     res.status(200).json({ message: "quize successfully deleted" });
        }

    } catch (error) {
        next(error)
    }
}

module.exports = {
    createQuize,
    getQuize,
    updateQuize,
    deleteQuize,
    publishQuize
}