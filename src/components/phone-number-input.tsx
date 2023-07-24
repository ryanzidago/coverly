import { useEffect, useState } from "react";
import TextInput from "./text-input";

export default function PhoneNumberInput(props) {
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [number, setNumber] = useState<string | null>(null);

  useEffect(() => {
    if (countryCode && number) {
      props.onChange({
        [props.id]: { countryCode: countryCode, number: number },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryCode, number]);

  return (
    <label className="flex flex-col gap-4 w-full">
      {props.label}
      <div className="grid grid-cols-4 gap-2">
        <TextInput
          className="col-span-1"
          id="countryCode"
          label="Country Code"
          onChange={(e) => setCountryCode(e.target.value)}
        />
        <TextInput
          className="col-span-3"
          id="number"
          label="Number"
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
    </label>
  );
}
