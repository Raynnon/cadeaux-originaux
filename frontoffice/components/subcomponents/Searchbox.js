import PropTypes from "prop-types";

/**
 * SearchBox Component
 * Currently disabled/inactive component for product search functionality
 * TODO: Implement search functionality in future version
 * @param {Array} menuItems - Menu items for search filters (unused)
 */
export default function SearchBox({ menuItems }) {
  // Component is currently inactive and returns empty container
  return <div className="hidden justify-center lg:flex"></div>;
}

// PropTypes validation
SearchBox.propTypes = {
  menuItems: PropTypes.array
};
