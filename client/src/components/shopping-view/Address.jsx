import React, { useEffect } from "react";
import { toastOptions } from "../../config";
import "./css/Address.css";
import AddressCard from "./AddressCard";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAddress,
  fetchAllAddresses,
} from "../../features/shop/address-slice";
import { toast } from "react-toastify";
import AddressFormContainer from "./Address-form-container";
import { useContext } from "react";
import ShopProductContext from "../../context/ShopProductContext";
function Address() {
  const { formData, setFormData, currentEditedId, setcurrentEditedId } =
    useContext(ShopProductContext);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  const handleDeleteAddress = (addressInfo) => {
    dispatch(
      deleteAddress({
        userId: user?.id,
        addressId: addressInfo._id,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllAddresses(user?.id));
        toast.success("Address deleted successfully", toastOptions);
      }
    });
  };

  const handleEditAddress = (addressInfo) => {
    setcurrentEditedId(addressInfo?._id);
    setFormData({
      ...formData,
      first: addressInfo?.first,
      last: addressInfo?.last,
      email: addressInfo?.email,
      address: addressInfo?.address,
      country: addressInfo?.country,
      state: addressInfo?.state,
      city: addressInfo?.city,
      pincode: addressInfo?.pincode,
      phone: addressInfo?.phone,
      notes: addressInfo?.notes,
    });
  };

  console.log("addree", formData);

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [dispatch, user?.id]);

  return (
    <div className="address-form-container">
      <h2 className="address-form-title">Address Form</h2>
      <div className="address-list">
        <h2 className="address-section-heading">Address List</h2>
        <div className="address-list-container">
          {addressList && addressList.length > 0 ? (
            addressList.map((address) => (
              <AddressCard
                key={address._id}
                addressinfo={address}
                handleDeleteAddress={handleDeleteAddress}
                handleEditAddress={handleEditAddress}
              />
            ))
          ) : (
            <p>No addresses found</p>
          )}
        </div>
      </div>
      <h1 className="address-section-heading">
        {currentEditedId !== null ? "Edit New Address" : "Add New Address"}
      </h1>
      <AddressFormContainer
        currentEditedId={currentEditedId}
        setcurrentEditedId={setcurrentEditedId}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
}

export default Address;
