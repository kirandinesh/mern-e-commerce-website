import React, { useEffect, useState } from "react";
import "./AdminOrders.css";
import { useDispatch, useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AdminOrderDetails from "../order-view/AdminOrderDetails";
import {
  getAllOrdersOfAllUser,
  getOrderDetailsForAdmin,
  reserOrderDetailsAdmin,
} from "../../../features/admin/orders-slice";
import { Badge } from "@mui/material";
function AdminOrders() {
  const { orderList, orderDetail } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));
  console.log(orderDetail, "orderDetailADNIN");
  const [open, setOpen] = useState(false);
  const handleClickOpen = async (getId) => {
    await dispatch(getOrderDetailsForAdmin(getId));
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    dispatch(reserOrderDetailsAdmin());
  };
  console.log(orderList, "ADMIN orderList");
  useEffect(() => {
    if (orderDetail !== null) {
      setOpen(true);
    }
  }, [orderDetail]);

  useEffect(() => {
    dispatch(getAllOrdersOfAllUser());
    return () => {
      dispatch(reserOrderDetailsAdmin());
    };
  }, [dispatch]);

  return (
    <div>
      <h2>All Orders</h2>
      <table className="admin-order-history-table">
        <thead className="admin-order-table-header">
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Order Status</th>
            <th>Order Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orderList && orderList.length > 0 ? (
            orderList.map((orderItem) => (
              <tr key={orderItem._id}>
                <td>{orderItem._id}</td>
                <td>{orderItem.orderDate.split("T")[0]}</td>
                <td className="orderStatus">
                  <Badge
                    className="orderStatus-badge"
                    style={{
                      backgroundColor:
                        orderItem?.orderStatus === "rejected"
                          ? "red"
                          : orderItem?.orderStatus === "confirmed"
                          ? "green"
                          : orderItem?.orderStatus === "delivered"
                          ? "skyblue"
                          : "black",
                    }}
                  >
                    {orderItem.orderStatus}
                  </Badge>
                </td>
                <td>${orderItem.totalAmount}</td>
                <td>
                  <button
                    className="admin-order-view-details"
                    onClick={() => {
                      handleClickOpen(orderItem._id);
                      dispatch(reserOrderDetailsAdmin());
                    }}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Order Details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <AdminOrderDetails orderDetail={orderDetail} />

        <DialogActions></DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default AdminOrders;
