import React, { useEffect, useState } from "react";
import "./product.css";
import { useDispatch, useSelector } from "react-redux";
import { getproducts } from "../../actions/product";
import {
  compose,
  dataFilterbyCategory,
  dataSortbyPrice,
  dataSortbyRating,
  filterDatabyPrice,
  filterbySearch,
} from "../../utils/productFilterSort";

const filterAndSort = (state) => {
  const filterData = compose(
    state,
    dataSortbyPrice,
    filterDatabyPrice,
    dataSortbyRating,
    dataFilterbyCategory,
    filterbySearch
  );
  return filterData;
};

export const Product = () => {
  const productsState = useSelector((state) => state.product);
  const filterDataPrice = filterAndSort(productsState);

  const [wishListID, setWishListID] = useState(
    JSON.parse(localStorage.getItem("wishList")) ?? []
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getproducts());
  }, []);

  useEffect(() => {
    localStorage.removeItem("wishList");
    localStorage.setItem("wishList", JSON.stringify(wishListID));
  }, [wishListID.length]);

  const updateWishList = (_id) => {
    const index = wishListID.indexOf(_id);

    if (index >= 0) {
      wishListID.splice(index, 1);
      setWishListID(wishListID);
    } else {
      setWishListID([...wishListID, _id]);
    }

    dispatch({
      type: "WISHLIST_UPDATE",
      payload: { value: _id },
    });
  };

  return (
    <div className="product-page">
      <div className="product-page-title">
        <h3 className="item-font">Showing Products</h3>
      </div>
      {/* <!-- Listing --> */}
      <div className="book-card-holder">
        {filterDataPrice.map(
          ({
            _id,
            title,
            author,
            productImage,
            discountprice,
            orginalPrice,
            rating,
            wishlistAdded,
          }) => {
            return (
              <div key={_id} className="mantra-vertical-card card-holder">
                <div className="mantra-card-holder-image-v">
                  <img
                    className="mantra-vert-image image-cover"
                    src={productImage}
                    alt="book-baner"
                  />
                </div>
                <div className="mantra-card-holder-text-vert">
                  <div className="mantra-card-holder-text-content">
                    <h2 className="item-font">{title}</h2>
                    <h3 className="item-font">{author}</h3>
                    <div className="mantra-price-box">
                      <span className="mantra-discount">
                        Rs.{discountprice}
                      </span>
                      <span className="mantra-original">Rs.{orginalPrice}</span>
                      <div>
                        <span className="rating-color item-font mantra-icon">
                          {rating}
                          <i className="fa fa-star" aria-hidden="true"></i>
                        </span>
                        <span className="mantra-icon item-font wishlistButton">
                          {wishlistAdded ? (
                            <i
                              onClick={() => updateWishList(_id)}
                              className="fa fa-heart icon-size"
                              id="wishlist"
                            ></i>
                          ) : (
                            <i
                              onClick={() => updateWishList(_id)}
                              className="fa fa-heart icon-size"
                            ></i>
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};
