import React, { useEffect, useState } from "react";
import "./css/Orders.css";
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingOrderDetails from "./order-details/ShoppingOrderDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrderByUserId,
  getOrderDetails,
  resetOrderDetails,
} from "../../features/shop/order-slice";
import { Badge } from "@mui/material";

function ShoppingOrders() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetail } = useSelector((state) => state.shopOrder);

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
    "& .MuiBackdrop-root": {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    "& .MuiPaper-root": {
      zIndex: 1301,
    },
  }));

  const [open, setOpen] = useState(false);

  const handleClickOpen = async (getId) => {
    await dispatch(getOrderDetails(getId));
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(resetOrderDetails());
  };

  useEffect(() => {
    if (orderDetail) {
      setOpen(true);
    }
  }, [orderDetail]);

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllOrderByUserId(user.id));
    }

    return () => {
      dispatch(resetOrderDetails());
    };
  }, [dispatch, user?.id]);

  return (
    <div>
      <h2>Order History</h2>
      <table className="order-history-table">
        <thead className="order-table-header">
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
                    }}
                    style={{ cursor: "pointer" }}
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
        {orderDetail ? (
          <ShoppingOrderDetails orderDetail={orderDetail} />
        ) : (
          <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>
        )}
        <DialogActions>
          {/* <button
            onClick={handleClose}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            Close
          </button> */}
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

export default ShoppingOrders;
