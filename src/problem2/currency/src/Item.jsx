import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

function Item({ value, setValue, data, children, label }) {
  const [openPopup, setOpenPopup] = useState(false);
  const handleSend = (value) => {
    setValue(value);
    setOpenPopup(false);
  };
  return (
    <div className="flex flex-col justify-start gap-3 relative">
      <label>{label}</label>
      <div className="w-max cursor-pointer" onClick={() => setOpenPopup((pre) => !pre)}>
        {value ? value : "Select"} 
        {!openPopup ? <FontAwesomeIcon icon={faChevronDown} className="w-4 h-4 ml-2"/> : <FontAwesomeIcon icon={faChevronUp} className="w-4 h-4 ml-2"/>}
      </div>
 
        {openPopup &&
             <div className="absolute top-[70px] flex flex-wrap gap-y-2.5 gap-x-2.5 bg-slate-100 w-[340px] p-2.5 rounded-lg">
          {data.map((item, index) => (
            <div
              key={index}
              value={item.currency}
              onClick={() => handleSend(item.currency)}
              className="cursor-pointer uppercase hover:bg-slate-400 px-2.5 py-1 rounded-lg w-max"
            >
              {item.currency}
            </div>
          ))}
          </div>}
      {children}
    </div>
  );
}

export default Item;
