import { useEffect, useState } from "react";
import TextInput from "./text-input";
import { Location } from "@/types/location-type";
import Toggle from "./toggle";

type LocationProps = {
  id: string;
  label: string;
  displayStreet?: boolean;
  onChange: any;
  index?: number;
};

export default function LocationInput(props: LocationProps) {
  const [location, setLocation] = useState<Location>({ remote: false });

  useEffect(() => {
    if ((location.city && location.country) || location.remote) {
      if (props.index) {
        props.onChange("location", location, props.index);
      } else {
        props.onChange({ location: location });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  function handleChange(key: keyof Location, value: string) {
    setLocation((prevLocation) => ({
      ...prevLocation,
      [key]: value,
    }));
  }

  function handleToggleRemote() {
    setLocation((prevLocation) => {
      return {
        ...prevLocation,
        remote: !prevLocation.remote,
      };
    });
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex flex-row justify-between">
        {props.label}{" "}
        <Toggle
          label="Remote"
          checked={location.remote}
          onChange={handleToggleRemote}
        />
      </div>
      <div
        className={
          "flex flex-col items-center justify-center w-full gap-4 transform-all duration-200"
        }
      >
        <div
          className={
            "flex flex-row gap-4 w-full transform-all duration-200 ease-in-out " +
            `${location.remote ? "opacity-50" : "opacity-100"}`
          }
        >
          <TextInput
            id="city"
            label="City"
            disabled={location.remote}
            onChange={(e) => handleChange("city", e.target.value)}
          />
          <TextInput
            id="country"
            label="Country"
            disabled={location.remote}
            onChange={(e) => handleChange("country", e.target.value)}
          />
        </div>

        {props.displayStreet && (
          <div
            className={
              "grid grid-cols-8 gap-4 transform-all duration-200 ease-in-out " +
              `${location.remote ? "opacity-50" : "opacity-100"}`
            }
          >
            <TextInput
              className="col-span-2"
              id="number"
              label="Number"
              disabled={location.remote}
            />
            <TextInput
              className="col-span-4"
              id="street"
              label="Street"
              disabled={location.remote}
            />
            <TextInput
              className="col-span-2"
              id="postcalCode"
              label="Postal Code"
              disabled={location.remote}
            />
          </div>
        )}
      </div>
    </div>
  );
}
