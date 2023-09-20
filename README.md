# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**
### Live Demo
https://main--zenml.netlify.app/
## For bonus points...

1) How would you add the ability to create a stack and stack component to your application?

*For the stack creation, I would add an icon for creation of a stack that opens a sidebar with a form creation. Once the creation is done, the user can hide the form and continue to navigate the rest of the stacks.
*For the stack component, as it is already siplayed in a table, I would add a modal popup with a creation form and field controls to ensure an easy and efficient process of navigating the components and visualizing the new added components at the same time.

2) How would you add the ability to delete a stack and stack component to your application?

*For the deletion of the stack, we can simply add a delete icon in the swiperSlide that gets the id of the stack and deletes it.
**For the component deletion, I would add another column in the table with an action name that will enable the user to delete any specific component.

3) How would you handle a Bearer Token, in case the API would need authentication?

First of all, to securely use a token in case of implementing authentication, I would make sure to store it using Redux library and manage it correctly. Also, the token should be added in the request URLs (Including the bearer token to the request headers.)
The token should also have an expiry date so when the date expires, we use a refresh token and of course store it again replacing the old one. In addition, when using a token, I would create a protected/ private route component to add all routes there that need authentication to be accessed, and in case the access is denied, a meaningful error message should be displayed to the user. Last but not least, when the user logs out, the stored token should be cleared . 