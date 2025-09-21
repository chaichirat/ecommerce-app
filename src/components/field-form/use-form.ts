import { useMemo } from "react";
import { useForm, useFormState } from "react-final-form";

export const useCustomForm = <T>() => {
  const form = useForm();
  const { change, submit } = useForm<any>();
  const { getFieldState, reset, restart } = useForm<T>();
  const formState = useFormState<T>({
    subscription: {
      initialValues: true,
      values: true,
      errors: true,
      submitFailed: true,
      submitting: true,
      touched: true,
    },
  });

  const memoizedValues = useMemo(() => formState.values, [formState.values]);
  const memoizedErrors = useMemo(() => formState.errors, [formState.errors]);
  const memoizedTouched = useMemo(() => formState.touched, [formState.touched]);

  return {
    change,
    submit,
    form,
    formState,
    getFieldState,
    reset,
    restart,
    values: memoizedValues,
    errors: memoizedErrors,
    submitFailed: formState.submitFailed,
    submitting: formState.submitting,
    touched: memoizedTouched,
  };
};
