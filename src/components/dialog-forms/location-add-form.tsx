import { GetCitiesInfo, GetCountryCityInfo } from "components/utils";
import React, { useRef, useState } from "react";
import Select from "react-select";

export interface LocationData {
  zipCode?: string;
  street?: string;
  city?: string;
  isoCode?: string;
}

export interface LocationAddFormProps {
  formID: string;
  onSubmit: (values: LocationData) => void;
}

export const LocationAddForm = ({ formID, onSubmit }: LocationAddFormProps) => {
  const [isoCode, setIsoCode] = useState<string>();
  const streetRef = useRef<HTMLInputElement | null>(null);
  const zipRef = useRef<HTMLInputElement | null>(null);
  const cityRef = useRef<HTMLSelectElement | null>(null);

  const { countries } = GetCountryCityInfo();
  const { cities } = GetCitiesInfo({ isoCode });

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: Partial<LocationData> = {
      zipCode: zipRef.current?.value,
      street: streetRef.current?.value,
      city: cityRef.current?.value,
      isoCode: isoCode,
    };
    onSubmit(formData);
  };

  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
      <form onSubmit={submitForm} id={formID}>
        <div className="form-group mb-6">
          <Select
            className="form-select appearance-none block w-full text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            aria-label="Default select example"
            isSearchable={true}
            onChange={(value: any) => setIsoCode(value.isoCode)}
            options={countries}
            isClearable={true}
            required={true}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group mb-6">
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="street-info"
              aria-describedby="streetInfo"
              placeholder="Street"
              ref={streetRef}
            />
          </div>
          <div className="form-group mb-6">
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="zip-code"
              aria-describedby="zipCodeInfo"
              placeholder="Zip code"
              ref={zipRef}
            />
          </div>
        </div>
        <div className="form-group mb-6">
          <select
            className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            aria-label="Default select example"
            disabled={cities?.length === 0 || cities === undefined}
            ref={cityRef}
            required={true}
          >
            {cities?.map((item, index) => {
              return (
                <option key={index} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
      </form>
    </div>
  );
};
