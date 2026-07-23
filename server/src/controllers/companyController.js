import Company from '../models/companyModel.js';
import User from '../models/userModel.js';


export const registerCompany = async (req, res) => {
     console.log("➡️ Incoming Data:", req.body);
     console.log("➡️ Uploaded File:", req.file);
     console.log(req.user)
    const { name, website, location, industry, about, noOfEmployees, established} = req.body;

    // validation
    if (!name || !website || !location || !industry || !about || !noOfEmployees || !established ) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const companyName = await Company.findOne({ name:name });
    if (companyName) {
      return res.status(400).json({ success: false, message: "Company already exists" });
    }
    const  user =   req.user._id ||"652f1a9c8a1b2e0012345678";
    // req.user._id ||
    if(!user){
      return res.status(401).json({ success: false, message: "Unauthorized: User not found" });
    }
    const company = new Company({
      name,
      logo: req.file?.path,
      website,
      location,
      industry,
      about,
      noOfEmployees,
      established,
      userId: user,
    });
    console.log(user)
    await company.save();
    await User.findByIdAndUpdate(user, { $push: { company: company._id } });
    
    res.status(201).json({
      success: true,
      message: "Company registered successfully",
      company,
    });
};

//get ALl componies 

export const getCompany = async(req, res) => {
      
            const userId = req.user._id || "652f1a9c8a1b2e0012345678" ; // logged in user id
            const companies = await Company.find({ userId });
            if (!companies) {
                return res.status(404).json({
                    message: "Companies not found.",
                    success: false
                })
            }
            return res.status(200).json({
                companies,
                success: true
            })
    
    }

//get company by id

export const getCompanyById = async(req, res) => {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
}

//update company by id
export const updateCompany = async (req, res) => {
  console.log("➡️ Update Data:", req.body);
  console.log("➡️ Uploaded File:", req.file);

  const { id } = req.params;
  const { name, website, location, industry, about, noOfEmployees, established } = req.body;

  // 1️⃣ Check if company exists
  const company = await Company.findById(id);
  if (!company) {
    return res.status(404).json({ success: false, message: "Company not found" });
  }

  // 2️⃣ Validate required fields
  if (!name || !website || !location || !industry || !about || !noOfEmployees || !established) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  // 3️⃣ Prevent duplicate name (excluding current company)
  const existingCompany = await Company.findOne({ name, _id: { $ne: id } });
  if (existingCompany) {
    return res.status(400).json({ success: false, message: "Company name already exists" });
  }

  // 4️⃣ Update fields
  company.name = name;
  company.website = website;
  company.location = location;
  company.industry = industry;
  company.about = about;
  company.noOfEmployees = noOfEmployees;
  company.established = established;

  // 5️⃣ Update logo (required)
  if (req.file?.path) {
    company.logo = req.file.path; // Cloudinary/local path
  } else if (!company.logo) {
    return res.status(400).json({ success: false, message: "Logo cannot be empty" });
  }

  // 6️⃣ Save updates
  await company.save();

  res.status(200).json({
    success: true,
    message: "Company updated successfully",
    company,
  });
};

//delete company by id (optional)

export const deleteCompany = async (req, res) => {
  
  const { id } = req.params;
  const company = await Company.findByIdAndDelete(id);

  if (!company) {
    return res.status(404).json({
      success: false,
      message: "Company not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Company deleted successfully",
  });
};

