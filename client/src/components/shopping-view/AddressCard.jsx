import React from "react";
import "./css/AddressCard.css";

const AddressCard = ({
  addressinfo,
  handleDeleteAddress,
  handleEditAddress,
}) => {
  return (
    <div className="address-card">
      <div className="address-card-header">
        <h3 className="address-title">Shipping Address</h3>
      </div>
      <div className="address-card-body">
        <div className="address-item">
          <span className="address-label">Address:</span>
          <span className="address-value">{addressinfo?.address}</span>
        </div>
        <div className="address-item">
          <span className="address-label">Country:</span>
          <span className="address-value">{addressinfo?.country}</span>
        </div>
        <div className="address-item">
          <span className="address-label">State:</span>
          <span className="address-value">{addressinfo?.state}</span>
        </div>
        <div className="address-item">
          <span className="address-label">City:</span>
          <span className="address-value">{addressinfo?.city}</span>
        </div>
        <div className="address-item">
          <span className="address-label">Zip code:</span>
          <span className="address-value">{addressinfo?.pincode}</span>
        </div>
        <div className="address-item">
          <span className="address-label">Phone:</span>
          <span className="address-value">{addressinfo?.phone}</span>
        </div>
        {addressinfo?.notes && (
          <div className="address-item">
            <span className="address-label">Notes:</span>
            <span className="address-value">{addressinfo?.notes}</span>
          </div>
        )}
      </div>
      <div className="address-card-footer">
        <button
          className="edit-button"
          onClick={() => handleEditAddress(addressinfo)}
        >
          Edit Address
        </button>
        <button
          className="delete-button"
          onClick={() => handleDeleteAddress(addressinfo)}
        >
          Delete Address
        </button>
      </div>
    </div>
  );
};

export default AddressCard;
