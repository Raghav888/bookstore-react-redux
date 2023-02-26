const initialState = {
  products: [],
  minPrice: 0,
  maxPrice: 9999,
  sortbyPrice: null,
  ratingsort: 1,
  categoryFilter: [],
  search: "",
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "GOT_PRODUCT":
      return {
        ...state,
        products: payload.value,
      };
    case "LOAD_PRODUCT_FAILED":
      return {
        ...state,
        products: null,
      };
    case "LOW":
      return {
        ...state,
        sortbyPrice: "low",
      };
    case "HIGH":
      return {
        ...state,
        sortbyPrice: "high",
      };
    case "MAX_PRICE":
      return {
        ...state,
        maxPrice: payload.value ? payload.value : 9999,
      };
    case "MIN_PRICE":
      return { ...state, minPrice: payload.value };
    case "RATING":
      return { ...state, ratingsort: payload.value };
    case "CLEAR_FILTER":
      return {
        ...state,
        minPrice: 0,
        maxPrice: 9999,
        sortbyPrice: null,
        ratingsort: 1,
        categoryFilter: [],
      };
    case "CATEGORY_FILTER":
      const isAdded = state.categoryFilter.find(
        (item) => item === payload.value
      );
      if (isAdded === undefined) {
        return {
          ...state,
          categoryFilter: [...state.categoryFilter, payload.value],
        };
      } else {
        const newCategory = state.categoryFilter.filter(
          (item) => item !== payload.value
        );
        return { ...state, categoryFilter: newCategory };
      }
    case "WISHLIST_UPDATE":
      return {
        ...state,
        products: state.products.map((item) =>
          item._id === payload.value
            ? { ...item, wishlistAdded: !item.wishlistAdded }
            : item
        ),
      };

    case "SEARCH":
      return {
        ...state,
        search: payload.value,
      };
    default:
      return state;
  }
}
