# TechMart - E-Commerce Website

A modern, responsive e-commerce platform for electronics and home appliances built with HTML, CSS, JavaScript, and Bootstrap 5.

## Features

- **Product Catalog** - Browse all products
- **Shopping Cart** - Full-featured cart with localStorage persistence
- **User Authentication** - Login and signup with Supabase backend
- **Product Details** - Dynamic product pages with specifications
- **Store Locator** - Find nearby stores with city filtering
- **Responsive Design** - Mobile-friendly interface using Bootstrap 5
- **Checkout System** - Complete order processing with payment options

## Technologies

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework**: Bootstrap 5.0.2
- **Icons**: Bootstrap Icons
- **Backend**: Supabase (Database & Authentication)
- **Storage**: localStorage for cart management

## Project Structure

```
Project Final/
├── Home.html              # Landing page
├── Home.js                # Home page logic
├── login.html             # User login
├── signup.html            # User registration
├── checkout.html          # Checkout page
├── product_list.html      # All products
├── our_stores.html        # Store locations
├── About Us.html          # Company info
├── Detail3.html           # Dynamic product details
├── Assets/                # Product images
├── JS/
│   ├── cart.js           # Shopping cart system
│   └── NewArrivals.js    # New arrivals logic
└── pages/
    ├── cart.html         # Cart page
    ├── Details.html      # Static product details
    └── Newarrivals.html  # New arrivals page
```

## Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/kariiim001/TechMart.git
   cd "TechMart"
   ```

2. **Configure API Keys**
   
   Update the Supabase API credentials in the following files:
   - `Home.js` - Products API
   - `JS/NewArrivals.js` - Products API
   - `login.html` - Authentication API
   - `signup.html` - Authentication API
   - `Detail3.html` - Product details API
   - `product_list.html` - Products API

3. **Run the project**
   
   Open `Home.html` in your browser or use a local server:


## Brand Colors

- Primary: `#ff6b35` (Orange)
- Dark: `#000000`
- Light: `#f8f9fa`

## API Integration

The project uses **Supabase** for:
- Product data management
- User authentication
- Database operations

### Endpoints Used
- Products: `Products` table
- Authentication: `logins` table
- Product List: `product_list` table

## Features Overview

### Shopping Cart
- Add/remove products
- Update quantities
- Persistent storage using localStorage
- Real-time price calculations
- Tax and shipping calculations

### User System
- Registration with email/password
- Secure login

### Product Management
- Dynamic product loading
- Flash sales section
- New arrivals section

## Pages

- **Home** - Hero section, categories, flash sales, new arrivals
- **Products** - Complete product catalog
- **Product Details** - Full specifications and related products
- **New Arrivals** - New arrival products
- **Cart** - Shopping cart with order summary
- **Checkout** - Billing and payment information
- **Login/Signup** - User authentication
- **About Us** - Company information and stats
- **Our Stores** - Physical store locations
