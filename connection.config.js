export const apiLinks = {
     baseUrl:"http://localhost:3000/"     // for development
     // baseUrl:"http://www.aptdiagnostics.com:5000/"   //for production
    // baseUrl: "http://13.233.156.29:5000/"
 }

 apiLinks.getproducts=apiLinks.baseUrl+'api/product/products';
 apiLinks.register=apiLinks.baseUrl+'api/user/register';
 apiLinks.login=apiLinks.baseUrl+'api/user/login';
 apiLinks.authVerify=apiLinks.baseUrl+'api/user/authVerify';
 apiLinks.getcartproducts=apiLinks.baseUrl+'api/product/cartItems';
 apiLinks.addorder=apiLinks.baseUrl+'api/user/addorder';
 apiLinks.getmyorder=apiLinks.baseUrl+'api/user/getmyorder'