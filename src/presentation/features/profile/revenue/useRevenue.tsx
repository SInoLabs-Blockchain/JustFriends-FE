import { useState, useEffect } from "react";

const TIME_UNITS = [
  { id: 0, value: "D" },
  { id: 1, value: "W" },
  { id: 2, value: "M" },
  { id: 3, value: "Y" },
];

const useRevenue = () => {
  const [timeUnit, setTimeUnit] = useState(TIME_UNITS[0]);

  const onChangeTimeUnit = (data: any) => {
    setTimeUnit(data);
  };

  return {
    TIME_UNITS,
    timeUnit,
    onChangeTimeUnit,
  };
};

export default useRevenue;
