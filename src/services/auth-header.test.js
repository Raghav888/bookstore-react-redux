import authHeader from "./auth-header";

describe("authHeader", () => {
  it("should return an empty object if the user token is not available", () => {
    // Arrange
    localStorage.removeItem("user");

    // Act
    const result = authHeader();

    // Assert
    expect(result).toEqual({});
  });

  it("should return an object with Authorization header if the user token is available", () => {
    // Arrange
    const user = { accessToken: "xyz" };
    localStorage.setItem("user", JSON.stringify(user));

    // Act
    const result = authHeader();

    // Assert
    expect(result).toEqual({ Authorization: "Bearer xyz" });
  });
});
