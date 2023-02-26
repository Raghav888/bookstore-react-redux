const filterDatabyPrice = ({ minPrice, maxPrice }, productData) => {
  const returndata = productData.filter(
    (item) =>
      Number(item.discountprice) > minPrice &&
      Number(item.discountprice) < maxPrice
  );
  return returndata;
};

const dataSortbyPrice = ({ products, sortbyPrice }) => {
  if (sortbyPrice === "high") {
    return [...products].sort((a, b) => b.discountprice - a.discountprice);
  } else if (sortbyPrice === "low") {
    return [...products].sort((a, b) => a.discountprice - b.discountprice);
  } else {
    return products;
  }
};

const dataSortbyRating = ({ ratingsort }, productData) => {
  return productData.filter((item) => item.rating >= ratingsort);
};

const dataFilterbyCategory = ({ categoryFilter }, productData) => {
  if (categoryFilter.length >= 1) {
    const categoryFiltereddata = productData.filter(
      (product) => categoryFilter.indexOf(product.categoryName) !== -1
    );
    return categoryFiltereddata;
  }
  return productData;
};
const filterbySearch = ({ search }, productData) => {
  if (search === "") {
    return productData;
  }
  const filterData = productData.filter(({ title }) => {
    return title.toLowerCase().indexOf(search.toLowerCase()) >= 0;
  });
  return filterData;
};

const compose = (state, ...args) => {
  const output = args.reduce((acc, curr) => {
    acc = curr(state, acc);
    return acc;
  }, state);

  return output;
};

export {
  filterDatabyPrice,
  compose,
  dataSortbyPrice,
  dataSortbyRating,
  dataFilterbyCategory,
  filterbySearch,
};
