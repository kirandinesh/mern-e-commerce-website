import React, { useEffect } from "react";
import "../CSS/admin-view/AdminInbox.css";
import { Card, CardContent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchContactUsMessage } from "../../features/shop/contactUs-slice";
function AdminInbox() {
  const { contactUsMessage } = useSelector((state) => state.shopContactUs);
  const dispatch = useDispatch();
  console.log(contactUsMessage, "contactUsMessagecontactUsMessage");
  useEffect(() => {
    dispatch(fetchContactUsMessage());
  }, [dispatch]);
  return (
    <div className="inbox-main-container">
      <h2>Inbox</h2>
      {contactUsMessage.map((item) => (
        <Card className="inbox-card-container">
          <CardContent className="inbox-card-content">
            <span>name : {item?.name}</span>
            <span>email : {item?.email}</span>
            <span>message : {item?.message}</span>
            <span>Date : {item?.createdAt.split("T")[0]}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default AdminInbox;
