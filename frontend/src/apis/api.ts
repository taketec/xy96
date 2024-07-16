import axios from 'axios';
export const API = (token:string|null) =>
    axios.create({
      baseURL: 'http://localhost:8000',
      headers: { Authorization: token },
    });


export const get_credits = async () => {
  try {
    const token = localStorage.getItem('userToken');

    const res:any  = await API(token).get(`/get-credits`);
    return res.data.credits;
  } catch (error) {
    console.log('error in orders api');
  }
};


export const start_fooocus_prediction = async (data:JSON ) => {
  try {
    const token = localStorage.getItem('userToken');

    const res  = await API(token).get(`/fooocus/create`, {
      headers: { Authorization: token },
      data: data
    });
    return res;
  } catch (error) {
    console.log('error in orders api');
  }
};
