interface Input {
  type: string;
  name?: string;
  id?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  isFocused?:boolean;
}
const Input = ({ type, name, id, onChange, value, isFocused=false }: Input) => {
  return (
    
    <>
      <input
        type={type}
        className=" bg-transparent text-xl text-white placeholder:text-sm placeholder:text-white border-2 py-3 px-5 rounded-3xl border-emerald-600 "
        name={name}
        id={id}
        onChange={onChange}
        value={value}
        placeholder={`Enter your ${name}`}
        autoFocus={isFocused} 
        />
</>
  );
};

export default Input;
