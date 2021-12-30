import * as actionTypes from "./actionTypes";

export const changeCategory = (category) => ({
  type: actionTypes.CHANGE_CATEGORY,
  payload: category
});

export const getCategorySuccess = (categories) => ({
  type: actionTypes.GET_CATEGORY_SUCCESS,
  payload: categories,
});


export const getCategories=()=>{
  return function(dispatch){ //Fonksiyon bir fonksiyon döndürüyordu hatırlarsak.Bu daima bu şekildedir
    let url="http://localhost:3000/categories"; //api bağlanmamız için
    return fetch(url)
    .then(response=>response.json())
    .then(result=>dispatch(getCategorySuccess(result)))
  }
}

