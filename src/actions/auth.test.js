// Import the module that you want to test
import { login, logout } from "./auth";
import AuthService from "../services/auth.service";
// Mock the dependencies (in this case, the AuthService)
jest.mock("../services/auth.service", () => ({
  login: jest.fn(() => Promise.resolve({ username: "testUser" })),
  logout: jest.fn(),
}));

// Define the test suites
describe("Auth actions", () => {
  describe("login", () => {
    it("should dispatch LOGIN_SUCCESS action when login is successful", async () => {
      // Arrange
      const dispatch = jest.fn();
      const username = "testUser";
      const password = "testPassword";

      // Act
      await login(username, password)(dispatch);

      // Assert
      expect(dispatch).toHaveBeenCalledWith({
        type: "LOGIN_SUCCESS",
        payload: { user: { username: "testUser" } },
      });
    });

    it("should reject the Promise when login fails", async () => {
      // Arrange
      const dispatch = jest.fn();
      const username = "testUser";
      const password = "testPassword";

      // Mock the AuthService to reject the login Promise
      jest
        .spyOn(AuthService, "login")
        .mockImplementation(() => Promise.reject());

      // Act and Assert
      await expect(login(username, password)(dispatch)).rejects.toEqual(
        undefined
      );
    });
  });

  describe("logout", () => {
    it("should dispatch LOGOUT action", () => {
      // Arrange
      const dispatch = jest.fn();

      // Act
      logout()(dispatch);

      // Assert
      expect(dispatch).toHaveBeenCalledWith({
        type: "LOGOUT",
      });
    });
  });
});
