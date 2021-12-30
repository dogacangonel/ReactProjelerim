import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import { saveProduct } from "../../redux/actions/productActions";
import ProductDetail from "./ProductDetail";
//Senaryomuz bir ürün eklediğimizde nelere ihtiyacımız var

//Bu fonksiyon bize diğer action ve statelerimizi proplarını direkt olarak bu componentte kullanma fırsatı vermektedir
function AddOrUpdateProduct({
  products,
  categories,
  getProduct,
  getCategories,
  saveProduct,
  history, //Daha önceden geldiğiz sayfalara yönlendirme yapan işlem.Bu ifade react gelen ifade
  ...props //Bu ifade burada olan veya sonradan yine bizim ekleyeceğimiz proplar varsa bunları addOrUpdateProduct bağla demek istiyoruz.
}) {
  const [product, setProduct] = useState({ ...props.product });
  const [errors, setError] = useState({});
  //useEfect kullanmamamızın amacı direkt ana sayfa üzerinden gitiğimizde categories ürünleri geldiğinden başka bir sayfaya gittiğimizde bu datada direkt olarak faydalanabiliyorduk. Ancak başka bir linkten direkt olarak gittiğimizi düşünürsek categories gitmediğimizden data yükleyenmeyecektir ve data  bu kısma gelmeyecektir. Bunun önüne geçmek için useEfecti kullanıyoru.Bu sayede o sayfadaki veriyi propslarımız getProduct vardı .Buna bağlı olarak burada da çağırabiliriz.Aynı zamanda data sayfa yuklendiğinde yuklemisini sağlayan ComponentDidMount ve kullanılmayan ComponentWillMount gibi yapıların hepsini içinde tutmaktadır.
  useEffect(() => {
    if (categories.length === 0) {
      // İşte bu şartta eğer categories burada bir elemanı bile yoksa aşağdaki gibi categories buraya getir diyoruz.
      getCategories();
    }
    setProduct({ ...props.product });
  }, [props.product]);
  //İkinci parametre Hooks yeni olduğu için useEfect'in bir bugı vardır ve sonsuz döngüye girer bizde bunun olmaması için 2. parametrede bu props.product Dom yerleştiğinde bu çalışmayı durdur demiş oluyoruz.

  //Burada handleChange ile textbox içine yazılan değerin categoryID geldiğinde int çevrilmesini istiyoruz.O yuzden product atılan state'in içine girip değeri setProduct ile kontrol etmiş olup bu durum gerçekleştiyse değişmesini söyledik
  function handleChange(event) {
    const { name, value } = event.target;
    setProduct((previousProduct) => ({
      ...previousProduct,
      [name]: name === "categoryId" ? parseInt(value, 10) : value,
    }));
    validation(name, value);
  }

  function validation(name, value) {
    if (name === "productName" && value === "") {
      setError((previousErrors) => ({
        ...previousErrors,
        productName: "Ürün bilgisini giriniz...",
        category: "Kategori bilgisini giriniz...",
      }));
    } else if (name === "categoryName" && value === "") {
      setError((previousErrors) => ({
        ...previousErrors,
        productName: "Ürün bilgisini giriniz...",
        category: "Kategori bilgisini giriniz...",
      }));
    }else if (name === "quantityPerUnit" && value === "") {
        setError((previousErrors) => ({
          ...previousErrors,
          quantityPerUnit: "Birim başı miktar bilgisini giriniz...",
        }));
      }else if (name === "unitPrice" && value === "") {
        setError((previousErrors) => ({
          ...previousErrors,
          unitPrice: "Birim fiyat bilgisini giriniz...",
        }));
      }else if (name === "unitsInStock" && value === "") {
        setError((previousErrors) => ({
          ...previousErrors,
          unitsInStock: "Stoktaki ürün bilgisini giriniz...",
        }));
      }else{
          setError({})
      }
  }
  //Buttona tıklandığında kayıt işlemini getirsin
  function handleSave(event) {
    event.preventDefault();
    saveProduct(product).then(() => {
      history.push("/");
    });
  }

  return (
    <ProductDetail
      product={product}
      categories={categories}
      onSave={handleSave}
      onChange={handleChange}
      errors={errors}
    />
  );
}

export function getProductById(products, productId) {
  let product = products.find((product) => product.id == productId) || null;
  return product;
}

//Burada bir kayıt mı yoksa update işlemine göre stateleri kontrol ederek proplara göndermek istiyoruz.
//owProps sayfadaki queryStringleri leri okumamızı sağlayan yapıdır.Bunu class componentlerde de kullanabiliriz.
function mapStateToProps(state, ownProps) {
  const productId = ownProps.match.params.productId;
  const product =
    productId && state.productListReducer.length > 0
      ? getProductById(state.productListReducer, productId)
      : {};
  return {
    product,
    products: state.productListReducer,
    categories: state.categoryListReducer,
  };
}

const mapDispatchToProps = {
  getCategories,
  saveProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddOrUpdateProduct);
