import React, { useRef, useEffect } from "react";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.css";

export default function Datepicker() {
  const datepickerRef = useRef<HTMLInputElement>(null);

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

  return <input ref={datepickerRef} type="text" className="datepicker" />;
}
