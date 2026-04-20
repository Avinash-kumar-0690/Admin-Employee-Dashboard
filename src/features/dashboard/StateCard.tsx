import { FaUsers, FaClipboardList, FaClock, FaUmbrellaBeach } from "react-icons/fa";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

const iconMap = {
  employees: FaUsers,
  tasks: FaClipboardList,
  attendance: FaClock,
  leaves: FaUmbrellaBeach,
  requestLeave: FaUmbrellaBeach,
  addtasks:FaClipboardList,
};

const StateCard = ({ state }) => {
  if (!state) return null;

  const navigate = useNavigate();

  const { title, value, type, action } = state;
  const Icon = iconMap[type];

  if (!Icon) return null;

  const actionTypes = ["requestLeave", "addtasks"];

const isAction = actionTypes.includes(type);

  const handleStatAction = (path: string) => {
    navigate(path);
  };

  //  ACTION CARD (different layout for Request)
  if (isAction) {
    return (
      <div className="bg-[#253552] rounded-2xl shadow-lg p-4 flex items-center justify-between  text-white hover:scale-[1.05] transition-all">
        <Icon className="text-3xl mb-2" />
        <p className="font-semibold">{title}</p>

        <Button
        name={type}
          label="Request"
          onClick={() => handleStatAction(action)}
          className="mt-2 bg-white text-blue-600 px-4 py-1 rounded-lg"
        />
      </div>
    );
  }

  // 🔥 NORMAL STAT CARD
  return (
    <div className="bg-[#1e293b] rounded-2xl shadow-lg p-4 flex items-center justify-between hover:scale-[1.03] transition-all">
      
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-xl bg-[#334155] text-blue-400 text-xl">
          <Icon />
        </div>

        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <h2 className="text-lg font-semibold text-gray-200">{value}</h2>
        </div>
      </div>

      <Button
      name={type}
        label="View"
        onClick={() => handleStatAction(action)}
        className="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg"
      />
    </div>
  );
};

export default StateCard;