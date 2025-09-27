export type IUserType = {
  id: string;
  image: string;
  username: string;
  password: string;
  name: string;
  role: "Customer" | "Merchant";
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  token?: string;
};

export const users: IUserType[] = [
  {
    id: "u001",
    image: "https://i.imgur.com/rcFckQN.png",
    username: "sunny",
    password: "1234",
    name: "Chaichirat",
    role: "Customer",
    phone: "(+66) 91 234 5678",
    address: {
      street: "123 ถนนสุขุมวิท",
      city: "กรุงเทพฯ",
      state: "กรุงเทพมหานคร",
      postalCode: "10110",
      country: "Thailand",
    },
  },
  {
    id: "m001",
    image:
      "https://storeitni.com/wp-content/uploads/2022/08/cropped-store-it-logo-LARGE.png",
    username: "owner",
    password: "5678",
    name: "Sunzada IT Store",
    role: "Merchant",
    phone: "(+66) 98 765 4321",
    address: {
      street: "99 ถนนพระราม 9",
      city: "กรุงเทพฯ",
      state: "กรุงเทพมหานคร",
      postalCode: "10310",
      country: "Thailand",
    },
  },
];
