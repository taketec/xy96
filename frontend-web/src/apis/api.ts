import axios from 'axios';
import { AspectRatioOption } from '../components/FooocusWindow';
import { QualityOption } from '../components/FooocusWindow';
export const API = (token:string|null) =>
    axios.create({
      baseURL: 'http://localhost:8000',
      headers: { Authorization: token },
    });




export const get_credits = async () => {
  try {
    const token = localStorage.getItem('userToken');

    const res  = await API(token).get<{credits: string}>(`/get-credits`);
    return res.data.credits;
  } catch (error) {
    console.log('error in orders api');
  }
};


export const create_fooocus_prediction = async (data:{prompt:string ,aspectRatio:AspectRatioOption, quality :QualityOption} ) => {
  try {
    const token = localStorage.getItem('userToken');

    const res  = await API(token).post<{prediction_id:string}>(`/fooocus/create`,{
      prompt: data.prompt,
      aspect_ratios_selection: data.aspectRatio,
      performance_selection: data.quality
    },
    {
      headers: { Authorization: token }
    }
  );
    return res;
  } catch (error) {
    console.log('error in fooocus prediction creation api');
  }
};
export const create_zoedepth_prediction = async (data:{url:string} ) => {
  try {
    const token = localStorage.getItem('userToken');

    const res  = await API(token).post<{prediction_id:string}>(`/zoedepth/create`,{
      image:data.url
    },
    {
      headers: { Authorization: token }
    }
  );
    return res;
  } catch (error) {
    console.log('error in zoedepth prediction creation api');
  }
};


export const create_triposr_prediction = async (data:{url:string} ) => {
  try {
    const token = localStorage.getItem('userToken');

    const res  = await API(token).post<{prediction_id:string}>(`/triposr/create`,{
      image:data.url
    },
    {
      headers: { Authorization: token }
    }
  );
    return res;
  } catch (error) {
    console.log('error in zoedepth prediction creation api');
  }
};





// get focus prediction
// get status
// all this for zoedepth and triposr
// cancel prediction
// api calls for more rzp orders.
// rzp implementation as follows- user makes the payment, if successful, they get the credits via polling for the latest update

type Tmodel = "fooocus"|"zoedepth"|"triposr"
export interface Istatus {
  id: string,
  status: "succeeded"|"processing"|"starting",
  type: "Fooocus"|'Zoedepth'|'TripoSR',
  output?: string
}

export const get_prediction_status = async (prediction_id:string,model:Tmodel) => {
  try {
    const token = localStorage.getItem('userToken');

    const res  = await API(token).post<Istatus>(`/${model}/status`, {
      headers: { Authorization: token },
      id:prediction_id
    });
    return res;
  } catch (error) {
    console.log('error in status api');
  }
};