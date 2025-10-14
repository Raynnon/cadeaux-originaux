import CheckboxRadio from './CheckboxRadio';
import Select from './Select.js';
import { priceSymbols } from '../../data/prices';
import { FILTER_TITLES, SORT_OPTIONS } from '../../constants';
import PropTypes from 'prop-types';

/**
 * FiltersSidebar Component
 * Displays all filter options in the category page sidebar
 */
export default function FiltersSidebar({
  categoryName,
  currentCategory,
  categories,
  availableFilters,
  selectedSortBy,
  setSelectedSortBy,
  selectedGenre,
  setSelectedGenre,
  selectedType,
  setSelectedType,
  prices,
  setPrices,
  selectedOccasion,
  setSelectedOccasion,
  selectedParty,
  setSelectedParty,
  mobileFiltersActive
}) {
  return (
    <form
      className={`${
        mobileFiltersActive ? 'absolute' : 'hidden'
      } lg:static z-40 flex flex-col items-center w-full text-center lg:text-left lg-text lg:block xl:w-52 bg-coolGray-100 top-0 left-0 pt-5 h-full`}
    >
      {/* Sort By Filter (only for regular categories) */}
      {categoryName !== 'Nouveau' && categoryName !== 'Meilleurs cadeaux' && (
        <ul>
          <label htmlFor="sorts">
            <h4>{FILTER_TITLES.SORT_BY}</h4>
          </label>
          <select
            id="sorts"
            className="block w-full bg-white hover:border-coolGray-100 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setSelectedSortBy(e.target.value)}
            defaultValue={selectedSortBy}
          >
            <option value={SORT_OPTIONS.NEW}>{SORT_OPTIONS.NEW}</option>
            <option value={SORT_OPTIONS.BEST_SELLERS}>
              {SORT_OPTIONS.BEST_SELLERS}
            </option>
          </select>
        </ul>
      )}

      {/* Genre Filter */}
      {!currentCategory.parent.includes('Genre') &&
        availableFilters.genres.length > 1 && (
          <div>
            <h4>{FILTER_TITLES.GENRE}</h4>
            <ul onChange={(e) => setSelectedGenre(e.target.value)}>
              {categories.Genre.filter((genre) =>
                availableFilters.genres.includes(genre.name)
              ).map((genre, index) => (
                <CheckboxRadio
                  key={index}
                  type="radio"
                  value={genre.name}
                  name="genre"
                />
              ))}
              <CheckboxRadio
                type="radio"
                value=""
                description={FILTER_TITLES.ALL}
                name="genre"
                checked
              />
            </ul>
          </div>
        )}

      {/* Type Filter */}
      {!currentCategory.parent.includes('Type') &&
        selectedGenre !== 'Animal' &&
        availableFilters.types.length > 1 && (
          <div>
            <h4>{FILTER_TITLES.TYPE}</h4>
            <ul>
              {categories.Type.filter(
                (type) =>
                  (type.parent.includes(selectedGenre) || !selectedGenre) &&
                  availableFilters.types.includes(type.name)
              ).map((filteredType, index) => {
                return (
                  <CheckboxRadio
                    key={index}
                    type="checkbox"
                    value={filteredType.name}
                    name="Type"
                    changeCategoryHandler={(changedCategory) => {
                      if (selectedType.includes(changedCategory)) {
                        setSelectedType(
                          selectedType.filter((type) => type !== changedCategory)
                        );
                      } else {
                        setSelectedType([...selectedType, changedCategory]);
                      }
                    }}
                  />
                );
              })}
            </ul>
          </div>
        )}

      {/* Price Filter */}
      {availableFilters.prices.length > 1 && (
        <div>
          <h4>{FILTER_TITLES.PRICE}</h4>
          <ul>
            {priceSymbols
              .filter((price) => availableFilters.prices.includes(price))
              .map((price, index) => (
                <CheckboxRadio
                  key={index}
                  type="checkbox"
                  value={price}
                  name="prix"
                  checked={prices.includes(price)}
                  changeCategoryHandler={(changedPrice) => {
                    if (prices.includes(changedPrice)) {
                      setPrices(prices.filter((price) => price !== changedPrice));
                    } else {
                      setPrices([...prices, changedPrice]);
                    }
                  }}
                />
              ))}
          </ul>
        </div>
      )}

      {/* Occasion Filter */}
      {!selectedParty &&
        !currentCategory.parent.includes('Occasion') &&
        availableFilters.occasions.length > 1 && (
          <Select
            categoryName={FILTER_TITLES.OCCASION}
            category={categories.Occasion.filter((occasion) =>
              availableFilters.occasions.includes(occasion.name)
            )}
            changeCategoryHandler={(categoryName) => {
              setSelectedOccasion(categoryName);
            }}
          />
        )}

      {/* Party Filter */}
      {!selectedOccasion &&
        !currentCategory.parent.includes('Fête') &&
        availableFilters.parties.length > 1 && (
          <Select
            categoryName={FILTER_TITLES.PARTY}
            category={categories.Fête.filter((party) =>
              availableFilters.parties.includes(party.name)
            )}
            changeCategoryHandler={(categoryName) => {
              setSelectedParty(categoryName);
            }}
          />
        )}
    </form>
  );
}

// PropTypes validation
FiltersSidebar.propTypes = {
  categoryName: PropTypes.string.isRequired,
  currentCategory: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  availableFilters: PropTypes.object.isRequired,
  selectedSortBy: PropTypes.string.isRequired,
  setSelectedSortBy: PropTypes.func.isRequired,
  selectedGenre: PropTypes.string.isRequired,
  setSelectedGenre: PropTypes.func.isRequired,
  selectedType: PropTypes.array.isRequired,
  setSelectedType: PropTypes.func.isRequired,
  prices: PropTypes.array.isRequired,
  setPrices: PropTypes.func.isRequired,
  selectedOccasion: PropTypes.string.isRequired,
  setSelectedOccasion: PropTypes.func.isRequired,
  selectedParty: PropTypes.string.isRequired,
  setSelectedParty: PropTypes.func.isRequired,
  mobileFiltersActive: PropTypes.bool.isRequired
};
