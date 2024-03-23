import {RegisterFormData} from './pages/Register';
import {SignInFormData} from './pages/SignIn';
import {
  HotelType
} from "../../backend/src/shared/types";

export const register = async (formData:RegisterFormData) =>{
    const response = await fetch('http://localhost:7000/api/users/register', {
        method: 'POST',
        credentials:"include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    return response.json()  
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch("http://localhost:7000/api/my-hotels", {
    credentials: "include",
  });
  
  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }
  
  return response.json();
};


export const createMyHotel = async (hotelFormData: FormData) => {
 
  console.log("api client ın içerisine girdim");
  for (const pair of hotelFormData.entries()) {
    console.log(pair[0], pair[1]);
  }
  const response = await fetch("http://localhost:7000/api/my-hotels", {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });
  
  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }
  
  return response.json();
};
  
export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`http://localhost:7000/api/my-hotels/${hotelId}` , {
    credentials: "include",
    headers:{
      'Accept-Encoding': 'gzip, deflate',
    }
  });
  
  if (!response.ok) {
    throw new Error("Error fetching Hotels");
  }
  
  return response.json();
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const response = await fetch(
    `http://localhost:7000/api/my-hotels/${hotelFormData.get("hotelId")}`,
    {
      method: "PUT",
      body: hotelFormData,
      credentials: "include",
    }
  );
  
  if (!response.ok) {
    throw new Error("Failed to update Hotel");
  }
  
  return response.json();
};




export const deleteMyHotelById = async (hotelFormData: FormData) => {
  console.log("DELETE APİSİNE GELDİ" );
  const response = await fetch(
    `http://localhost:7000/api/my-hotels/${hotelFormData.get("hotelId")}`,
    {
      method: "DELETE",
      body: hotelFormData,
      credentials: "include",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to delete Hotel");
  }
  
  return response.json();
};

export const validateToken = async () =>{   
   const response = await fetch('http://localhost:7000/api/auth/validateToken',{
     credentials:"include", 

   });   
   
   if(!response.ok) {   
    throw new Error("Token is invalid.");   
   }

   return response.json();
}

export const signIn = async (formData: SignInFormData) => {
    const response = await fetch("http://localhost:7000/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    const body = await response.json();
    if (!response.ok) {
      throw new Error(body.message);
    }
    return body;
  };

  export const signOut = async () => {
    const response = await fetch("http://localhost:7000/api/auth/logout", {
      credentials: "include",
      method: "POST",
    });
  
    if (!response.ok) {
      throw new Error("Error during sign out");
    }
  };
  