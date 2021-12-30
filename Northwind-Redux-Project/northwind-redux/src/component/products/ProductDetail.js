import React from "react";
import SelectInput from "../toolbox/SelectInput";
import TextInput from "../toolbox/TextInput";

const ProductDetail = ({product, categories, onSave, onChange,errors}) => {
    return (
        <form onSubmit={onSave}>
            <h3>{product.id ? "Güncelle" : "Ekle"}</h3>
            <TextInput
                name="productName"
                label="Product Name"
                value={product.productName}
                onChange={onChange}
                error={errors.productName}
            />
            <br/>
            <SelectInput
                name="categoryId"
                label="Category"
                value={product.categoryId ||""}
                defaultOption="Seçiniz"
                options={categories.map(category=>({
                  value:category.id,
                  text:category.categoryName
                }))}
                onChange={onChange}
                error={errors.categoryName}
            />
            <br/>
              <TextInput
                name="quantityPerUnit"
                label="Quantity Per Unit"
                value={product.quantityPerUnit}
                onChange={onChange}
                error={errors.quantityPerUnit}
            />
            <br/>
              <TextInput
                name="unitPrice"
                label="Unit Price"
                value={product.unitPrice}
                onChange={onChange}
                error={errors.unitPrice}
            />
             <br/>
              <TextInput
                name="unitsInStock"
                label="Units In Stock"
                value={product.unitsInStock}
                onChange={onChange}
                error={errors.unitsInStock}
            />
 <br/>
            <button type="submit" className="btn btn-success">
                Kaydet
            </button>
        </form>
    );
};

export default ProductDetail;
