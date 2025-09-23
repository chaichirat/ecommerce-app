export type IProductType = {
  id: number;
  image?: string;
  title?: string;
  price?: number;
  stock?: number;
  description?: string;
  amount?: number;
};

export const products: IProductType[] = [
  {
    id: 1,
    image:
      "https://cdn-dynmedia-1.microsoft.com/is/image/microsoftcorp/laptop-13-ocean-render-compare-fy25?scl=1",
    title:
      "Meet the Surface Laptop - An ultralight AI touchscreen laptop | Microsoft Surface",
    price: 59000,
    stock: 5,
    description:
      "A sleek and lightweight AI-powered laptop with a brilliant touchscreen display, optimized for performance and portability.",
  },
  {
    id: 2,
    image:
      "https://pim-cdn0.ofm.co.th/products/original/YB98792.jpg?v=20250910&x-image-process=image/format,webp/resize,m_fixed,w_400,h_400/quality,q_100/marker,u_plus/sharpen,50",
    title: "HONOR Magic7 Pro 5G (12/512GB) Blue",
    price: 33800,
    stock: 10,
    description:
      "Flagship smartphone featuring a 6.8'' AMOLED display, powerful Snapdragon processor, and advanced 5G connectivity.",
  },
  {
    id: 3,
    image:
      "https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2024/03/Product/samsung-galaxy-tab-s9-5g-11-tablet-product-view-graphite.jpg",
    title: 'Samsung Galaxy Tab S9 5G 11" Tablet',
    price: 32000,
    stock: 7,
    description:
      "Premium 11-inch AMOLED tablet with 5G support, S Pen integration, and immersive entertainment features.",
  },
  {
    id: 4,
    image:
      "https://mediam.dotlife.store/media/catalog/product/cache/3b7e899159f673788675d87d1d929a98/a/p/apple_watch_series_10_46mm_gps_jet_black_alu_sport_band_black_001_1.jpg?auto=webp&format=pjpg&width=2560&height=3200&fit=cover",
    title: "Apple Watch Series 10 Jet Black Aluminium",
    price: 15900,
    stock: 12,
    description:
      "Next-generation smartwatch with health tracking, GPS, and customizable watch faces in a sleek jet black design.",
  },
  {
    id: 5,
    image:
      "https://www.sony.co.uk/commerceapi/medias/13-English-WH-1000X-M6-Colour-Variant-2000x2000-Infographic-min.png?context=bWFzdGVyfHJvb3R8NTY0MDA2fGltYWdlL3BuZ3xhRFV5TDJoaVpTOHhNREEwTXpRek5qTTJOemt3TWk4eE0xOUZibWRzYVhOb1gxZElMVEV3TURCWUlFMDJYME52Ykc5MWNpQldZWEpwWVc1MFh6SXdNREI0TWpBd01GOUpibVp2WjNKaGNHaHBZeTF0YVc0dWNHNW58NDJjMGMzNjVmNDE3NDVhY2EwYTgwZmJhNzMyN2EzYWNjZmZmZjA0NzgzOTJmYmU5Y2I0YzdiOTY5NTc4YzgyMQ",
    title: "SONY WH-1000XM6",
    price: 15990,
    stock: 20,
    description:
      "Industry-leading noise cancelling headphones with Hi-Res Audio, adaptive sound control, and up to 40 hours of battery life.",
  },
  {
    id: 6,
    image:
      "https://www.keychron.co.th/cdn/shop/files/Lemokey-L4-QMK-Wireless-Custom-Mechanical-Keyboard-Full-Aluminum-Frame-Carbon-Black-Version-80-Percent-Layout-For-Windows-Mac-Linux-Keychron-Super-Red-Switch.jpg?v=1757073018&width=1214",
    title: "Lemokey L4 QMK Wireless Custom Gaming Keyboard",
    price: 7290,
    stock: 15,
    description:
      "Premium mechanical keyboard with QMK/VIA support, wireless connectivity, and customizable RGB lighting for gamers.",
  },
  {
    id: 7,
    image:
      "https://shwetacomputers.com/cdn/shop/files/mx-master-3s-mouse-top-view-graphite_14e06f9b-a1a3-4187-ab77-ac231784591a.webp?v=1740756437",
    title: "Wireless Mouse For Mac (Space Grey) MX Master 3",
    price: 3990,
    stock: 25,
    description:
      "Ergonomic wireless mouse designed for Mac with ultra-fast scrolling, customizable buttons, and long battery life.",
  },
  {
    id: 8,
    image:
      "https://www.lg.com/content/dam/channel/wcms/th/images/consumer-monitors/24gn600-b_atm_eath_th_c/gallery/Z-04.jpg",
    title: 'LG Monitor (23.8") 24GN600-B.ATM',
    price: 7190,
    stock: 6,
    description:
      "23.8-inch Full HD gaming monitor with 144Hz refresh rate, 1ms response time, and AMD FreeSync technology.",
  },
  {
    id: 9,
    image:
      "https://mercular.s3.ap-southeast-1.amazonaws.com/images/products/2023/06/Product/asus-rog-strix-g16-g614ji-n4089w-gaming-notebook-front-view.jpg",
    title: "ASUS ROG Strix G16 Gaming Laptop",
    price: 45900,
    stock: 8,
    description:
      "High-performance gaming laptop with Intel Core i7 processor, NVIDIA RTX graphics, and advanced cooling system.",
  },
  {
    id: 10,
    image: "https://f.nooncdn.com/p/v1662647998/N53348815A_1.jpg?width=800",
    title: "Apple AirPods Pro (2nd Generation)",
    price: 8990,
    stock: 30,
    description:
      "Wireless earbuds with active noise cancellation, adaptive transparency, and personalized spatial audio.",
  },
  {
    id: 11,
    image: "https://m.media-amazon.com/images/I/61KrMgcFTeL._AC_SL1500_.jpg",
    title: "Samsung Jet 90 Stick Vacuum Cleaner",
    price: 18900,
    stock: 12,
    description:
      "Powerful cordless vacuum with lightweight design, long-lasting battery, and multi-surface cleaning capability.",
  },
  {
    id: 12,
    image:
      "https://www.ec-mall.com/wp-content/uploads/2023/10/Meta-Quest-3-1.webp",
    title: "Meta Quest 3 VR Headset",
    price: 23900,
    stock: 9,
    description:
      "Next-gen virtual reality headset with improved optics, immersive 3D sound, and a vast library of VR games and apps.",
  },
];
