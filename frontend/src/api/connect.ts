import axios from "axios";

/*
 * non-empty data response means created a new connection request in backend
 * empty data response means a connection is already pending
 */
export const requestConnection = async (
  requestorId: number,
  userId: number
) => {
  try {
    const data = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/profile/connect/${requestorId}/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem(
            process.env.REACT_APP_TOKEN!
          )}`,
        },
      }
    );

    return data;
  } catch (err: any) {
    throw err;
  }
};
