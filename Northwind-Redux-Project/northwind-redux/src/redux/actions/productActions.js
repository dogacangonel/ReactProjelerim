import * as actionTypes from "./actionTypes";

export function getProductSuccess(products) {
  return {
    type: actionTypes.GET_PRODUCT_SUCCESS,
    payload: products
  };
}

export function createProductSuccess(product) {
  return {
    type: actionTypes.CREATE_PRODUCT_SUCCESS,
    payload: product
  };
}

export function updateProductSuccess(product) {
  return {
    type: actionTypes.UPDATE_PRODUCT_SUCCESS,
    payload: product,
  };
}

//Ürünü apiden methoddaki şartı yazarak put ya ada postl olduğunu bildiriyoruz.
//Hatırlarsak get işleminde biz dosyamızı json çeviyorduk gönderirken json stringfy özelliği ile stringleştiriyoruz.
export function saveProductApi(product) {
  return fetch("http://localhost:3000/products/" + (product.id || ""), {
    method: product.id ? "PUT" : "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(product),
  })
    .then(handleResponse)
    .catch(handleError);
}




export function saveProduct(product) {
  return function (dispatch) {
    return saveProductApi(product)
      .then((savedProduct) => {
        product.id
          ? dispatch(updateProductSuccess(savedProduct))
          : dispatch(createProductSuccess(savedProduct));
      })
      .catch((error) => {
        throw error;
      });
  };
}

export async function handleResponse(response) {
  if (response.ok) {
    return response.json();
  }

  //Eğer response okey değilde gelen datada bir hata var bize bir error response göndermesi gerekir. Biz de onu aşağıdaki handle error gönderiyoruz.Yukarıdaki catch ifadesi çalıştığında o da bir response data alması için aşağıdaki kod satırını kullanıyoruz.
  const error = await response.text();
  throw new Error(error);
}

export function handleError(error) {
  console.error("Bir hata oluştu");
  throw error;
}

//Ürün getirme metodu
export function getProduct(categoryId) {
  return function (dispatch) {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      //Api de bulunan category ve product id ilişkileri sayesinde CategoryList tarafında getProduct dispatch aksiyonu ile ondan seçtiğim categorinin  id yollayıp buradaki product datasında categoryId ile url bilgisine ekleyip  sadece bana o id ait ürünlerin dönmesini sağlıyorum.
      url = url + "?categoryId=" + categoryId;
    }
    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getProductSuccess(result)));
  };
}
