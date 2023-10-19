export type TUserDatabase = {
  email: string;
  id: number;
  username: string;
  isGoogle: boolean;
  isAdmin: boolean;
  favoriteParkings: {
    parking: {
      id: number;
      lat: number;
      lng: number;
      place: string;
    };
  }[];
};

export type TUsersDatabase = {
  email: string;
  id: number;
  username: string;
  isGoogle: boolean;
  isAdmin: boolean;
  favoriteParkings: {
    parking: {
      id: number;
      lat: number;
      lng: number;
      place: string;
    };
  }[];
}[];

export type TParkingDatabase = {
  userRatings: {
    rating: number;
  }[];
} & {
  id: number;
  lat: number;
  lng: number;
  place: string;
};

export type TParkingsDatabase = ({
  userRatings: {
    rating: number;
  }[];
} & {
  id: number;
  lat: number;
  lng: number;
  place: string;
})[];
