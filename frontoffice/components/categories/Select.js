export default function Select({
  categoryName,
  category,
  changeCategoryHandler
}) {
  const categoryChange = (itemName) => {
    changeCategoryHandler(itemName);
  };

  return (
    <div>
      <h4>{categoryName}</h4>
      <select
        className="block w-full bg-white border border-coolGray-100 hover:border-coolGray-100 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:shadow-outline"
        defaultValue=""
        onChange={(e) => {
          categoryChange(e.target.value);
        }}
      >
        {category.map((item, index) => {
          return (
            <option key={index} value={item.name}>
              {item.name}
            </option>
          );
        })}
        <option value="">Tout</option>
      </select>
    </div>
  );
}
