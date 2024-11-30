export const filterOptions = {
  category: [
    { id: 1, label: "All Products" },
    { id: 2, label: "Living Room" },
    { id: 3, label: "Bedroom" },
    { id: 4, label: "Kitchen" },
    { id: 5, label: "Office" },
    { id: 6, label: "Dining Room" },
    { id: 7, label: "Outdoor" },
  ],
  price: [
    { id: 1, label: "All Prices", min: 0, max: Infinity },
    { id: 2, label: "$0 - $50", min: 0, max: 50 },
    { id: 3, label: "$50 - $100", min: 50, max: 100 },
    { id: 4, label: "$100 - $300", min: 100, max: 300 },
    { id: 5, label: "$300 and above", min: 300, max: Infinity },
  ],
};

export const sortOptions = [
  { id: 1, label: "Price: Low to High", value: "price_lowtohigh" },
  { id: 2, label: "Price: High to Low", value: "price_hightolow" },
  { id: 3, label: "Title: A to Z", value: "title-atoz" },
  { id: 4, label: "Title: Z to A", value: "title-ztoa" },
];
export const toastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};
export const addressFormControls = [
  {
    label: "FIRST NAME",
    name: "first",
    componentType: "input",
    type: "text",
    placeholder: "First Name",
  },
  {
    label: "LAST NAME",
    name: "last",
    componentType: "input",
    type: "text",
    placeholder: "Last Name",
  },
  {
    label: "EMAIL ADDRESS",
    name: "email",
    componentType: "input",
    type: "text",
    placeholder: "Your Email",
  },

  {
    label: "STREET ADDRESS",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "COUNTRY",
    name: "country",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "CITY",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "STATE",
    name: "state",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "ZIP CODE",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "PHONE",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "NOTES",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
