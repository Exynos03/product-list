import { useNavigate } from "react-router-dom"
import Sidebar from "../../../commonComponents/Sidebar"
import Topbar from "../../../commonComponents/Topbar"
import FormTimeline from "../components/FormTimeline"
import Description from "../components/Description"
import { useState } from "react"
import { useFormik } from "formik"
import { DescriptionSchema } from "../../../schemas"

const AddProducts = () => {
    const [currentForm, setCurrentForm] = useState<number>(0)
    const navigate = useNavigate()
      const  initialValues = {
        category: "",
        product_name:"",
        brand_name: "",
      }  
      const {values, errors, handleChange, handleSubmit} = useFormik({
        initialValues: initialValues,
        validationSchema: DescriptionSchema,
        onSubmit: () => {
            if(JSON.stringify(errors) === "{}") setCurrentForm( prevVal => prevVal+1)
        }
      })

      console.log(errors)

    return (
        <section className='flex w-full'>
            <Sidebar />
            <section className='flex flex-col justify-start align-middle w-4/5 cr:w-4/6 h-screen'>
                <Topbar
                    heading="Add Product"
                    btn1Text= { currentForm === 0 ? "Cancel" : "Back" }
                    btn2Text={ currentForm === 3 ? "Confirm" : "Next"}
                    btn1Navigation= {currentForm === 0 ? () => navigate('/Products') : () => setCurrentForm( prevVal => prevVal-1)}
                    btn2Navigation= {currentForm === 3 ? () => console.log("Confirm") : () => handleSubmit()}
                />
                <section className="w-3/6 p-6 pt-0 mt-[-8px]">
                    <FormTimeline sections={["Description", "Variants", "Combinations", "Price info"]} isActiveSectionIndex={currentForm} setIsActiveSectionIndex={setCurrentForm}/>
                    <Description values={values} errors={errors} handleChange={handleChange} />
                </section>
            </section>
        </section>
    )
}

export default AddProducts
