import { useEffect, useState } from "react";
import TextInput from "./text-input";
import { Location } from "@/types/location-type";
import Toggle from "./toggle";

type LocationProps = {
  id: string;
  label: string;
  displayStreet?: boolean;
  displayRemote?: boolean;
  onChange: any;
  value: Location;
  index?: number;
};

export default function LocationInput({
  label,
  displayStreet,
  displayRemote,
  onChange,
  value,
  index,
}: LocationProps) {
  const [location, setLocation] = useState<Location>(value);

  useEffect(() => {
    if (location.city || location.country || location.remote) {
      if (index) {
        onChange("location", location, index);
      } else {
        onChange({ location: location });
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
        {label}{" "}
        {displayRemote && (
          <Toggle
            label="Remote"
            value={location.remote}
            onChange={handleToggleRemote}
          />
        )}
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
            value={location.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />
          <TextInput
            id="country"
            label="Country"
            disabled={location.remote}
            value={location.country}
            onChange={(e) => handleChange("country", e.target.value)}
          />
        </div>

        {displayStreet && (
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
              value={location.number}
              disabled={location.remote}
              onChange={(e) => handleChange("number", e.target.value)}
            />
            <TextInput
              className="col-span-4"
              id="street"
              label="Street"
              value={location.street}
              disabled={location.remote}
              onChange={(e) => handleChange("street", e.target.value)}
            />
            <TextInput
              className="col-span-2"
              id="postcalCode"
              label="Postal Code"
              value={location.postalCode}
              disabled={location.remote}
              onChange={(e) => handleChange("postalCode", e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
