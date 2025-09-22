export type IUserType = {
  id: string;
  image: string;
  username: string;
  password: string;
  role: "customer" | "merchant";
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
};

export const user: IUserType[] = [
  {
    id: "u001",
    image: "https://i.imgur.com/rcFckQN.png",
    username: "sunny",
    password: "1234",
    role: "customer",
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
    role: "merchant",
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
