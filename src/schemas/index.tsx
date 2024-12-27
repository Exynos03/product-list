import * as y from "yup";

export const FormDataSchema = y.object({
  category: y.string().required("Please select category"),
  brand_name: y.string().required("Please enter brand name"),
  product_name: y.string().required("Please enter product name"),
  price: y.number().moreThan(0).required("Please enter price"),
  method: y.string(),
});
