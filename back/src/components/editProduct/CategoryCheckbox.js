import {
  Box,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Checkbox
} from "@mui/material";

export default function CategoryCheckBox({
  selectedItem,
  cat,
  name,
  handleCategoryChange
}) {
  const handleUpdateCategories = (category) => {
    if (selectedItem.includes(category)) {
      handleCategoryChange(
        [...selectedItem].filter((item) => item !== category)
      );
    } else {
      handleCategoryChange([...selectedItem, category]);
    }
  };

  return (
    <Box sx={{ marginTop: "30px" }}>
      <FormLabel component="legend">{name}</FormLabel>

      <RadioGroup row aria-label="type" name="row-radio-buttons-group">
        {cat
          ? cat.map((item, index) => {
              return (
                <Box key={index}>
                  <FormControlLabel
                    value={item.name}
                    control={
                      <Checkbox
                        color="info"
                        checked={
                          selectedItem
                            ? selectedItem.includes(item.name)
                            : false
                        }
                        onClick={(e) => {
                          handleUpdateCategories(e.target.value);
                        }}
                      />
                    }
                    label={item.name}
                  />
                </Box>
              );
            })
          : null}
      </RadioGroup>
    </Box>
  );
}
