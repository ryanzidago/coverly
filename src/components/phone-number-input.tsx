import { useEffect, useState } from "react";
import TextInput from "./text-input";
import { PhoneNumber } from "@/types/phone-number-type";

type PhoneNumberInputType = {
  value: PhoneNumber;
  onChange: any;
  label: string;
  id: string;
};

export default function PhoneNumberInput(props: PhoneNumberInputType) {
  const [countryCode, setCountryCode] = useState<string>("");
  const [number, setNumber] = useState<string>("");

  useEffect(() => {
    props.onChange({
      [props.id]: { countryCode: countryCode, number: number },
    });

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
          value={props.value.countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
        />
        <TextInput
          className="col-span-3"
          id="number"
          label="Number"
          value={props.value.number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
    </label>
  );
}
