import { Controller } from "react-hook-form";
import { Input } from "@nextui-org/react";

export function SingleInput({ control, name, type, error }) {
  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  return (
    <Controller
      name={name}  //Unique name of your input
      control={control} //	control object is from invoking useForm
      defaultValue = {''} //This solved my warning "A component changed from uncontrolled to controlled"
      rules={{
        required: {
          value: true,
          message: "This field is required.",
        },
      }} //required, min, max, minLength, maxLength, pattern, validate
      render={({ field: { onChange, value, name } }) => (
        <Input
          label={capitalizeFirstLetter(name)} //Input's name being registered.
          value={value} //	The current value of the controlled component.
          onChange={onChange} //A function which sends the input's value to the library.
          isInvalid={!!error}
          color={error ? "danger" : "default"}
          errorMessage={error && error.message}
          type={type}
          isClearable
          variant="bordered"
          placeholder={`Enter your ${name}`}
          onClear={() => console.log("input cleared")}
          className="max-w-xs text-white"
        />
      )}
    />
  );
}
