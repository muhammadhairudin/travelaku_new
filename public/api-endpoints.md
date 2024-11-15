# Dokumentasi Endpoint API TravelAku

## Struktur Endpoint

### 1. Authentication
- **Register User**:   ```http
  POST /api/v1/register
  Body: {
      "email": "example@mail.com",
      "password": "password123",
      "passwordRepeat": "password123",
      "role": "user|admin",
      "profilePictureUrl": "https://example.com/image.jpg",
      "phoneNumber": "08123456789"
  }  ```

- **Login User**:   ```http
  POST /api/v1/login
  Body: {
      "email": "example@mail.com",
      "password": "password123"
  }
  Response: {
      "token": "jwt_token_here"
  }  ```

- **Logout User**:   ```http
  GET /api/v1/logout
  Headers: {
      "Authorization": "Bearer {token}"
  }  ```

### 2. User Management
- **Get Logged User**:   ```http
  GET /api/v1/user
  Headers: {
      "Authorization": "Bearer {token}"
  }  ```

- **Get All Users**:   ```http
  GET /api/v1/all-user
  Headers: {
      "Authorization": "Bearer {token}"
  }
  Notes: Requires admin role  ```

- **Update Profile**:   ```http
  POST /api/v1/update-profile
  Headers: {
      "Authorization": "Bearer {token}"
  }
  Body: {
      "name": "John Doe",
      "email": "john@example.com",
      "profilePictureUrl": "https://example.com/image.jpg",
      "phoneNumber": "08123456789"
  }  ```

### 3. Banner Management
- **Create Banner**:   ```http
  POST /api/v1/create-banner
  Headers: {
      "Authorization": "Bearer {token}"
  }
  Body: {
      "name": "Banner Name",
      "imageUrl": "https://example.com/banner.jpg"
  }
  Notes: Requires admin role  ```

- **Update Banner**:   ```http
  POST /api/v1/update-banner/{id}
  Headers: {
      "Authorization": "Bearer {token}"
  }
  Body: {
      "name": "Updated Banner Name",
      "imageUrl": "https://example.com/new-banner.jpg"
  }
  Notes: Requires admin role  ```

### 4. Promo Management
- **Create Promo**:   ```http
  POST /api/v1/create-promo
  Headers: {
      "Authorization": "Bearer {token}"
  }
  Body: {
      "title": "Promo Title",
      "description": "Promo Description",
      "imageUrl": "https://example.com/promo.jpg",
      "terms_condition": "<p>Terms and conditions...</p>",
      "promo_code": "PROMO123",
      "promo_discount_price": 50000,
      "minimum_claim_price": 100000
  }
  Notes: Requires admin role  ```

### 5. Activity Management
- **Create Activity**:   ```http
  POST /api/v1/create-activity
  Headers: {
      "Authorization": "Bearer {token}"
  }
  Body: {
      "categoryId": "category_uuid",
      "title": "Activity Title",
      "description": "Activity Description",
      "imageUrls": [
          "https://example.com/image1.jpg",
          "https://example.com/image2.jpg"
      ],
      "price": 100000,
      "price_discount": 80000,
      "rating": 4.5,
      "total_reviews": 100,
      "facilities": "<p>WiFi, Pool, etc</p>",
      "address": "Full Address",
      "province": "Province Name",
      "city": "City Name",
      "location_maps": "<iframe src='google_maps_embed_url'></iframe>"
  }
  Notes: Requires admin role  ```

### 6. Cart Management
- **Add to Cart**:   ```http
  POST /api/v1/add-cart
  Headers: {
      "Authorization": "Bearer {token}"
  }
  Body: {
      "activityId": "activity_uuid"
  }  ```

### 7. Transaction Management
- **Create Transaction**:   ```http
  POST /api/v1/create-transaction
  Headers: {
      "Authorization": "Bearer {token}"
  }
  Body: {
      "cartIds": ["cart_uuid1", "cart_uuid2"],
      "paymentMethodId": "payment_method_uuid"
  }  ```

- **Update Transaction Proof**:   ```http
  POST /api/v1/update-transaction-proof-payment/{id}
  Headers: {
      "Authorization": "Bearer {token}"
  }
  Body: {
      "proofPaymentUrl": "https://example.com/proof.jpg"
  }  ```

- **Update Transaction Status**:   ```http
  POST /api/v1/update-transaction-status/{id}
  Headers: {
      "Authorization": "Bearer {token}"
  }
  Body: {
      "status": "success|failed"
  }
  Notes: Requires admin role  ```

### 8. Image Upload
- **Upload Image**:   ```http
  POST /api/v1/upload-image
  Headers: {
      "Authorization": "Bearer {token}",
      "Content-Type": "multipart/form-data"
  }
  Body: FormData {
      "image": File
  }
  Response: {
      "imageUrl": "https://example.com/uploaded-image.jpg"
  }  ```

### 9. Payment Methods
- **Get Payment Methods**:  ```http
  GET /api/v1/payment-methods
  Headers: {
      "Authorization": "Bearer {token}"
  }  ```

- **Generate Payment Methods**:  ```http
  POST /api/v1/generate-payment-methods
  Headers: {
      "Authorization": "Bearer {token}"
  }  ```

### 10. Category Management
- **Create Category**:  ```http
  POST /api/v1/create-category
  Headers: {
      "Authorization": "Bearer {token}"
  }
  Body: {
      "name": "Category Name",
      "imageUrl": "https://example.com/category.jpg"
  }
  Notes: Requires admin role  ```

- **Get Categories**:  ```http
  GET /api/v1/categories  ```

- **Get Category By Id**:  ```http
  GET /api/v1/category/{id}  ```

## Response Format

