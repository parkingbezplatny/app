type TUserDatabase = {
  email: string;
  username: string;
  id: number;
  isAdmin: boolean;
  favoriteParkings: ({
    parking: {
      id: number;
      lat: number;
      lng: number;
      place: string;
    };
  } & {
    id: number;
    userId: number;
    parkingId: number;
  })[];
};

type TUsersDatabase = {
  id: number;
  email: string;
  username: string;
  isAdmin: boolean;
  favoriteParkings: ({
    parking: {
      id: number;
      lat: number;
      lng: number;
      place: string;
    };
  } & {
    id: number;
    userId: number;
    parkingId: number;
  })[];
}[];
