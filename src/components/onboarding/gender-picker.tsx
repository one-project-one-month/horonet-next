import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { genderEnum } from "@/database/enums";

type GenderPickerProps = {
  value: string;
  onChange: (value: string) => void;
};

const GenderPicker = ({ value, onChange }: GenderPickerProps) => {
  return (
    <Select value={value} onValueChange={onChange} defaultValue={"USD"}>
      <SelectTrigger
        className={
          "w-full capitalize bg-white/10 border-white/20 text-white placeholder-white/50 hover:bg-white/20 hover:text-white/80"
        }
      >
        <SelectValue
          placeholder="Select Gender"
          className={"capitalize text-white/80"}
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select your gender!</SelectLabel>
          {genderEnum.enumValues.map(gender => (
            <SelectItem value={gender} key={gender} className={"capitalize"}>
              {gender.toLowerCase()}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default GenderPicker;
