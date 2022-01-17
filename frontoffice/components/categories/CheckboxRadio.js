export default function CheckboxRadio({
  type,
  value,
  description,
  name,
  checked,
  changeCategoryHandler
}) {
  const priceChange = () => {
    changeCategoryHandler(value);
  };

  return (
    <li className="flex-grow text-left pr-2">
      <label className="inline-flex items-center">
        {type === "checkbox" ? (
          <input
            type={type}
            name={name}
            value={value}
            checked={checked}
            onChange={() => priceChange()}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            defaultChecked={checked}
          />
        )}
        <span className="ml-2">{description || value}</span>
      </label>
    </li>
  );
}
