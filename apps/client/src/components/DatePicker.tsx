import { useRef, useEffect } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";

interface Props {
  name: string,
  handleChange: React.ChangeEventHandler<HTMLInputElement>
}

export default function Datepicker({ name, handleChange }: Props) {
  const datepickerRef = useRef<HTMLInputElement>(null);
  console.log(name)
  // const handleChange = () => {

  //   console.log('here')
  // }
  useEffect(() => {
    if (datepickerRef.current) {
      const today = new Date();
      const maximumDate = new Date(today.setDate(today.getDate() + 30));

      flatpickr(datepickerRef.current, {
        enableTime: true,
        minDate: "today",
        maxDate: maximumDate,
        mode: "multiple",
        minuteIncrement: 5,
      });
    }
  }, []);

  return <div>
    <input ref={datepickerRef} name={name} onChange={handleChange} type="text" className="datepicker block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400" />;
  </div>
}
