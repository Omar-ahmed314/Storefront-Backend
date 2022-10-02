# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
### Products
- Index: `'/product'` [GET]
- Show : `'/product/:id'` [GET]
- Create: `'/product'` [POST] [token required]
```json
// request body
{
    "title": "Rice",
    "price": 30
}
```
- Edit: `/product` [PUT]
```json
// request body
{
    "id": 2,
    "title": "Rice",
    "price": 30
}
```
- Delete: `/product/:id` [DELETE]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

### Users
- Index: `'/user'` [GET] [token required]
- Show: `'/user/:id'` [GET] [token required]
- Create N: `'/user'` [POST] [token required]
```json
// request body
{
    "first_name": "Said",
    "last_name": "Mohamed",
    "password": "password123"
}
```
- Edit: `/user` [PUT] [token required]
```json
// request body
{
    "id": 2,
    "first_name": "Said",
    "last_name": "Mohamed",
    "password": "password123"
}
```
- Delete: `'/user/:id'` [DELETE] [token required]
### Order
- Index: `'/order'` [GET]
- Show: `'/order/:id'` [GET]
- Create: `'/order'` [POST]
```json
// request body
{
    "user_id": 3,
    "status": false
}
```
- Edit: `'/order'` [PUT]
```json
// request body
{
    "id": 2,
    "user_id": 3,
    "status": false
}
```
- Delete: `'/order/:id'` [DELETE]
- addProductToOrder: `'/order/product'` [POST]
```json
// request body
{
    "order_id": 2,
    "product_id": 3,
    "qunatity": 30
}
```

### Order_Product
- Current Order by user (args: user id)[token required]
```json
// route /all_incompleted_orders [GET]
{
    // user id
    "id": 2
}
```
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

> Note: at the creation of a new user it will return a token in the response header that will be used in token-based api
```json
// response header
{
    "authorization": "Bearer <token>"
}
```
> Note: This key - value token will be set at the header of the request in the token-based requests
## Data Shapes
### Product
-  id: __integer__
- name: __varchar__
- price: __integer__
- [OPTIONAL] category: __integer__

### User
- id: __integer__
- firstName: __varchar__
- lastName: __varchar__
- password: __varchar__

### Order
- id: __integer__
- user_id: __integer__ [FOREIGN_KEY (user.id)]
- status of order (active or complete) (false or true): __boolean__

### Order_Product
- order_id: __integer__ [FOREIGN_KEY (order.id)]
- product_id: __integer__ [FOREIGN_KEY (product.id)]
- quantity: __integer__

