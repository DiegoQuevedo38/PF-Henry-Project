import axios from "axios";
import { Dispatch } from "redux";

import { ThunkAction } from "redux-thunk";
import {HotelAction, RESET, RoomAction, UserAction} from "./actions-types";
import { User } from "firebase/auth";
// import { ThunkAction } from "redux-thunk";
// import {HotelAction, POST_REVIEW, RESET, RoomAction} from "./actions-types";

// VAMOS A TRAER A LAS HABITACIONES YIEPEEEEEEEEEEEEE

export interface Action {
  type: string;
  payload: any;
}

export const createUser = (userData: any) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const response = await axios.post("http://localhost:3002/users", userData)
      dispatch({
        type: "POST_USER",
        payload: response.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const disableRoom = (id: string) => {
  return async (dispatch: Dispatch<Action>) =>{
    try{
      const {data} = await axios.patch(`http://localhost:3002/admin/rooms/${id}`)
      dispatch({
        type: "DISABLE_ROOMS_BY_ID",
        payload: data,
      });
    } catch (error) {
      console.log("Error al borrar logicamente", error)
    }
  }
}

export const getDisabledRooms = () => {
  return async (dispatch: Dispatch<Action>) => {
    try{
      const {data } = await axios.get("http://localhost:3002/admin/rooms/");
      dispatch ({
        type: "GET_DISABLED_ROOMS",
        payload: data
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const getRooms = () => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get("http://localhost:3002/rooms/");
      dispatch({
        type: "GET_ROOMS",
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener habitaciones:", error);
    }
  };
};

export const getRoomById = (id: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get(`http://localhost:3002/rooms/${id}`);
      dispatch({
        type: "GET_ROOMS_BY_ID",
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener habitacion por ID:", error);
    }
  };
};

// export const getRoomByName = (address: string) => {
//   return async (dispatch: Dispatch<Action>) => {
//     try {
//       const { data } = await axios.get(
//         `http://localhost:3002/rooms/?address=${address}`
//       );
//       dispatch({
//         type: "GET_ROOMS_BY_NAME",
//         payload: data,
//       });
//     } catch (error) {
//       console.error("Error al obtener habitacion por nombre:", error);
//     }
//   };
// };

export const getFilteredRooms = (filters: any) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    try {
      const { data } = await axios.get("http://localhost:3002/rooms/", {
        params: filters,
      });
      dispatch({
        type: "GET_FILTERED_ROOMS",
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener habitaciones filtradas:", error);
    }
  };
};

export const postReview = (review: any) => {
  return async (dispatch: Dispatch<Action>): Promise<void> => {
    try {
      const res = await axios.post("http://localhost:3002/hotels/", review);
      dispatch({
        type: POST_REVIEW,
        payload: res.data,
      });
    } catch (error) {
      alert("An error occured at posting your review" + error);
    }
  };
};
///tipo alert solo recibe 1 parametro

export const resetFilters = () => ({
  type: RESET,
});

// Nueva acción para autenticar al usuario
export const authenticateUser = (user: User | null): Action => ({
  type: "AUTHENTICATE_USER",
  payload: user,
});

/* export const getHotels = () => {

  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get("http://localhost:3002/hotels/");
      dispatch({
        type: "GET_HOTELS",
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener hoteles:", error);
    }
  };
};

export const getHotelById = (id: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get(`http://localhost:3002/hotels/${id}`);
      dispatch({
        type: "GET_HOTEL_BY_ID",
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener hotel por ID:", error);
    }
  };
};

export const getHotelByName = (address: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get(
        `http://localhost:3002/hotels/?address=${address}`
      );
      dispatch({
        type: "GET_HOTEL_BY_NAME",
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener hotel por nombre:", error);
    }
  };
};

export const getFilteredHotels = (filters: any) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const { data } = await axios.get("http://localhost:3002/hotels/filtered/", {
        params: filters,
      });
      dispatch({
        type: "GET_FILTERED_HOTELS",
        payload: data,
      });
    } catch (error) {
      console.error("Error al obtener hoteles filtrados:", error);
    }
  };

};

export const postReview = (review: any) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      const res = await axios.post("http://localhost:3002/hotels/", review);
      dispatch({
        type: POST_REVIEW,
        payload: res.data,
      });
    } catch (error) {
      alert("An error occured at posting your review", error);
    }
  };
};

export const resetFilters = () => ({
  type: RESET,
});

};*/
