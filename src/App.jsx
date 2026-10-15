import { useState } from "react";
import "./App.css";

const bookingEmail = "ayrandivonne.24@gmail.com";
const emailJsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const emailJsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const emailJsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const rooms = [
  {
    name: "Standard Coastal Room",
    type: "Perfect for single travelers or couples",
    maxGuests: 2,
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
    description:
      "A simple and relaxing room with all the comforts of home after a day by the water.",
    amenities: [
      "One queen-size bed",
      "Air-conditioning",
      "Private bathroom",
      "Wi-Fi access",
      "Smart television",
      "Towels and toiletries",
      "Drinking water",
      "Small work desk",
    ],
  },
  {
    name: "Deluxe Surf View Room",
    type: "Perfect for couples and surfers",
    maxGuests: 2,
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80",
    description:
      "Enjoy a comfortable coastal setting with additional space and a relaxing view of the surrounding beach area.",
    amenities: [
      "One or two twin beds",
      "Private balcony or viewing area",
      "Air-conditioning",
      "Private bathroom",
      "Hot and cold shower",
      "Wi-Fi access",
      "Mini refrigerator",
      "Coffee and tea station",
      "Surfboard storage on request",
    ],
  },
  {
    name: "Family Beach Suite",
    type: "Ideal for families and groups of friends",
    maxGuests: 4,
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
    description:
      "A spacious and comfortable place for families and small groups who want privacy while enjoying La Union.",
    amenities: [
      "Two queen-size beds",
      "Private bathroom",
      "Air-conditioning",
      "Wi-Fi access",
      "Smart television",
      "Mini refrigerator",
      "Changing table or seat",
      "Complimentary drinking water",
    ],
  },
];

const menuCategories = [
  {
    title: "Filipino Breakfast",
    subtitle: "Start your morning with comforting Filipino favorites.",
    items: [
      {
        name: "Longganisa Silog",
        description: "Sweet Filipino-style sausage served with garlic rice and egg.",
        price: "₱220",
        image:
          "https://i.pinimg.com/736x/74/3f/d1/743fd123254f642d43555ccff397c65b.jpg",
      },
      {
        name: "Tapsilog",
        description: "Tender marinated beef with garlic rice and sunny-side-up egg.",
        price: "₱240",
        image:
          "https://i.pinimg.com/736x/b4/75/ba/b475ba8b0daf32de1846ac5c35989341.jpg",
      },
      {
        name: "Daing na Bangus",
        description: "Marinated milkfish served with garlic rice, egg and fresh sides.",
        price: "₱260",
        image:
          "https://i.pinimg.com/736x/67/2e/6f/672e6f1e5d826efcbe2a0c4d4f956551.jpg",
      },
    ],
  },
  {
    title: "Fruits & Iced Beverages",
    subtitle: "Refreshing drinks and fresh tropical flavors.",
    items: [
      {
        name: "Fresh Fruit Bowl",
        description: "A refreshing selection of seasonal tropical fruits.",
        price: "₱160",
        image:
          "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Iced Coffee",
        description: "Smooth chilled coffee perfect for a relaxing afternoon.",
        price: "₱150",
        image:
          "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Calamansi Cooler",
        description: "Fresh and naturally refreshing Filipino citrus drink.",
        price: "₱130",
        image:
          "https://i.pinimg.com/736x/27/c8/9e/27c89e4cc8de30e6b23cb2daf7cfc63b.jpg",
      },
    ],
  },
  {
    title: "Fruit Shakes",
    subtitle: "Cold, creamy and tropical.",
    items: [
      {
        name: "Mango Shake",
        description: "Creamy blended Philippine mangoes served chilled.",
        price: "₱180",
        image:
          "https://i.pinimg.com/736x/3d/78/a4/3d78a48c8e3aadd0a7a8c4e44235b539.jpg",
      },
      {
        name: "Watermelon Shake",
        description: "Light and refreshing watermelon blended into a cool drink.",
        price: "₱170",
        image:
          "https://i.pinimg.com/736x/14/2c/12/142c120423690ffb9d7476e8f3675049.jpg",
      },
      {
        name: "Pineapple Shake",
        description: "Sweet and tangy tropical pineapple shake.",
        price: "₱170",
        image:
          "https://i.pinimg.com/736x/08/0b/1d/080b1d27a233f21efaa2946e0d13c53d.jpg",
      },
    ],
  },
  {
    title: "Sandwiches & Pasta",
    subtitle: "Easy favorites for a casual coastal meal.",
    items: [
      {
        name: "Coastal Club Sandwich",
        description: "A generous layered sandwich with fresh vegetables and savory fillings.",
        price: "₱250",
        image:
          "https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Creamy Garlic Pasta",
        description: "Creamy pasta finished with garlic and herbs.",
        price: "₱280",
        image:
          "https://i.pinimg.com/736x/b0/6d/c7/b06dc7f4a88802ba07e5f87196c9c4ff.jpg",
      },
      {
        name: "Tomato Basil Pasta",
        description: "Classic pasta with tomato sauce, herbs and parmesan.",
        price: "₱260",
        image:
          "https://i.pinimg.com/736x/8a/60/ce/8a60ced933cc7f9cb5d9bc4b7a6d4ab7.jpg",
      },
    ],
  },
  {
    title: "Ethnic Dishes & Baked Goods",
    subtitle: "Local-inspired flavors and freshly prepared treats.",
    items: [
      {
        name: "Ilocano Bagnet",
        description: "Crispy pork belly inspired by the flavors of Northern Luzon.",
        price: "₱320",
        image:
          "https://i.pinimg.com/736x/c6/4b/1f/c64b1f2e92e1fbb46faec20150e56c86.jpg",
      },
      {
        name: "Local Empanada",
        description: "Crispy pastry filled with savory local-inspired ingredients.",
        price: "₱150",
        image:
          "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Fresh Coastal Pastry",
        description: "A freshly baked sweet treat perfect with coffee.",
        price: "₱120",
        image:
          "https://i.pinimg.com/736x/f8/28/a3/f828a36c1c0a7c1d22437ab543d16bc2.jpg",
      },
    ],
  },
  {
    title: "Seafood & Vegetable Dishes",
    subtitle: "Fresh and satisfying choices inspired by the coast.",
    items: [
      {
        name: "Grilled Fish",
        description: "Freshly grilled fish served with vegetables and rice.",
        price: "₱320",
        image:
          "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Garlic Butter Shrimp",
        description: "Succulent shrimp cooked in a rich garlic butter sauce.",
        price: "₱350",
        image:
          "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=800&q=80",
      },
      {
        name: "Grilled Vegetable Plate",
        description: "Seasonal vegetables grilled and lightly seasoned.",
        price: "₱240",
        image:
          "https://i.pinimg.com/736x/f7/f9/70/f7f970ab5863f61dccbf537c778bbb44.jpg",
      },
    ],
  },
  {
    title: "Vegetarian Options",
    subtitle: "Fresh, comforting and plant-friendly choices.",
    items: [
      {
        name: "Vegetable Rice Bowl",
        description: "Steamed rice topped with fresh vegetables and house sauce.",
        price: "₱230",
        image:
          "https://i.pinimg.com/736x/58/34/db/5834dbc1894de4bfffc27b522ecfc532.jpg",
      },
      {
        name: "Garden Pasta",
        description: "Pasta tossed with colorful seasonal vegetables.",
        price: "₱250",
        image:
          "https://i.pinimg.com/736x/35/c2/7a/35c27accd01189145e83356621c5b734.jpg",
      },
      {
        name: "Fresh Garden Salad",
        description: "Crisp vegetables with a light house dressing.",
        price: "₱190",
        image:
          "https://i.pinimg.com/736x/b9/45/c0/b945c08001a39e8a50084848878224e8.jpg",
      },
    ],
  },
];

const additionalMenuItems = {
  "Filipino Breakfast": [
    {
      name: "Chicken Tocilog",
      description: "Sweet cured chicken with garlic rice and a fried egg.",
      price: "₱230",
      image: "https://i.pinimg.com/736x/2c/b6/a9/2cb6a92970b6316adf8c41b566389f6f.jpg",
    },
    {
      name: "Pork Tosilog",
      description: "Sweet Filipino-style pork with garlic rice and egg.",
      price: "₱240",
      image: "https://i.pinimg.com/736x/ce/79/1b/ce791bb5682759498472c02bf7a9a1b9.jpg",
    },
    {
      name: "Hotsilog",
      description: "Filipino-style hotdogs served with garlic rice and egg.",
      price: "₱210",
      image: "https://i.pinimg.com/736x/ad/46/93/ad469381f2b5bf8605017a04f0fe8e8a.jpg",
    },
    {
      name: "Corned Beef Silog",
      description: "Sautéed corned beef with garlic rice and a fried egg.",
      price: "₱230",
      image: "https://i.pinimg.com/736x/04/5f/8c/045f8cdcaff10c52e8e868a23631b994.jpg",
    },
    {
      name: "Bangsilog",
      description: "Crispy milkfish served with garlic rice and egg.",
      price: "₱250",
      image: "https://i.pinimg.com/736x/33/c4/3e/33c43e6663752e91cdb25c449506420a.jpg",
    },
    {
      name: "Tapsilog Special",
      description: "Marinated beef tapa with garlic rice and a sunny-side-up egg.",
      price: "₱260",
      image: "https://i.pinimg.com/736x/f8/9d/d8/f89dd8652f466f41864b54dfd047fc76.jpg",
    },
    {
      name: "Pork Longganisa Silog",
      description: "Savory pork longganisa with garlic rice and egg.",
      price: "₱240",
      image: "https://i.pinimg.com/736x/cd/88/66/cd88663151af9a12ba1163c956ce21c4.jpg",
    },
  ],
  "Fruits & Iced Beverages": [
    {
      name: "Fresh Buko Juice",
      description: "Chilled young coconut water served fresh.",
      price: "₱140",
      image: "https://i.pinimg.com/736x/f5/7b/9c/f57b9c002ba6c57f8267b5f747efabfd.jpg",
    },
    {
      name: "Pineapple Juice",
      description: "Bright, sweet pineapple juice served over ice.",
      price: "₱130",
      image: "https://i.pinimg.com/736x/6e/9a/36/6e9a3659956f231eb458b368d82a2676.jpg",
    },
    {
      name: "Iced Matcha Latte",
      description: "Earthy matcha blended with milk and served chilled.",
      price: "₱170",
      image: "https://i.pinimg.com/736x/77/ee/3f/77ee3f94c7ede9ed4a89025c9cd12040.jpg",
    },
    {
      name: "Iced Chocolate",
      description: "Cold chocolate milk poured over ice.",
      price: "₱150",
      image: "https://i.pinimg.com/736x/5c/1d/03/5c1d03e4d5069e632b0ec7b5748d5f31.jpg",
    },
    {
      name: "Cucumber Lemonade",
      description: "Fresh cucumber and lemon in a cool, lightly sweet drink.",
      price: "₱140",
      image: "https://i.pinimg.com/736x/95/c6/0b/95c60bd0a82b49c65542a83202155221.jpg",
    },
    {
      name: "Fresh Orange Juice",
      description: "Freshly squeezed orange juice served chilled.",
      price: "₱150",
      image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Iced Tea",
      description: "Refreshing brewed tea served over ice.",
      price: "₱110",
      image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=800&q=80",
    },
  ],
  "Fruit Shakes": [
    {
      name: "Avocado Shake",
      description: "Creamy avocado blended with milk and ice.",
      price: "₱190",
      image: "https://i.pinimg.com/736x/f8/16/82/f81682ee5177f4782de3bfc506ab4f03.jpg",
    },
    {
      name: "Banana Shake",
      description: "Ripe banana blended into a smooth, chilled shake.",
      price: "₱160",
      image: "https://i.pinimg.com/736x/c9/5f/99/c95f99027bf229bb6504cbb7f4bca35f.jpg",
    },
    {
      name: "Strawberry Shake",
      description: "Sweet strawberries blended with milk and ice.",
      price: "₱190",
      image: "https://i.pinimg.com/736x/5a/49/91/5a4991480ac99955ec842723700355b0.jpg",
    },
    {
      name: "Papaya Shake",
      description: "Ripe papaya blended into a smooth tropical drink.",
      price: "₱170",
      image: "https://i.pinimg.com/736x/0a/df/cf/0adfcf8af31c418505c54b31c870e649.jpg",
    },
    {
      name: "Pineapple Mango Shake",
      description: "A sweet-tart blend of pineapple and Philippine mango.",
      price: "₱190",
      image: "https://i.pinimg.com/736x/a3/42/6c/a3426c13767a0899ef11b5b9bdee3a74.jpg",
    },
    {
      name: "Buko Pandan Shake",
      description: "Young coconut blended with creamy pandan flavor.",
      price: "₱190",
      image: "https://i.pinimg.com/736x/2b/50/b9/2b50b96f51527e77973d0c1f1d3f3d6a.jpg",
    },
    {
      name: "Mixed Berry Shake",
      description: "A chilled blend of berries and creamy milk.",
      price: "₱200",
      image: "https://i.pinimg.com/736x/dc/65/71/dc6571d278b3fac506f527d0cd86f1d6.jpg",
    },
  ],
  "Sandwiches & Pasta": [
    {
      name: "Tuna Melt Sandwich",
      description: "Tuna salad and melted cheese on toasted bread.",
      price: "₱240",
      image: "https://i.pinimg.com/736x/c4/6a/2b/c46a2b44bd9809e1d44043fb31fea717.jpg",
    },
    {
      name: "Grilled Chicken Sandwich",
      description: "Grilled chicken with lettuce and house dressing.",
      price: "₱260",
      image: "https://i.pinimg.com/736x/ef/e7/2f/efe72f955917d48f6a2f4339cf0c3e24.jpg",
    },
    {
      name: "Classic BLT Sandwich",
      description: "Crisp bacon, lettuce and tomato on toasted bread.",
      price: "₱250",
      image: "https://i.pinimg.com/736x/d9/26/1a/d9261a05f7d9cf874ae80db1d2167a9c.jpg",
    },
    {
      name: "Pesto Chicken Pasta",
      description: "Pasta with basil pesto, grilled chicken and parmesan.",
      price: "₱320",
      image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Spaghetti Bolognese",
      description: "Spaghetti tossed with a rich beef and tomato sauce.",
      price: "₱300",
      image: "https://i.pinimg.com/736x/e8/00/db/e800db68c66b7502be329979a82bc792.jpg",
    },
    {
      name: "Seafood Pasta",
      description: "Pasta tossed with shrimp, squid and a light garlic sauce.",
      price: "₱360",
      image: "https://i.pinimg.com/736x/15/26/cf/1526cfacf95f21ddc04e650a4eeec575.jpg",
    },
    {
      name: "Four-Cheese Pasta",
      description: "Creamy pasta finished with a blend of four cheeses.",
      price: "₱330",
      image: "https://i.pinimg.com/736x/36/b9/00/36b900db69c56103a301779c369075c8.jpg",
    },
  ],
  "Ethnic Dishes & Baked Goods": [
    {
      name: "Bagnet Kare-Kare",
      description: "Crispy bagnet served with vegetables and peanut sauce.",
      price: "₱390",
      image: "https://i.pinimg.com/736x/b2/f7/16/b2f716595395d1af4e8fa81b5a4e512e.jpg",
    },
    {
      name: "Pinakbet",
      description: "Ilocano-style vegetables simmered with bagoong.",
      price: "₱260",
      image: "https://i.pinimg.com/736x/d7/01/c7/d701c73dc918b62cb6f1509ff23c53bd.jpg",
    },
    {
      name: "Ilocano Miki",
      description: "A comforting noodle soup inspired by Ilocano miki.",
      price: "₱240",
      image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Vigan-Style Empanada",
      description: "Crispy rice-flour pastry filled with savory local-style filling.",
      price: "₱170",
      image: "https://i.pinimg.com/736x/37/6f/7c/376f7cb8a1a55d2bc2b7073062c1c695.jpg",
    },
    {
      name: "Pancit Canton",
      description: "Stir-fried egg noodles with vegetables and savory toppings.",
      price: "₱250",
      image: "https://i.pinimg.com/736x/35/21/03/352103acf31abc9efa30b132b1e4f5b4.jpg",
    },
    {
      name: "Bibingka",
      description: "Soft Filipino rice cake baked with a lightly toasted top.",
      price: "₱140",
      image: "https://i.pinimg.com/736x/62/73/46/627346736678139e4b5f924e15ff3965.jpg",
    },
    {
      name: "Ensaymada",
      description: "Soft, buttery Filipino bread topped with cheese and sugar.",
      price: "₱130",
      image: "https://i.pinimg.com/736x/7c/54/60/7c546024500822c7515b036794c927da.jpg",
    },
  ],
  "Seafood & Vegetable Dishes": [
    {
      name: "Grilled Tuna Steak",
      description: "Grilled tuna steak served with rice and seasonal vegetables.",
      price: "₱390",
      image: "https://i.pinimg.com/736x/7f/b0/85/7fb0856e383c3ff8d45652046b7bb12a.jpg",
    },
    {
      name: "Crispy Calamari",
      description: "Lightly battered calamari served with a house dipping sauce.",
      price: "₱290",
      image: "https://i.pinimg.com/736x/76/83/a8/7683a8fe998b84fc85a84bffb98ead16.jpg",
    },
    {
      name: "Grilled Squid",
      description: "Tender squid grilled and served with a citrus-soy dip.",
      price: "₱340",
      image: "https://i.pinimg.com/736x/77/69/fa/7769fa0a40fffb9f47e089e98f9cc64c.jpg",
    },
    {
      name: "Fish and Chips",
      description: "Crispy battered fish served with golden fries.",
      price: "₱330",
      image: "https://i.pinimg.com/736x/31/61/e8/3161e808b41a7d2b91335b449616c298.jpg",
    },
    {
      name: "Seafood Sinigang",
      description: "Shrimp and fish in a tangy tamarind broth with vegetables.",
      price: "₱360",
      image: "https://i.pinimg.com/736x/fe/73/a0/fe73a064e47d78f72f837c22667c8717.jpg",
    },
    {
      name: "Grilled Eggplant",
      description: "Smoky grilled eggplant finished with a simple savory dressing.",
      price: "₱190",
      image: "https://i.pinimg.com/736x/85/65/67/85656773d5047a94bc847ae8f68d712d.jpg",
    },
    {
      name: "Sautéed Seasonal Vegetables",
      description: "Fresh seasonal vegetables quickly sautéed with garlic.",
      price: "₱220",
      image: "https://i.pinimg.com/736x/02/d9/93/02d993eaefc52f4fbcaf648ac53fb46c.jpg",
    },
  ],
  "Vegetarian Options": [
    {
      name: "Vegetable Pancit Bihon",
      description: "Rice noodles stir-fried with vegetables and savory seasoning.",
      price: "₱220",
      image: "https://i.pinimg.com/736x/7e/e6/b5/7ee6b57211c8b637b8bb2fa4cd962215.jpg",
    },
    {
      name: "Tofu Vegetable Stir-Fry",
      description: "Tofu and crisp vegetables tossed in a light soy-ginger sauce.",
      price: "₱240",
      image: "https://i.pinimg.com/736x/27/08/c1/2708c11ad36459cfaa4abf1f98d5ddf6.jpg",
    },
    {
      name: "Mushroom Pasta",
      description: "Pasta with sautéed mushrooms, garlic and herbs.",
      price: "₱280",
      image: "https://i.pinimg.com/736x/96/07/54/960754bbe6aeb6b2a3bc3e7c12507aaf.jpg",
    },
    {
      name: "Vegetable Spring Rolls",
      description: "Crispy vegetable-filled rolls served with dipping sauce.",
      price: "₱180",
      image: "https://i.pinimg.com/736x/2e/3d/74/2e3d7477e118e0894a0a7bdd717eb5fa.jpg",
    },
    {
      name: "Roasted Vegetable Sandwich",
      description: "Roasted seasonal vegetables layered in toasted bread.",
      price: "₱230",
      image: "https://i.pinimg.com/736x/74/b4/e2/74b4e2ba22239893c4108e7eb9060a5a.jpg",
    },
    {
      name: "Vegetable Curry Bowl",
      description: "Seasonal vegetables simmered in a mild coconut curry.",
      price: "₱260",
      image: "https://i.pinimg.com/736x/bd/b0/36/bdb03672344a1168d7c75851fbffe3a2.jpg",
    },
    {
      name: "Caprese Salad",
      description: "Tomato, mozzarella and basil finished with a light dressing.",
      price: "₱250",
      image: "https://i.pinimg.com/736x/9f/97/b9/9f97b9d764e3df4790889f271fb2dbcd.jpg",
    },
  ],
};

const attractions = [
  {
    name: "Urbiztondo Beach",
    location: "San Juan, La Union",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    description:
      "A popular coastal destination known for its beach atmosphere and surfing experience.",
  },
  {
    name: "Tangadan Falls",
    location: "San Gabriel, La Union",
    image:
      "https://i.pinimg.com/736x/e0/a2/6d/e0a26d3b0204be9459580735e100bb8c.jpg",
    description:
      "A beautiful natural attraction surrounded by lush scenery and refreshing waters.",
  },
  {
    name: "Grape Farms",
    location: "Bauang, La Union",
    image:
      "https://images.unsplash.com/photo-1537640538966-79f369143f8f?auto=format&fit=crop&w=1200&q=80",
    description:
      "Explore one of La Union's local agricultural attractions and experience its grape-growing culture.",
  },
  {
    name: "Ma-Cho Temple",
    location: "San Fernando City, La Union",
    image:
      "https://i.pinimg.com/736x/f4/0d/ec/f40deca7fda3a78f3ef2f82d90532c8d.jpg",
    description:
      "A notable cultural and architectural destination overlooking parts of the city.",
  },
  {
    name: "Poro Point Lighthouse",
    location: "San Fernando City, La Union",
    image:
      "https://static.wixstatic.com/media/6a8512_8dc8d6a127e448ff9fb98004a6d0825e~mv2.jpg/v1/fill/w_635,h_423,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/6a8512_8dc8d6a127e448ff9fb98004a6d0825e~mv2.jpg",
    description:
      "A scenic destination where guests can enjoy coastal views and explore the area.",
  },
  {
    name: "Baluarte Watch Tower",
    location: "Luna, La Union",
    image:
      "https://i.pinimg.com/736x/f9/38/53/f9385302525d9d3dcee4ebd958ea4748.jpg",
    description:
      "A historic coastal landmark and one of the interesting destinations to visit in La Union.",
  },
];

const values = [
  {
    title: "Warm Hospitality",
    text: "Respect, friendliness and caring towards every guest.",
  },
  {
    title: "Comfort & Cleanliness",
    text: "Maintaining clean, safe and well-prepared rooms.",
  },
  {
    title: "Guest Satisfaction",
    text: "Being courteous and responsive to guest requirements.",
  },
  {
    title: "Sustainability",
    text: "Minimising waste and promoting responsible use of water and electricity.",
  },
  {
    title: "Community Support",
    text: "Supporting local guides, restaurants, cafes and souvenir businesses.",
  },
];

function App() {
  const [activeRoom, setActiveRoom] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [bookingStatus, setBookingStatus] = useState("");
  const [isSendingBooking, setIsSendingBooking] = useState(false);
  const [selectedRoomName, setSelectedRoomName] = useState("");
  const [adultCount, setAdultCount] = useState(2);
  const [childCount, setChildCount] = useState(0);
  const page = new URLSearchParams(window.location.search).get("page");

  const selectedRoom = rooms.find((room) => room.name === selectedRoomName);
  const guestLimit = selectedRoom?.maxGuests;

  const closeMenu = () => setMobileMenu(false);

  const handleRoomChange = (event) => {
    const roomName = event.target.value;
    const room = rooms.find((item) => item.name === roomName);

    setSelectedRoomName(roomName);
    if (room) {
      const nextAdultCount = Math.min(adultCount, room.maxGuests);
      setAdultCount(Math.max(1, nextAdultCount));
      setChildCount(Math.min(childCount, room.maxGuests - Math.max(1, nextAdultCount)));
    }
  };

  const handleAdultCountChange = (event) => {
    const nextAdultCount = Number(event.target.value);
    if (!Number.isInteger(nextAdultCount) || nextAdultCount < 1) return;
    const adjustedAdultCount = guestLimit
      ? Math.min(nextAdultCount, Math.max(1, guestLimit - childCount))
      : nextAdultCount;
    setAdultCount(adjustedAdultCount);
  };

  const handleChildCountChange = (event) => {
    const nextChildCount = Number(event.target.value);
    if (!Number.isInteger(nextChildCount) || nextChildCount < 0) return;
    const adjustedChildCount = guestLimit
      ? Math.min(nextChildCount, Math.max(0, guestLimit - adultCount))
      : nextChildCount;
    setChildCount(adjustedChildCount);
  };

  const sendBookingInquiry = async (event) => {
    event.preventDefault();
    setBookingStatus("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const checkIn = formData.get("checkIn");
    const checkOut = formData.get("checkOut");
    const phone = String(formData.get("phone") || "").trim();
    const selectedRoomDetails = rooms.find((room) => room.name === formData.get("room"));
    const totalGuests = Number(formData.get("adults")) + Number(formData.get("children") || 0);

    if (!/^0\d{10}$/.test(phone)) {
      setBookingStatus("Mali ang contact number: maglagay ng eksaktong 11 digits na nagsisimula sa 0.");
      return;
    }

    if (checkIn >= checkOut) {
      setBookingStatus("Mali ang dates: ang check-out ay dapat pagkatapos ng check-in.");
      return;
    }

    if (selectedRoomDetails && totalGuests > selectedRoomDetails.maxGuests) {
      setBookingStatus(
        `Lampas sa kapasidad ng ${selectedRoomDetails.name}. Hanggang ${selectedRoomDetails.maxGuests} bisita lang (kasama ang mga bata).`
      );
      return;
    }

    if (!emailJsServiceId || !emailJsTemplateId || !emailJsPublicKey) {
      setBookingStatus(
        "Hindi pa naka-configure ang email service. I-set ang EmailJS credentials sa .env.local para makapagpadala ng booking."
      );
      return;
    }

    setIsSendingBooking(true);

    try {
      const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: emailJsServiceId,
          template_id: emailJsTemplateId,
          user_id: emailJsPublicKey,
          template_params: {
            to_email: bookingEmail,
            guest_name: formData.get("name"),
            name: formData.get("name"),
            guest_email: formData.get("email"),
            email: formData.get("email"),
            guest_phone: formData.get("phone"),
            phone: formData.get("phone"),
            room_type: formData.get("room"),
            room: formData.get("room"),
            check_in: checkIn,
            checkIn,
            check_out: checkOut,
            checkOut,
            adults: formData.get("adults"),
            children: formData.get("children") || "0",
            special_requests: formData.get("requests") || "None",
            requests: formData.get("requests") || "None",
          },
        }),
      });

      if (!response.ok) {
        const errorDetail = await response.text();
        throw new Error(errorDetail || `Email service returned ${response.status}.`);
      }

      setBookingStatus("Booking Confirmation sent.");
      form.reset();
    } catch (error) {
      setBookingStatus(
        `Hindi naipadala ang booking inquiry. ${error instanceof Error ? error.message : "Pakisubukan muli."}`
      );
    } finally {
      setIsSendingBooking(false);
    }
  };

  return (
    <div className="website">
      {/* NAVIGATION */}
      <header className="navbar">
        <a href="/#home" className="nav-logo" onClick={closeMenu}>
        <span>Elyu Coastline Hotel</span>
        </a>

        <button
          className="mobile-toggle"
          onClick={() => setMobileMenu(!mobileMenu)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        <nav className={mobileMenu ? "nav-links active" : "nav-links"}>
          <a href="/#home" onClick={closeMenu}>Home</a>
          <a href="/#about" onClick={closeMenu}>About</a>
          <a href="/?page=rooms" onClick={closeMenu}>Rooms</a>
          <a href="/?page=dining" onClick={closeMenu}>Dining</a>
          <a href="/#explore" onClick={closeMenu}>Explore</a>
          <a href="/#gallery" onClick={closeMenu}>Gallery</a>
          <a href="/#contact" onClick={closeMenu}>Contact</a>
          <a href="/#booking" className="nav-book" onClick={closeMenu}>
            Book Now
          </a>
        </nav>
      </header>

      {/* HOME */}
      <main>
        {page === "rooms" ? (
          <>
            <section className="page-header">
              <p className="eyebrow">YOUR COASTAL RETREAT</p>
              <h1>Rooms designed for relaxation</h1>
              <p>Choose a comfortable space that fits your stay, whether you're traveling solo, with a partner, family or friends.</p>
            </section>
            <section id="rooms" className="section rooms-section">
              <div className="rooms-grid">
                {rooms.map((room) => (
                  <article className="room-card" key={room.name}>
                    <div className="room-image">
                      <img src={room.image} alt={room.name} />
                      <span className="room-tag">COASTAL STAY</span>
                    </div>
                    <div className="room-body">
                      <p className="room-type">{room.type}</p>
                      <h3>{room.name}</h3>
                      <p>{room.description}</p>
                      <button className="text-btn" onClick={() => setActiveRoom(room)}>
                        View Room Details →
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </>
        ) : page === "dining" ? (
          <>
            <section className="page-header">
              <p className="eyebrow">COAST & CUP CAFÉ</p>
              <h1>Dining by the coast</h1>
              <p>Explore Filipino favorites, refreshing drinks, freshly prepared meals and local-inspired flavors.</p>
            </section>
            <section id="dining" className="section dining-section">
              <div className="menu-navigation">
                {menuCategories.map((category, index) => (
                  <a href={`#menu-${index}`} key={category.title}>{category.title}</a>
                ))}
              </div>
              <div className="menu-list">
                {menuCategories.map((category, categoryIndex) => (
                  <div className="menu-category" id={`menu-${categoryIndex}`} key={category.title}>
                    <div className="category-heading">
                      <div>
                        <span>MENU {String(categoryIndex + 1).padStart(2, "0")}</span>
                        <h3>{category.title}</h3>
                      </div>
                      <p>{category.subtitle}</p>
                    </div>
                    <div className="food-grid">
                      {[...category.items, ...additionalMenuItems[category.title]].map((item) => (
                        <article className="food-card" key={item.name}>
                          <div className="food-image">
                            <img src={item.image} alt={item.name} loading="lazy" />
                          </div>
                          <div className="food-info">
                            <div className="food-title">
                              <h4>{item.name}</h4>
                              <strong>{item.price}</strong>
                            </div>
                            <p>{item.description}</p>
                            <button className="small-btn" type="button">View Details</button>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
        <>
        <section id="home" className="hero">
          <div className="hero-overlay"></div>

          <div className="hero-content">
            <span className="eyebrow">WELCOME TO LA UNION</span>

            <h1>
              Your relaxing
              <br />
              <span>coastal stay</span>
            </h1>

            <p>
              Discover a warm Filipino welcome, beautiful beaches,
              local flavors and unforgettable moments at Elyu Coastline Hotel.
            </p>

            <div className="hero-buttons">
              <a href="/?page=rooms" className="primary-btn">
                Explore Rooms
              </a>
              <a href="#booking" className="secondary-btn">
                Book Your Stay
              </a>
            </div>
          </div>

          <div className="hero-wave">
            <svg viewBox="0 0 1440 160" preserveAspectRatio="none">
              <path
                d="M0,80 C240,160 420,0 720,80 C1020,160 1190,30 1440,90 L1440,160 L0,160 Z"
              />
            </svg>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="section about-section">
          <div className="section-heading">
            <span>ABOUT ELYU COASTLINE HOTEL</span>
            <h2>Stay by the sea. <em>Feel at home.</em></h2>
          </div>

          <div className="about-grid">
            <div className="about-image">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
                alt="Coastal hotel"
              />
              <div className="image-badge">
                <strong>ELYU</strong>
                <small>La Union</small>
              </div>
            </div>

            <div className="about-content">
              <p className="lead">
                Elyu Coastline Hotel is a proposed boutique hotel in
                San Juan, La Union, created for guests who want to experience
                the beaches, surf, local cuisine and culture of the province.
              </p>

              <p>
                Our hotel is designed for couples, families, groups of friends,
                surfers and business travelers looking for a clean,
                comfortable and hospitable place to stay near local attractions.
              </p>

              <p>
                We aim to create a unique coastal experience while encouraging
                responsible tourism and supporting local businesses.
              </p>

              <div className="mission-grid">
                <div>
                  <span>01</span>
                  <h3>Our Mission</h3>
                  <p>
                    To offer guest-friendly, safe and enjoyable lodging with
                    warm Filipino welcome, good service and responsible tourism.
                  </p>
                </div>

                <div>
                  <span>02</span>
                  <h3>Our Vision</h3>
                  <p>
                    To become a trusted boutique hotel in La Union offering
                    relaxing beachfront experiences while promoting local
                    culture and community.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="values-section">
            <div className="mini-heading">
              <span>WHAT WE BELIEVE IN</span>
              <h3>Our Core Values</h3>
            </div>

            <div className="values-grid">
              {values.map((value, index) => (
                <div className="value-card" key={value.title}>
                  <div className="value-number">0{index + 1}</div>
                  <h4>{value.title}</h4>
                  <p>{value.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPLORE */}
        <section id="explore" className="section explore-section">
          <div className="section-heading centered">
            <span>EXPERIENCE LA UNION</span>
            <h2>Explore beyond <em>the hotel</em></h2>
            <p>
              Discover the beaches, nature, culture and attractions around
              La Union.
            </p>
          </div>

          <div className="attractions-grid">
            {attractions.map((place) => (
              <article className="attraction-card" key={place.name}>
                <div className="attraction-image">
                  <img src={place.image} alt={place.name} />
                </div>

                <div className="attraction-content">
                  <span>{place.location}</span>
                  <h3>{place.name}</h3>
                  <p>{place.description}</p>
                  <a href="#contact">Ask About This Place →</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* GALLERY */}
        <section id="gallery" className="section gallery-section">
          <div className="section-heading centered">
            <span>PHOTO JOURNAL</span>
            <h2>Moments by <em>the coast</em></h2>
          </div>

          <div className="gallery-grid">
            <div className="gallery-item large">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
                alt="La Union beach"
              />
            </div>

            <div className="gallery-item">
              <img
                src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=80"
                alt="Hotel room"
              />
            </div>

            <div className="gallery-item">
              <img
                src="https://i.pinimg.com/736x/15/26/cf/1526cfacf95f21ddc04e650a4eeec575.jpg"
                alt="Frutti di Mare seafood pasta"
              />
            </div>

            <div className="gallery-item">
              <img
                src="https://i.pinimg.com/736x/02/d9/93/02d993eaefc52f4fbcaf648ac53fb46c.jpg"
                alt="Sautéed seasonal vegetables"
              />
            </div>

            <div className="gallery-item large">
              <img
                src="https://i.pinimg.com/736x/e0/a2/6d/e0a26d3b0204be9459580735e100bb8c.jpg"
                alt="Tangadan Falls"
              />
            </div>
          </div>
        </section>

        {/* BOOKING */}
        <section id="booking" className="booking-section">
          <div className="booking-inner">
            <div className="booking-text">
              <span>PLAN YOUR STAY</span>
              <h2>Ready for your <em>coastal escape?</em></h2>
              <p>
                Send us an inquiry and let us help you plan a relaxing stay
                at Elyu Coastline Hotel.
              </p>

              <div className="contact-details">
                <p><strong>Location</strong> Urbiztondo, San Juan, La Union</p>
                <p><strong>Phone</strong> +63 956 417 5999</p>
              </div>
            </div>

            <form className="booking-form" onSubmit={sendBookingInquiry}>
              <div className="form-row">
                <label>
                  Full Name
                  <input name="name" type="text" required placeholder="Your full name" />
                </label>

                <label>
                  Email Address
                  <input name="email" type="email" required placeholder="you@email.com" />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Contact Number
                  <input
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    pattern="0[0-9]{10}"
                    minLength="11"
                    maxLength="11"
                    title="Maglagay ng eksaktong 11 digits na nagsisimula sa 0."
                    required
                    placeholder="09XXXXXXXXX"
                  />
                </label>

                <label>
                  Room Type
                  <select name="room" value={selectedRoomName} onChange={handleRoomChange} required>
                    <option value="">Select room</option>
                    {rooms.map((room) => (
                      <option key={room.name} value={room.name}>{room.name}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="form-row">
                <label>
                  Check-in Date
                  <input name="checkIn" type="date" required />
                </label>

                <label>
                  Check-out Date
                  <input name="checkOut" type="date" required />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Number of Adults
                  <input
                    name="adults"
                    type="number"
                    min="1"
                    max={guestLimit ? guestLimit - childCount : undefined}
                    value={adultCount}
                    onChange={handleAdultCountChange}
                    required
                  />
                </label>

                <label>
                  Number of Children
                  <input
                    name="children"
                    type="number"
                    min="0"
                    max={guestLimit ? guestLimit - adultCount : undefined}
                    value={childCount}
                    onChange={handleChildCountChange}
                  />
                </label>
              </div>

              <label>
                Special Requests
                <textarea
                  name="requests"
                  rows="4"
                  placeholder="Tell us anything we should know about your stay..."
                ></textarea>
              </label>

              <button type="submit" className="submit-btn" disabled={isSendingBooking}>
                {isSendingBooking ? "Sending..." : "Send Booking Inquiry →"}
              </button>

              {bookingStatus && (
                <p
                  className={`booking-status${bookingStatus.startsWith("Hindi") || bookingStatus.startsWith("Mali") ? " error" : ""}`}
                  role={bookingStatus.startsWith("Hindi") || bookingStatus.startsWith("Mali") ? "alert" : "status"}
                >
                  {bookingStatus}
                </p>
              )}

              <small>
                A hotel representative will confirm availability, rates and
                booking terms before a reservation is finalized.
              </small>
            </form>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact-section">
          <div>
            <h3 className="contact-brand">Elyu Coastline Hotel</h3>
            <p>
              Your relaxing coastal stay in La Union.
            </p>
          </div>

          <div className="contact-column">
            <h4>CONTACT</h4>
            <p>Urbiztondo, San Juan, La Union</p>
            <p>+63 956 417 5999</p>
          </div>

          <div className="contact-column">
            <h4>FOLLOW US</h4>
            <p>Facebook: @ElyuCoastlineHotel</p>
            <p>Instagram: @elyucoastlinehotel</p>
          </div>
        </section>
        </>
        )}
      </main>

      <footer>
        <p>© 2026 Elyu Coastline Hotel. All rights reserved.</p>
        <p>La Union, Philippines</p>
      </footer>

      {/* ROOM MODAL */}
      {activeRoom && (
        <div
          className="modal-backdrop"
          onClick={() => setActiveRoom(null)}
        >
          <div
            className="room-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setActiveRoom(null)}
            >
              ×
            </button>

            <img src={activeRoom.image} alt={activeRoom.name} />

            <div className="modal-content">
              <span>{activeRoom.type}</span>
              <h2>{activeRoom.name}</h2>
              <p>{activeRoom.description}</p>

              <h4>Room Amenities</h4>

              <ul>
                {activeRoom.amenities.map((amenity) => (
                  <li key={amenity}>{amenity}</li>
                ))}
              </ul>

              <a
                href="/#booking"
                className="primary-btn"
                onClick={() => setActiveRoom(null)}
              >
                Inquire About This Room
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;