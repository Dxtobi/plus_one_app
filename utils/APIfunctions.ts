import customAxios from "./AxiosCall";


export const createGig = async (
    title: string,
    displayname:string,
    description: string,
    platform: string,
    duration: string,
    url: string
  ) => {
    try {
      const response = await customAxios.post('/gigs', {
        title,
        displayname,
        description,
        platform,
        duration,
        url,
      });
  
      return response.data; // Return the created gig data
    } catch (error) {
      console.error('Error creating gig:', error);
      throw error; // Re-throw the error for further handling in the calling function
    }
  };

export const getGigsFromDate = async (fromDate: string) => {
    console.log('called with:', fromDate)
  try {
    const response = await customAxios.get(`/gigs?from=${fromDate}`, {
      params: {
        fromDate
      }
    });

    return response.data; // Return the list of gigs
  } catch (error) {
    console.error('Error fetching gigs:', error);
    throw error; // Re-throw the error for further handling in the calling function
  }
};

export const completeGig = async (gig_id: any) => {
  console.log('called completeGig with:', gig_id)
try {
  const response = await customAxios.put(`/gigs/${gig_id}/complete`,{});

  return response.data; // Return the list of gigs
} catch (error) {
  console.error('Error fetching gigs:', error);
  throw error; // Re-throw the error for further handling in the calling function
}
};

