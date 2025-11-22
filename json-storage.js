// products.js
// A small JSON-like module exporting an array of products.
// Each product has: id, title, price (number), category, image, description, rating, organic

export const products = [
  {
    id: "p1",
    title: "Organic Apples",
    price: 2.99,
    category: "fruit",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ0xhn1HZjbYxDZW5g-QtBNfW9KZo5ydAuZw&s",
    description: "Crisp and sweet, perfect for snacks",
    rating: 4.8,
    reviews: 124,
    organic: true
  },
  {
    id: "p2",
    title: "Fresh Carrots",
    price: 1.49,
    category: "vegetable",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ147q6Xk6hq61xWH9IsUOb9MID0hC5Cnd3C_zSRIQRjhdkgi1-Yrn0M4MnXlxpfDKVlo0&usqp=CAU",
    description: "Crunchy and nutrient-rich",
    rating: 4.6,
    reviews: 89,
    organic: false
  },
  {
    id: "p3",
    title: "Juicy Oranges",
    price: 3.49,
    category: "fruit",
    image: "https://i.pinimg.com/736x/5f/c2/d1/5fc2d1a488d3c6f3a00760c0993867bd.jpg",
    description: "Vitamin C packed citrus",
    rating: 4.9,
    reviews: 156,
    organic: true
  },
  {
    id: "p4",
    title: "Mixed Fruit Platter",
    price: 3.49,
    category: "fruit",
    image: "https://www.foodandwine.com/thmb/lfOAWN5BiVnpviTHo8hqTX3BGck=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Trendspotting-Gonzo-Fruit-Platters-FT-DI-MAG1123-5d7b3a18d5ff4400ab10e3fe6c970f33.jpg",
    description: "Assorted seasonal fruits",
    rating: 4.9,
    reviews: 156,
    organic: true
  },
  {
    id: "p5",
    title: "Strawberries",
    price: 5.0,
    category: "fruit",
    image: "https://joyfoodsunshine.com/wp-content/uploads/2022/05/summer-fruit-salad-recipe-1-500x500.jpg",
    description: "Sweet and juicy California grown",
    rating: 4.7,
    reviews: 72,
    organic: false
  },
  {
    id: "p6",
    title: "Dark Cherries",
    price: 4.5,
    category: "fruit",
    image: "https://www.herwholesomekitchen.com/wp-content/uploads/2022/06/easy-fruit-salad-1-7.jpg",
    description: "Bing cherries at their peak",
    rating: 4.8,
    reviews: 43,
    organic: false
  }
];

export default products;
