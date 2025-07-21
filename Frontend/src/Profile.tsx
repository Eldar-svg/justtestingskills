import { useParams } from "react-router-dom";
 import { NavLink } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import Root from "./Root";
interface User {
  id?: string;
  username?:string;
  country?: string;
  age: string;
  gender: string;
  password: string | number;
}

function Profile(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  

  const {
    data: personalUser,
    isLoading,
    isError,
    error,
  } = useQuery<User, Error>({
    queryKey: ["register", id],
    queryFn: async () => {
      
      const { data } = await axios.get<User>(`http://localhost:5000/register/${id}`);
      return data;
    },
    enabled: !!id,  // only fetch when id is available
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
const {username,country}=personalUser
  return (
    <><Root/>
    <div className="flex flex-col max-w-[500px] bg-blue-500 h-screen items-center  mx-auto space-y-[10px]">
      
      <h1>Profile Page</h1>
       <p>username:{personalUser?.username}</p>
      <p>Country: {personalUser?.country}</p>
      <p>Age: {personalUser?.age}</p>
      <p>Gender: {personalUser?.gender}</p>
<NavLink to={`/profile/edit/${id}`}> <button className="">edit</button></NavLink>
     
    </div></>
  );
}

export default Profile;
