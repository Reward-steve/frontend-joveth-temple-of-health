import * as React from "react";
import { NavLink } from "react-router-dom";
import { AuthHolder } from "../AuthHolder";
import { BasicForm } from "./BasicInfoForm";
import { DetailsForm } from "./DetailsForm";

import { FormHeader } from "../form/FormHeader";
import Form from "../form/Form";
import { useSignupLogic } from "./useSignupLogic";

export default function SignUp(): JSX.Element {
  document.title = "Auth | Signup";
  const {
    step,
    setStep,
    isLoading,
    register,
    handleSubmit,
    errors,
    getValues,
    onSubmit,
  } = useSignupLogic();

  return (
    <AuthHolder>
      <Form
        handleOnSubmit={handleSubmit(onSubmit)}
        aria-labelledby="signup-heading"
      >
        <FormHeader title="Sign Up" />

        {step === "basic" ? (
          <BasicForm
            register={register}
            errors={errors}
            step={() => setStep("details")}
            value={getValues()} // for radio checked state
          />
        ) : (
          <DetailsForm
            register={register}
            errors={errors}
            step={() => setStep("basic")}
            isLoading={isLoading}
            value={getValues()}
          />
        )}

        <label className="text-center text-base text-[#555] my-4 flex justify-center gap-2.5">
          <p>Already have an account?</p>
          <NavLink className="text-blue-600" to="/auth/login">
            Log in
          </NavLink>
        </label>
      </Form>
    </AuthHolder>
  );
}
