import React, { ReactElement } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputProps,
  FormErrorMessage,
  FormHelperText,
  Textarea,
  TextareaProps,
  Checkbox,
  CheckboxProps,
  VisuallyHidden,
  FormControlProps,
  Flex,
} from "@chakra-ui/react";
import { Field, FieldProps } from "formik";
import Select, { Props as SelectProps } from "react-select";

type Props = {
  name: string;
  label?: React.ReactNode;
  inputProps?: InputProps | TextareaProps | CheckboxProps | SelectProps;
  formControlProps?: FormControlProps;
  helpText?: React.ReactNode;
  isRequired?: boolean;
  hideLabel?: boolean;
  hideError?: boolean;
  inputRef?: React.Ref<HTMLInputElement>;
  inputType?: "input" | "textarea" | "checkbox" | "react-select-multi";
};

interface ConditionalWrapperProps {
  condition: any;
  wrapper: (children: ReactElement) => ReactElement;
  children: ReactElement;
}

const ConditionalWrapper: React.FC<ConditionalWrapperProps> = ({
  condition,
  wrapper,
  children,
}) => (!!condition ? wrapper(children) : children);

export const FormikControl: React.FC<Props> = (props) => {
  const { inputType = "input" } = props;
  const label = props.label ? (
    <ConditionalWrapper
      condition={props.hideLabel}
      wrapper={(children) => <VisuallyHidden>{children}</VisuallyHidden>}
    >
      <FormLabel htmlFor={props.name}>{props.label}</FormLabel>
    </ConditionalWrapper>
  ) : null;
  return (
    <Field name={props.name}>
      {({ field, form }: FieldProps) => (
        <FormControl
          isInvalid={!!(form.errors[props.name] && form.touched[props.name])}
          isRequired={props.isRequired}
          {...props.formControlProps}
        >
          {props.label && inputType !== "checkbox" && label}
          {inputType === "input" ? (
            <Input
              {...field}
              id={props.name}
              {...(props.inputProps as InputProps)}
            />
          ) : inputType === "textarea" ? (
            <Textarea
              {...field}
              id={props.name}
              {...(props.inputProps as TextareaProps)}
            />
          ) : inputType === "checkbox" ? (
            <Flex gap={3} alignItems="center">
              <Checkbox
                {...field}
                id={props.name}
                {...(props.inputProps as CheckboxProps)}
                isChecked={field.value === true}
              />
              <FormLabel m={0} htmlFor={props.name}>{props.label}</FormLabel>
            </Flex>
          ) : (
            <Select
              value={
                (props.inputProps as SelectProps)?.options
                  ? (props.inputProps as SelectProps)?.options!.find(
                      (option) => (option as any).value === field.value
                    )
                  : ""
              }
              onChange={(val) => form.setFieldValue(props.name, val)}
              {...(props.inputProps as SelectProps)}
            />
          )}
          {props.helpText && <FormHelperText>{props.helpText}</FormHelperText>}
          <ConditionalWrapper
            condition={props.hideError}
            wrapper={(children) => <VisuallyHidden>{children}</VisuallyHidden>}
          >
            <FormErrorMessage>
              {form.errors[props.name] as string}
            </FormErrorMessage>
          </ConditionalWrapper>
        </FormControl>
      )}
    </Field>
  );
};
