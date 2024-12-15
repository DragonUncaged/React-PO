# Pin Code Lookup Application

This React application allows users to look up postal office details based on a given pin code. The app fetches data from the PostalPincode API and displays relevant information such as post office name, type, delivery status, district, and state. Additionally, users can filter results by post office name.

## Features
- Pin Code Lookup: Users can enter a pin code to retrieve postal office details.
- Search and Filter: Users can filter results by post office name.
- Loading Indicator: A loading spinner appears while data is being fetched.
- Error Handling: If no results are found, the app displays a message indicating no items found.

## Technologies Used
- React: For building the user interface.
- React Icons: For icons, including the search icon.
- Fetch API: For making requests to the PostalPincode API.
- CSS: For styling the app and making it user-friendly

## How to Use
Enter a pin code in the input field.
Click the "Lookup" button to fetch postal office details for the given pin code.
Once the data is fetched, you can filter the results by typing in the "Filter" input field.
The postal office details will be displayed as cards, showing the name, type, delivery status, district, and state.
