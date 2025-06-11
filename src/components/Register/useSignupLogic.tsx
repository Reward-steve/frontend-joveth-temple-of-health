import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useApi } from "../../hooks/useApi";
import { validateSignup } from "../../utils/validateSignup";
import { initialUserInfo } from "../../constants/initialUserInfo";
import { toast } from "react-toastify";
import { SignupFormValues } from "../../types/SignupFormProps";
import { useNavigate } from "react-router-dom";

export function useSignupLogic() {
  const [step, setStep] = useState<"basic" | "details">("basic");
  const navigate = useNavigate();
  const { api, error, isLoading, message } = useApi();

  // Setup react-hook-form with type
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    reset,
  } = useForm<SignupFormValues>({ defaultValues: initialUserInfo });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message);
    }
  }, [error, message]);

  const onSubmit = async (data: SignupFormValues) => {
    // Optional: custom validation
    const validationErrors = validateSignup(data);
    if (Object.keys(validationErrors).length > 0) {
      Object.entries(validationErrors).forEach(([key, msg]) =>
        setError(key as keyof SignupFormValues, { message: msg as string })
      );
      return;
    }

    const {
      firstname,
      lastname,
      username,
      email,
      password,
      gender,
      dateOfBirth,
      country,
      state,
      city,
      street,
      emergencyName,
      emergencyPhone,
      relationship,
    } = data;

    const res = await api("POST", "auth/register", {
      firstname,
      lastname,
      username,
      email,
      password,
      dateOfBirth,
      gender,
      address: { country, state, city, street },
      emergencyContact: {
        name: emergencyName,
        phone: emergencyPhone,
        relationship,
      },
    });

    if (res) {
      navigate("/registration-success");
      reset(initialUserInfo); // Reset form to initial values
    }
  };

  return {
    step,
    setStep,
    isLoading,
    register,
    handleSubmit,
    errors,
    getValues,
    onSubmit,
  };
}
