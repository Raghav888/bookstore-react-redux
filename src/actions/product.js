import ProductService from "../services/product.service";

export const getproducts = () => (dispatch) => {
  return ProductService.getProduct().then(
    (response) => {
      const wishListIds = JSON.parse(localStorage.getItem("wishList")) ?? [];
      let products;

      if (wishListIds.length > 0) {
        products = response.data.map((item) =>
          wishListIds.includes(item._id)
            ? { ...item, wishlistAdded: true }
            : item
        );
      } else {
        products = response.data;
      }
      dispatch({
        type: "GOT_PRODUCT",
        payload: { value: products },
      });
      return Promise.resolve();
    },
    (error) => {
      console.log(error);
      return Promise.reject();
    }
  );
};
