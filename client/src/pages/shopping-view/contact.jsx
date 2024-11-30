import React, { useState } from "react";
import "../CSS/shopping-view/ContactPage.css";
import { Card, CardContent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addNewContactUsMessage } from "../../features/shop/contactUs-slice";

function ShoppingContact() {
  const initialContactFormData = { name: "", email: "", message: "" };
  const { user } = useSelector((state) => state.auth);
  const { isLoading, error } = useSelector((state) => state.shopContactUs);
  const [contactFormData, setContactFormData] = useState(
    initialContactFormData
  );
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const dispatch = useDispatch();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setContactFormData({ ...contactFormData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        addNewContactUsMessage({ ...contactFormData, userId: user?.id })
      ).unwrap();
      setSubmissionStatus("Message sent successfully!");
    } catch {
      setSubmissionStatus("Failed to send the message.");
    } finally {
      setContactFormData(initialContactFormData);
    }
  };

  return (
    <Card className="contact-page">
      <CardContent>
        <div className="contact-us-main-container">
          <div className="contact-us-header">
            <h1>Contact Us</h1>
            <p>Feel free to reach out with any inquiries or feedback!</p>
          </div>
          <div className="contact-us-container">
            <div className="contact-us-form-container">
              <h2>Send Us a Message</h2>
              <form className="contact-us-form" onSubmit={handleSubmit}>
                <div className="form-group-container">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contactFormData.name}
                    placeholder="Enter your name"
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group-container">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={contactFormData.email}
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group-container">
                  <label htmlFor="message">Message:</label>
                  <textarea
                    id="message"
                    name="message"
                    value={contactFormData.message}
                    rows="4"
                    placeholder="Write your message here"
                    required
                    onChange={handleFormChange}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="contact-us-submit-button"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </button>
              </form>
              {submissionStatus && <p>{submissionStatus}</p>}
              {error && <p className="error-text">{error}</p>}
            </div>
            <div className="contact-us-details-container">
              <h2>Contact Details</h2>
              <div className="contact-us-details">
                <p>
                  <strong>Phone:</strong> +123 456 7890
                </p>
                <p>
                  <strong>Email:</strong> support@example.com
                </p>
                <p>
                  <strong>Address:</strong> 123 Main Street, City, Country
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ShoppingContact;
