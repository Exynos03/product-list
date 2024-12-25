import { useNavigate } from "react-router-dom"
import Sidebar from "../../../commonComponents/Sidebar"
import Topbar from "../../../commonComponents/Topbar"
import FormTimeline from "../components/FormTimeline"
import Description from "../components/Description"

const AddProducts = () => {
    const navigate = useNavigate()

    return (
        <section className='flex w-full'>
            <Sidebar />
            <section className='flex flex-col justify-start align-middle w-4/5 cr:w-4/6 h-screen'>
                <Topbar
                    heading="Add Product"
                    btn1Text= "Cancel"
                    btn2Text="Next"
                    btn1Navigation= {() => navigate('/Products')}
                    btn2Navigation= {() => console.log("btn 2")}
                />
                <section className="w-3/6 p-6 pt-0 mt-[-8px]">
                    <FormTimeline sections={["Description", "Variants", "Combinations", "Price info"]} isActiveSection="Variants"/>
                    <Description />
                </section>
            </section>
        </section>
    )
}

export default AddProducts
