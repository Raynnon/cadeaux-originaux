import {
  Box,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Checkbox
} from "@mui/material";

interface Category {
  _id: string;
  parent: string[];
  name: string;
  imagesFolder: string;
  __v: number;
}

interface CategoryCheckBoxProps {
  cat: Category[];
  name: string;
}

export default function CategoryCheckBox(props: CategoryCheckBoxProps) {
  const cat: Category[] = props.cat;
  const name: string = props.name;

  return (
    <Box sx={{ marginTop: "30px" }}>
      <FormLabel component="legend">{name}</FormLabel>

      <RadioGroup row aria-label="type" name="row-radio-buttons-group">
        {cat.map((item, index) => {
          return (
            <Box key={index}>
              <FormControlLabel
                value={item.name}
                control={<Checkbox color="info" />}
                label={item.name}
              />
            </Box>
          );
        })}
      </RadioGroup>
    </Box>
  );
}
