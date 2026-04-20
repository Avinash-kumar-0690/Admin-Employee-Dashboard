
import { transformDashboardData } from "./dahsboard.api";
import StateCard from "./StateCard"

const Statelist = ({data, user}) => {

    const cards = transformDashboardData(data, user);
  return (
  
<>
<div className="grid grid-cols-4 w-full mx-auto gap-5  p-2"> 
{cards?.map((item, index) => (
  <StateCard key={index} state={item} />
))}
</div>
</>
  )
}

export default Statelist
