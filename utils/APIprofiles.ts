import customAxios from "./AxiosCall";


export const getProfile = async () => {
   
  try {
    const response = await customAxios.get(`/users/get_profile`);
  
    return response.data; // Return the list of gigs
  } catch (error) {
    console.error('Error fetching gigs:', error);
    throw error; // Re-throw the error for further handling in the calling function
  }
  };