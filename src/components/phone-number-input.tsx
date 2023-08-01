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
    <label className="flex flex-col gap-2 w-full">
      {props.label}
      <div className="flex flex-row gap-4 items-end ">
        <TextInput
          className="col-span-1 w-[30%]"
          id="countryCode"
          label="Country Code"
          value={props.value.countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
        />
        <TextInput
          className="col-span-3 w-[70%]"
          id="number"
          label="Number"
          value={props.value.number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </div>
    </label>
  );
}
