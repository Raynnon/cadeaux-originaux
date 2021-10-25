import Link from "next/link";
import { useState, useEffect } from "react";

export default function Filters({ categories }) {
  const [selectedSortBy, setSelectSortBy] = useState("Nouveau");
  const [selectedGenre, setSelectedGenre] = useState("Tout");
  const [selectedType, setSelectedType] = useState({});
  const [prices, setPrices] = useState({ "€": true, "€€": true, "€€€": true });
  const [selectedOccasion, setSelectedOccasion] = useState("Tout");
  const [selectedParty, setSelectedParty] = useState("Tout");
  return (
    <aside className="hidden md:block w-96 mb-5">
      <div className="lg:px-32">
        <h3 className="py-5 text-2xl font-semibold">Filtres</h3>
      </div>
      <form className="lg:pr-5 lg:pl-32 border-2 border-transparent border-t-coolGray-100 pt-4">
        <ul onChange={(e) => setSelectSortBy(e.target.value)}>
          <label htmlFor="sort">
            <h4>Classer par:</h4>
          </label>
          <select
            id="sorts"
            className="block w-full bg-white border border-gray-100 hover:border-gray-100 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => {
              setSelectSortBy(e.target.value);
            }}
          >
            <option selected>Nouveau</option>
            <option>Meilleures ventes</option>
          </select>
        </ul>
        <h4>Genre</h4>
        <ul onChange={(e) => setSelectedGenre(e.target.value)}>
          {categories.Genre.map((genre, index) => {
            return (
              <li key={index} className="flex-grow text-left pr-2">
                <label className="inline-flex items-center">
                  <input type="radio" name="genre" value={genre.name} />
                  <span className="ml-2">{genre.name}</span>
                </label>
              </li>
            );
          })}{" "}
          <li className="flex-grow text-left pr-2">
            <label className="inline-flex items-center">
              <input type="radio" name="genre" value="Tout" defaultChecked />
              <span className="ml-2">Tout</span>
            </label>
          </li>
        </ul>
        {selectedGenre !== "Animal" ? (
          <div>
            <h4>Type</h4>
            <ul
              onChange={(e) => {
                const updatedTypeStatus = {};
                updatedTypeStatus[e.target.value] =
                  !selectedType[e.target.value];

                setSelectedType({ ...selectedType, ...updatedTypeStatus });
              }}
            >
              {categories.Type.map((type, index) => {
                if (type.parent.includes(selectedGenre)) {
                  return (
                    <li key={index} className="flex-grow text-left pr-2">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="Type"
                          value={type.name}
                          defaultChecked
                        />
                        <span className="ml-2">{type.name}</span>
                      </label>
                    </li>
                  );
                } else if (selectedGenre === "Tout") {
                  return (
                    <li key={index} className="flex-grow text-left pr-2">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="Type"
                          value={type.name}
                          defaultChecked
                        />
                        <span className="ml-2">{type.name}</span>
                      </label>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        ) : null}

        <h4>Prix</h4>
        <ul
          onChange={(e) => {
            const updatedPricesStatus = {};
            updatedPricesStatus[e.target.value] = !prices[e.target.value];

            setPrices({ ...prices, ...updatedPricesStatus });
          }}
        >
          {Object.keys(prices).map((price, index) => {
            return (
              <li key={index} className="flex-grow text-left pr-2">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="prix"
                    value={price}
                    defaultChecked
                  />
                  <span className="ml-2">{price}</span>
                </label>
              </li>
            );
          })}
        </ul>

        <label htmlFor="occasion">
          <h4>Occasion</h4>
        </label>
        <select
          id="occasion"
          className="block w-full bg-white border border-gray-100 hover:border-gray-100 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => {
            setSelectedOccasion(e.target.value);
          }}
        >
          {categories.Occasion.map((occasion, index) => {
            return <option key={index}>{occasion.name}</option>;
          })}
          <option selected>Tout</option>
        </select>

        <label htmlFor="occasion">
          <h4>Fête</h4>
        </label>
        <select
          id="fetes"
          className="block w-full bg-white border border-gray-100 hover:border-gray-100 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
          onChange={(e) => {
            setSelectedParty(e.target.value);
          }}
        >
          {categories.Fête.map((party, index) => {
            return <option key={index}>{party.name}</option>;
          })}
          <option selected>Tout</option>
        </select>
      </form>
    </aside>
  );
}
