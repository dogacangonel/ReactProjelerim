import axios from "axios";
const getUser = (value) => {
  return new Promise(async (resolve, reject) => {
    const { data: getUser } = await axios(
      `https://jsonplaceholder.typicode.com/users/${value}`
    );
    resolve(getUser);
  });
};
const getPosts = (value) => {
  return new Promise(async (resolve, reject) => {
    const { data: getPosts } = await axios(
      `https://jsonplaceholder.typicode.com/posts?userId=${value}`
    );
    resolve(getPosts);
  });
};

const getdata=async(value)=>{
 return await Promise.all([getUser(value), getPosts(value)]).then(data=>{return data});
}

export default getdata;



