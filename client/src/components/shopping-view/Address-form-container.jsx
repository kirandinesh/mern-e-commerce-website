import React, { useContext } from "react";
import { addressFormControls, toastOptions } from "../../config";
import "./css/Address.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  editAddress,
  fetchAllAddresses,
} from "../../features/shop/address-slice";
import { toast } from "react-toastify";
import "./css/AddressFormContainer.css";
import ShopProductContext from "../../context/ShopProductContext";

function AddressFormContainer() {
  const {
    formData,
    setFormData,
    currentEditedId,
    setcurrentEditedId,
    initialFormData,
    setactive,
  } = useContext(ShopProductContext);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (addressList.length >= 3 && currentEditedId === null) {
      setFormData(initialFormData);
      toast.info("You can add max 3 addresses", toastOptions);
      return;
    }
    currentEditedId !== null
      ? dispatch(
          editAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formdata: formData,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            setcurrentEditedId(null);
            setFormData(initialFormData);
            dispatch(fetchAllAddresses(user?.id));
            toast.success("Address updated successfully", toastOptions);
          }
        })
      : dispatch(
          addAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data?.payload?.success) {
            setFormData(initialFormData);
            dispatch(fetchAllAddresses(user?.id));
            toast.success("Address added successfully", toastOptions);
          }
        });
  };

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  return (
    <div className="address-form-main">
      {addressFormControls.map((control) => (
        <div className="address-form-group" key={control.name}>
          <label className="address-form-label" htmlFor={control.name}>
            {control.label}
          </label>
          {control.componentType === "input" && (
            <input
              id={control.name}
              name={control.name}
              type={control.type}
              placeholder={control.placeholder}
              className="address-form-input"
              value={formData[control.name]}
              onChange={handleChange}
            />
          )}
          {control.componentType === "textarea" && (
            <textarea
              id={control.name}
              name={control.name}
              placeholder={control.placeholder}
              className="address-form-textarea"
              value={formData[control.name]}
              onChange={handleChange}
              rows={3}
            />
          )}
        </div>
      ))}
      <div className="address-form-footer-container">
        <button
          type="button"
          className={`address-form-submit${!isFormValid() ? " disabled" : ""}`}
          disabled={!isFormValid()}
          onClick={handleSubmit}
        >
          {currentEditedId !== null ? "Edit" : "Submit"}
        </button>

        <button
          className="address-form-cancel"
          onClick={() => {
            setFormData(initialFormData);
            setcurrentEditedId(null);
            setactive(false);
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default AddressFormContainer;
