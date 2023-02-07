import { City, Country, ICity, ICountry } from "country-state-city";
import { useEffect, useState } from "react";

export const GetCitiesInfo = ({ isoCode }: { isoCode: string | undefined }) => {
  const [cities, setCities] = useState<ICity[]>();
  useEffect(() => {
    if (isoCode) {
      setCities(City.getCitiesOfCountry(isoCode));
    } else {
      setCities(undefined);
    }
  }, [isoCode]);

  return { cities };
};

export const GetCountryCityInfo = () => {
  const countries: ICountry[] = Country.getAllCountries().map((iCountry) => ({
    label: iCountry.name,
    code: iCountry.isoCode,
    value: iCountry.name,
    ...iCountry,
  }));

  return { countries };
};
