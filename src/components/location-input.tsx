import { useEffect, useState } from "react";
import TextInput from "./text-input";
import { Location } from "@/types/location-type";

type LocationProps = {
  id: string;
  label: string;
  displayStreet?: boolean;
  onChange: any;
  index?: number;
};

export default function LocationInput(props: LocationProps) {
  const [location, setLocation] = useState({} as Location);

  useEffect(() => {
    if (location.city && location.country) {
      console.log("LOCATION", location);

      if (props.index) {
        props.onChange("location", location, props.index);
      } else {
        props.onChange({ location: location });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <label className="flex flex-col gap-4 w-full">
      {props.label}
      <div className="flex flex-col items-center justify-center w-full gap-4">
        <div className="flex flex-row gap-4 w-full">
          <TextInput
            id="city"
            label="City"
            onChange={(e) =>
              setLocation((location) => ({ ...location, city: e.target.value }))
            }
          />
          <TextInput
            id="country"
            label="Country"
            onChange={(e) =>
              setLocation((location) => ({
                ...location,
                country: e.target.value,
              }))
            }
          />
        </div>

        {props.displayStreet && (
          <div className="grid grid-cols-8 gap-4">
            <TextInput className="col-span-2" id="number" label="Number" />
            <TextInput className="col-span-4" id="street" label="Street" />
            <TextInput
              className="col-span-2"
              id="postcalCode"
              label="Postal Code"
            />
          </div>
        )}
      </div>
    </label>
  );
}
