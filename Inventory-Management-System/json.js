const inventoryData = {
  "inventory": {
    "products": [
      {
        "name": "Product1",
        "id": "001",
        "price": 10.99,
        "expirydate": "2024-12-31",
        "quantity": 50,
        "category": "Category1",
        "supplier": "Supplier1"
      },
      {
        "name": "Product2",
        "id": "002",
        "price": 15.49,
        "expirydate": "2024-11-30",
        "quantity": 30,
        "category": "Category2",
        "supplier": "Supplier2"
      }
    ],
    "categories": [
      {
        "name": "Category1",
        "subcategories": ["Subcategory1", "Subcategory2"]
      },
      {
        "name": "Category2",
        "subcategories": ["Subcategory3", "Subcategory4"]
      }
    ],
    "suppliers": [
      {
        "name": "Supplier1",
        "email": "supplier1@example.com",
        "phno": "1234567890",
        "productsSupplied": ["Product1", "Product3"]
      },
      {
        "name": "Supplier2",
        "email": "supplier2@example.com",
        "phno": "9876543210",
        "productsSupplied": ["Product2", "Product4"]
      }
    ]
  }
}
