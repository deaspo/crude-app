import { GetCitiesInfo, GetCountryCityInfo } from "components/utils";
import { Country } from "country-state-city";
import { LocationProps } from "features";
import React, { useRef, useState } from "react";
import Select from "react-select";

export interface LocationAddFormProps {
  formID: string;
  onSubmit: (values: Partial<LocationProps>) => void;
}

export const LocationAddForm = ({ formID, onSubmit }: LocationAddFormProps) => {
  const [isoCode, setIsoCode] = useState<string>();
  const cityRef = useRef<HTMLSelectElement | null>(null);

  const { countries } = GetCountryCityInfo();
  const { cities } = GetCitiesInfo({ isoCode });

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData: Partial<LocationProps> = {
      city: cityRef.current?.value,
      stateCode: cities?.find(val => val.name === cityRef.current?.value)?.stateCode,
      isoCode: isoCode,
      country: isoCode ? Country.getCountryByCode(isoCode)?.name : "Unknown country"
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
