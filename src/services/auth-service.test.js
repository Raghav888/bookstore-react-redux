import axios from "axios";
import AuthService from "./auth.service";

jest.mock("axios");

describe("AuthService", () => {
  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe("login", () => {
    it("should save user data to localStorage if successful", async () => {
      // Arrange
      const email = "eve.holt@reqres.in";
      const password = "cityslicka";
      const responseData = { token: "testToken" };
      axios.post.mockResolvedValueOnce({ data: responseData });

      // Act
      const result = await AuthService.login(email, password);

      // Assert
      expect(axios.post).toHaveBeenCalledWith("https://reqres.in/api/login", {
        email,
        password,
      });
      expect(localStorage.getItem("user")).toEqual(
        JSON.stringify(responseData)
      );
      expect(result).toEqual(responseData);
    });

    it("should return an error if login fails", async () => {
      // Arrange
      const email = "test@example.com";
      const password = "testPassword";
      const error = new Error("Failed to login");
      axios.post.mockRejectedValueOnce(error);

      // Act & Assert
      await expect(AuthService.login(email, password)).rejects.toEqual(error);
    });
  });

  describe("logout", () => {
    it("should remove user data from localStorage", () => {
      // Arrange
      localStorage.setItem("user", "test");

      // Act
      AuthService.logout();

      // Assert
      expect(localStorage.getItem("user")).toBeNull();
    });

    it("should remove wishlist data from localStorage", () => {
      // Arrange
      localStorage.setItem("wishList", "test");

      // Act
      AuthService.logout();

      // Assert
      expect(localStorage.getItem("wishList")).toBeNull();
    });
  });
});
