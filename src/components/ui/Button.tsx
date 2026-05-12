import type {ReactNode} from "react"
interface Button {
    className:string;
    onClick?: () => void;
    name:string;
    label:ReactNode;
    key?:string;
    disabled?:boolean;
}

const Button = ({className, onClick, name, label, disabled}:Button) => {
  return (
   <>
   <button className={`py-3 px-5 text-xl ${className}`}
   name={name}
   onClick={onClick}
   disabled={disabled}
   >
{label}
   </button>
   </>
  ) 
}

export default Button
