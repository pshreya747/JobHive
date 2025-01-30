import {Company} from "../models/company.model.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
export const registerCompany = async(req,res)=>{
    try {
        const{companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message:"Company name is required.",
                success:false
            });
        }
        let company = await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({
                message:"You can't register the same company.",
                success:false
            })
        };
        company = await Company.create({
            name:companyName,
            userId:req.id
        });
        return res.status(201).json({
            message:"Company registered successfully.",
            company,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
export const getCompany = async(req,res)=>{
    try {
        const userId = req.id; //Logged in userid
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(404).json({
                message:"Companies not found.",
                success:false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

//get company by id
export const getCompanyById = async (req,res)=>{
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message:"Company not found.",
                success:false
            })
        }
        return res.status(200).json({
            company,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;

        if (!name || !description || !website || !location) {
            return res.status(400).json({
                message: "All fields are required.",
                success: false
            });
        }

        let logo = null;
        if (file) {
            // Generate Data URI from the file
            const fileUri = getDataUri(file);
            // Upload to Cloudinary
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            logo = cloudResponse.secure_url;
        }

        const updateData = { name, description, website, location };
        if (logo) {
            updateData.logo = logo;
        }

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
        
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        return res.status(200).json({
            message: "Company information updated.",
            company,
            success: true
        });
    } catch (error) {
        console.error(error); // Use console.error for better error logging
        return res.status(500).json({
            message: "Internal Server Error.",
            success: false
        });
    }
};