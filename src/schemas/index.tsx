import * as yup from "yup";

export const FormDataSchema = yup.object({
  category: yup.string().required("Please select category"),
  brand_name: yup.string().required("Please enter brand name"),
  product_name: yup.string().required("Please enter product name"),
  price: yup
    .string()
    .required("Please enter price")
    .test(
      'is-greater-than-zero',
      'Price must be greater than 0',
      (value) => parseFloat(value) > 0
    ),
  method: yup.string(),
  discount: yup
    .string()
    .test(
      'is-greater-than-zero',
      'Discount must be greater than 0',
      (value) => !value || parseFloat(value) > 0
    ),
  image: yup.mixed().nullable().required("Please upload image"),
  variants: yup
    .array()
    .of(
      yup.object({
        field1: yup.string().required("Option is required"),
        field2: yup
          .array()
          .of(yup.string().required("Value is required"))
          .min(1, "At least one value is required")
          .test('unique-field2', 'Values must be unique', function(value) {
            if (!value) return true; 
            const uniqueValues = new Set(value);
            return uniqueValues.size === value.length;
          }),
      })
    )
    .min(1, "At least one variant is required")
    .test(
      'unique-field1',
      'Values inside field1 must be unique',
      function(value) {
        if (!value) return true; 
        const field1Values = value.map(item => item.field1);
        const uniqueField1Values = new Set(field1Values);

        if (uniqueField1Values.size !== field1Values.length) {
          const lastIndex = field1Values.length - 1;
          const lastField1 = field1Values[lastIndex];
          const isDuplicate = field1Values.filter(item => item === lastField1).length > 1;

          if (isDuplicate) {
            return this.createError({
              path: `variants[${lastIndex}].field1`,
              message: "Options must be unique"
            });
          }
        }

        return true;
      }
    ),
    combinations: yup
    .array()
    .of(
      yup.object({
        name: yup.string(),
        sku: yup.string().required("SKU is required"),
        quantity: yup
          .string()
          .test(
            "is-valid-quantity",
            "Enter valid stock value",
            (value, context) =>
              context.parent.inStock ? !!value && Number(value) > 0 : true
          ),
        inStock: yup.boolean(),
      })
    )
    .required("Combinations are required")
    .test(
      "unique-sku",
      "SKUs must be unique",
      function (combinations) {
        const skus = combinations.map((combo) => combo.sku);
        const uniqueSkus = new Set(skus);
        if (uniqueSkus.size !== skus.length) {
          const duplicateIndex = skus.findIndex(
            (sku, index) => skus.indexOf(sku) !== index
          );
          return this.createError({
            path: `combinations[${duplicateIndex}].sku`,
            message: "Duplicate SKU",
          });
        }
        return true;
      }
    ),
});
