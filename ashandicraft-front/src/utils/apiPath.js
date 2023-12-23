/* ---------------baseurl for customer define---------------*/

const userBaseURL = "/user";
const categoryBaseURL = "/categories";
const productBaseURL = "/products";
const authBaseURL = "/auth";
const cartBaseURL = "/carts";

/* ---------------document baseurl for uploading files define---------------*/

// const documentUploadBaseUrl =  process.env.NODE_ENV &&  process.env.NODE_ENV !== 'development' ? '/api' : "http://localhost:4000";

/* ----------------component ApiPath starts------------------*/

const ApiPath = {
    updateUser: `${userBaseURL}/update`,
    updateProfileImage: `${userBaseURL}/updateProfileImage`,
    fetchStates: `${userBaseURL}/states`,
    fetchDistricts: `${userBaseURL}/districts`,
    createUserAddress: `${userBaseURL}/createUserAddress`,
    findOneUser: `${userBaseURL}/findOneUser`,
    findCategories: `${categoryBaseURL}/findCategories`,
    findAllProducts: `${productBaseURL}/findAllProducts`,
    addViewToProduct: `${productBaseURL}/addViewToProduct`,
    findProduct: `${productBaseURL}/findProduct`,
    signup: `${authBaseURL}/signup`,
    signin: `${authBaseURL}/signin`,
    cartCreate: `${cartBaseURL}/cartCreate/users`,
    getProductsAndCartOfUser: `${cartBaseURL}/getProductsAndCartOfUser/users`,
    clearCart: `${cartBaseURL}/clearCart`,
};

/* --------------component ApiPath Ends-------------- */

/* -------------component ApiPath exported------------------*/

export default ApiPath;