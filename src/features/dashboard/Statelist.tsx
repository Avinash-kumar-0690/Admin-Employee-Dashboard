
import { transformDashboardData } from "./dahsboard.api";
import type { getTransformDataType, UserType } from "./dashboard.types";
import StateCard from "./StateCard"



export interface StateListType {
  data?: getTransformDataType | undefined;
  user?: UserType | undefined;
}

const Statelist = ({ data, user }: StateListType) => {
  console.log(data, user)
  const cards = transformDashboardData({ data, user });
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
