import { useState } from "react"
// import { Modal } from "flowbite-react";
import axios from "axios";

 const CompanyForm = () => {

    const [companyInfo,setCompanyInfo]=useState({
     
      name: "",
      slogan: "",
      description: "",
      industry: "select industry",
      location: "",
      managerName: "",
      jobTitle: "",
      contactNumber: [" "],
      website: ""
    });

    const [documents,setDocuments]=useState({
      license:"",
        logo:""

    })

    const [errors,setErrors]=useState({})
    const handleChange=(event)=>{
        setCompanyInfo((prev)=>(
            {...prev,[event.target.name]:event.target.value}
        ))
    }

    const handleFileChange = (event) => {
        const { name, files } = event.target;
        setDocuments((prev) => ({
          ...prev,
          [name]: files[0],
        }));
      };
      const validate=()=>{
        const newErrors={};

        if(!companyInfo.name) newErrors.name="company name is required"
        if(!companyInfo.description) newErrors.description="description is required"
        // if(!companyInfo.email) newErrors.email="email is required"
        if(!companyInfo.industry) newErrors.industry ="industry is required"
        if(!companyInfo.jobTitle) newErrors.jobTitle="jobTitle is required"
        if(!companyInfo.location) newErrors.location="location is required"
        if(!companyInfo.managerName) newErrors.managerName="managerName is required"
        if(!companyInfo.contactNumber) newErrors.contactNumber="phone is required"
        if(!companyInfo.slogan) newErrors.slogan="slogan is required"
        if(!companyInfo.website) newErrors.website="website is required"
        if(!documents.license) newErrors.license="companyDocument is required"
        if(!documents.logo) newErrors.logo="companyLogo is required"
  return newErrors;
      }
      

const handleSubmit=async (event)=>{
    event.preventDefault();
    const validationErrors=validate()
    if(Object.keys(validationErrors).length!==0 ){
        setErrors(validationErrors)

        
    }
   const contactNumber=companyInfo.contactNumber.split(',').map(contactNumber=>contactNumber.trim())
      const formData = {
            name:companyInfo.name,
            location:companyInfo.location,
            slogan:companyInfo.slogan,
            description:companyInfo.description,
            industry:companyInfo.industry,
            managerName:companyInfo.managerName,
            jobTitle:companyInfo.jobTitle,
            // email:companyInfo.email,
            website:companyInfo.website,
            contactNumber:contactNumber,
            // phone:companyInfo.phone,
            license:documents.license,
            logo:documents.logo
        };
        //company register,add internship,approve internship,dashboard of company manager
        console.log(formData)

        try{
         
         const response=await axios.post(`http://localhost:5000/api/student/${"66986fa419fcddcf3090f6b4"}/apply-to-company`,formData,{
          headers: {
            'Content-Type': 'multipart/form-data'
        },
         })
         console.log(response.data)
        }
        
        catch(error){
          console.log("the data is not posted correctly",error)
        }
   }
    
  return (
    <>
    
    
<div className="flex flex-col items-start justify-start w-full  md:items-center  md:justify-center sm:px-20  md:px-10 mt-5" >

        <h1 className="text-blue-600 font-bold text-2xl pl-20">Please fill the following form</h1>
       
        
        <form onSubmit={handleSubmit} className="flex flex-col px-10 mt-5 py-6  ">
          <h1 className=" text-black font-bold text-2xl mt-5 ">Company Information</h1>
           <hr className=" border-blue-700 "></hr>
            <div className="flex sm:flex-col md:flex-row gap-5 w-full mt-6">
             
            <div className="flex flex-col gap-4 w-full sm:w-full md:w-1/2">
             <label className="font-bold text-xl" htmlFor="company name ">company name</label>
            <input className=" input px-4 py-1 border border-neutral-400 rounded-lg" type="text" placeholder="company name" name="name" value={companyInfo.name} onChange={handleChange}/>
            {errors.name && <span className="text-red-500">{errors.name}</span>}

            </div>
            <div  className="flex flex-col gap-4 w-full sm:w-full md:w-1/2">

            <label className="font-bold text-xl" htmlFor="location">location</label>
            <input className="input px-4 py-1 border border-neutral-400 " type="text" placeholder="location" name="location" value={companyInfo.location} onChange={handleChange}/>
            {errors.location && <span className="text-red-500">{errors.location}</span>}

            </div>
            </div>
            <div  className="flex flex-col gap-4 w-full mt-5">

            <label className="font-bold text-xl" htmlFor="slogan">slogan</label>
            <input className="px-4 py-1 border border-neutral-400 rounded-lg" type="text" placeholder="slogan" name="slogan" value={companyInfo.slogan} onChange={handleChange}/>
            {errors.slogan && <span className="text-red-500">{errors.slogan}</span>}

            </div>
            <div  className="flex flex-col gap-4 w-full mt-5">

<label className="font-bold text-xl" htmlFor="description">description</label>
<textarea className="px-4 py-1 h-28 border border-neutral-400 rounded-lg" type="text" placeholder="description" name="description" value={companyInfo.description} onChange={handleChange}/>
{errors.description && <span className="text-red-500">{errors.description}</span>}

</div>
<div  className="flex flex-col gap-2 w-1/2 mt-5">

<label className="font-bold text-xl" htmlFor="industry">industry</label>
<select onChange={handleChange} name="industry" className=' px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500'>
                        <option  value="all-categories">{companyInfo.industry}</option>
                        <option value="Finance">Finance</option>
                        <option value="Technology">Technology</option>
                        <option value="Healthcare">Health</option>
                        <option value="Education">Education</option>

                    </select>
</div>
         <h1 className=" text-black font-bold text-2xl mt-16">Manager Information</h1>
          <hr className="w-full border-blue-700 "></hr>
          <div className="flex flex-col mt-10">
          <div className="flex flex-col gap-4 w-full ">
             <label className="font-bold text-xl" htmlFor="manager name ">Manager name</label>
            <input className="px-4 py-1 border border-neutral-400 rounded-lg" type="text" placeholder="manager name" name="managerName" value={companyInfo.managerName} onChange={handleChange}/>
            {errors.managerName && <span className="text-red-500">{errors.managerName}</span>}

            </div> 
            <div className="flex flex-col gap-4 w-full ">
             <label className="font-bold text-xl" htmlFor="job title ">Jon title</label>
            <input className="px-4 py-1 border border-neutral-400 rounded-lg" type="text" placeholder="job title" name="jobTitle" value={companyInfo.jobTitle} onChange={handleChange}/>
            {errors.jobTitle && <span className="text-red-500">{errors.jobTitle}</span>}

           </div> 
          </div>
          <h1 className=" text-black font-bold text-2xl mt-16">Contact Information</h1>
          <hr className="w-full border-blue-700 "></hr>
          <div className="flex flex-col gap-4 w-full ">
             <label className="font-bold text-xl" htmlFor="manager name ">Manager contact number</label>
            <input className="px-4 py-1 border border-neutral-400 rounded-lg" type="text" placeholder="manager phone" name="contactNumber" value={companyInfo.contactNumber} onChange={handleChange}/>
            {errors.contactNumber && <span className="text-red-500">{errors.contactNumber}</span>}

            </div> 

        
            <div className="flex flex-col gap-4 w-full ">
             <label className="font-bold text-xl" htmlFor="twitter ">Website</label>
            <input className="px-4 py-1 border border-neutral-400 rounded-lg" type="text" placeholder="website" name="website" value={companyInfo.website} onChange={handleChange}/>
            {errors.website && <span className="text-red-500">{errors.website}</span>}

            </div>  
            <h1 className=" text-black font-bold text-2xl mt-16">Documents</h1>
          <hr className="w-full border-blue-700 "></hr>  
          <div className="flex flex-col gap-4 w-full mt-6">
             <label className="font-bold text-xl" htmlFor="Company Document ">Company Document</label>
            <input className="px-4 py-1 border border-neutral-400 rounded-lg" type="file" name="license"  onChange={handleFileChange}/>
            {errors.license && <span className="text-red-500">{errors.license}</span>}

            </div> 
            <div className="flex flex-col gap-4 w-full ">
             <label className="font-bold text-xl" htmlFor="company logo ">company Logo</label>
            <input className="px-4 py-1 border border-neutral-400 rounded-lg" type="file" placeholder="company logo" name="logo"  onChange={handleFileChange}/>
            {errors.logo && <span className="text-red-500">{errors.logo}</span>}

            </div> 
            <button  className="bg-blue-700 text-white p-2 mt-5" type="submit">Submit Application</button>
        </form>
    </div>
     
  </>
  )
}

export default CompanyForm
