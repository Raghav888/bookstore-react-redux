import {
  filterDatabyPrice,
  compose,
  dataSortbyPrice,
  dataSortbyRating,
  dataFilterbyCategory,
  filterbySearch,
} from "./productFilterSort";

describe("productUtils", () => {
  const mockData = [
    {
      id: 1,
      title: "Product 1",
      categoryName: "Category 1",
      rating: 3,
      discountprice: 10,
    },
    {
      id: 2,
      title: "Product 2",
      categoryName: "Category 2",
      rating: 4,
      discountprice: 15,
    },
    {
      id: 3,
      title: "Product 3",
      categoryName: "Category 1",
      rating: 5,
      discountprice: 20,
    },
  ];

  describe("filterDatabyPrice", () => {
    test("should return filtered data based on minPrice and maxPrice", () => {
      const filterParams = { minPrice: 12, maxPrice: 18 };
      const expectedData = [mockData[1]];
      const filteredData = filterDatabyPrice(filterParams, mockData);
      expect(filteredData).toEqual(expectedData);
    });
  });

  describe("dataSortbyPrice", () => {
    test("should return data sorted by price in descending order", () => {
      const sortParams = { products: mockData, sortbyPrice: "high" };
      const expectedData = [mockData[2], mockData[1], mockData[0]];
      const sortedData = dataSortbyPrice(sortParams);
      expect(sortedData).toEqual(expectedData);
    });

    test("should return data sorted by price in ascending order", () => {
      const sortParams = { products: mockData, sortbyPrice: "low" };
      const expectedData = [mockData[0], mockData[1], mockData[2]];
      const sortedData = dataSortbyPrice(sortParams);
      expect(sortedData).toEqual(expectedData);
    });

    test("should return original data if sortbyPrice is not high or low", () => {
      const sortParams = { products: mockData, sortbyPrice: "unknown" };
      const expectedData = mockData;
      const sortedData = dataSortbyPrice(sortParams);
      expect(sortedData).toEqual(expectedData);
    });
  });

  describe("dataSortbyRating", () => {
    test("should return filtered data based on rating", () => {
      const filterParams = { ratingsort: 4 };
      const expectedData = [mockData[1], mockData[2]];
      const filteredData = dataSortbyRating(filterParams, mockData);
      expect(filteredData).toEqual(expectedData);
    });
  });

  describe("dataFilterbyCategory", () => {
    it("should return all products if categoryFilter is empty", () => {
      const result = dataFilterbyCategory({ categoryFilter: [] }, mockData);
      expect(result).toEqual(mockData);
    });

    it("should return products matching the category filter", () => {
      const result = dataFilterbyCategory(
        { categoryFilter: ["Category 1", "Category 2"] },
        mockData
      );
      expect(result).toEqual([
        {
          id: 1,
          title: "Product 1",
          categoryName: "Category 1",
          rating: 3,
          discountprice: 10,
        },
        {
          id: 2,
          title: "Product 2",
          categoryName: "Category 2",
          rating: 4,
          discountprice: 15,
        },
        {
          id: 3,
          title: "Product 3",
          categoryName: "Category 1",
          rating: 5,
          discountprice: 20,
        },
      ]);
    });
  });

  describe("filterbySearch", () => {
    it("should return all products if search is empty", () => {
      const result = filterbySearch({ search: "" }, mockData);
      expect(result).toEqual(mockData);
    });

    it("should return products matching the search term", () => {
      const result = filterbySearch({ search: "duct" }, mockData);
      expect(result).toEqual([
        {
          id: 1,
          title: "Product 1",
          categoryName: "Category 1",
          rating: 3,
          discountprice: 10,
        },
        {
          id: 2,
          title: "Product 2",
          categoryName: "Category 2",
          rating: 4,
          discountprice: 15,
        },
        {
          id: 3,
          title: "Product 3",
          categoryName: "Category 1",
          rating: 5,
          discountprice: 20,
        },
      ]);
    });
  });
});
