import * as y from "yup"

export const DescriptionSchema = y.object({
    category: y.string().min(2).required("Please select category"),
    brand_name: y.string().required("Please enter brand name"),
    product_name: y.string().min(2).required("Please enter product name"),
})