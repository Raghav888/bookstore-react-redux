import { getproducts } from "./product";
import ProductService from "../services/product.service";

jest.mock("../services/product.service");

describe("Product actions", () => {
  describe("getproducts", () => {
    const dispatch = jest.fn();
    const products = [
      { _id: "1", name: "Product 1", price: 10 },
      { _id: "2", name: "Product 2", price: 20 },
    ];

    beforeEach(() => {
      ProductService.getProduct.mockReset();
      dispatch.mockClear();
    });

    it("should dispatch GOT_PRODUCT action with products when the API call is successful", async () => {
      // Arrange
      ProductService.getProduct.mockImplementation(() =>
        Promise.resolve({ data: products })
      );

      // Act
      await getproducts()(dispatch);

      // Assert
      expect(dispatch).toHaveBeenCalledWith({
        type: "GOT_PRODUCT",
        payload: { value: products },
      });
    });

    it("should dispatch GOT_PRODUCT action with products with wishlistAdded when wishlist is not empty", async () => {
      // Arrange
      const wishListIds = ["1"];
      localStorage.setItem("wishList", JSON.stringify(wishListIds));
      const expectedProducts = [
        { ...products[0], wishlistAdded: true },
        products[1],
      ];
      ProductService.getProduct.mockImplementation(() =>
        Promise.resolve({ data: products })
      );

      // Act
      await getproducts()(dispatch);

      // Assert
      expect(dispatch).toHaveBeenCalledWith({
        type: "GOT_PRODUCT",
        payload: { value: expectedProducts },
      });
    });

    it("should dispatch GOT_PRODUCT action with original products when wishlist is empty", async () => {
      // Arrange
      localStorage.removeItem("wishList");
      ProductService.getProduct.mockImplementation(() =>
        Promise.resolve({ data: products })
      );

      // Act
      await getproducts()(dispatch);

      // Assert
      expect(dispatch).toHaveBeenCalledWith({
        type: "GOT_PRODUCT",
        payload: { value: products },
      });
    });

    it("should reject the Promise when the API call fails", async () => {
      // Arrange
      ProductService.getProduct.mockImplementation(() =>
        Promise.reject("error")
      );

      // Act and Assert
      await expect(getproducts()(dispatch)).rejects.toEqual(undefined);
    });
  });
});
