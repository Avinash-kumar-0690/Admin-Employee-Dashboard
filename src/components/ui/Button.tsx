
interface Button {
    className:string;
    onClick?: () => void;
    name:string;
    label:string;
    key?:string;
}

const Button = ({className, onClick, name, label}:Button) => {
  return (
   <>
   <button className={`py-3 px-5 text-xl ${className}`}
   name={name}
   onClick={onClick}
   >
{label}
   </button>
   </>
  ) 
}

export default Button
