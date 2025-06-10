import { motion } from "framer-motion";
import FormInput from "../form/FormInputs";
import { BasicInfoProps } from "../../types/SignupFormProps";
import { FormContent } from "../form/FormContent";

export const BasicForm = ({ register, step, errors }: BasicInfoProps) => {
  return (
    <FormContent>
      {" "}
      <div className="w-full flex flex-col md:flex-row gap-4">
        <FormInput
          id="firstname"
          label="First Name"
          type="text"
          placeholder="Jackson David"
          register={register("firstname", {
            required: "First name is required",
            minLength: {
              value: 2,
              message: "First name must be at least 2 characters.",
            },
          })}
          error={errors?.firstname}
        />
        <FormInput
          id="lastname"
          label="Last Name"
          type="text"
          placeholder="Ayomideh"
          register={register("lastname", {
            required: "Last name is required",
            minLength: {
              value: 2,
              message: "Last name must be at least 2 characters.",
            },
          })}
          error={errors?.lastname}
        />
      </div>
      <FormInput
        id="username"
        label="Username"
        type="text"
        placeholder="Jackson David Ayomideh"
        register={register("username", {
          required: "Username is required",
          minLength: {
            value: 3,
            message: "Username must be at least 3 characters.",
          },
        })}
        error={errors?.username}
      />
      <div className="w-full flex flex-col md:flex-row gap-4">
        <FormInput
          id="password"
          label="Password"
          type="password"
          register={register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters.",
            },
          })}
          error={errors?.password}
        />
        <FormInput
          id="email"
          label="Email Address"
          placeholder="you@example.com"
          type="email"
          register={register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Please enter a valid email address.",
            },
          })}
          error={errors?.email}
        />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4 mt-2">
        <div className="flex flex-col w-full">
          {errors?.gender && (
            <p className="text-red-600 text-sm mb-1">
              {errors?.gender.message}
            </p>
          )}
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                {...register("gender", { required: "Gender is required" })}
                value="Male"
                className="accent-blue-500"
              />
              Male
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                {...register("gender", { required: "Gender is required" })}
                value="Female"
                className="accent-blue-500"
              />
              Female
            </label>
          </div>
        </div>
      </div>
      <FormInput
        id="dateOfBirth"
        label="Date of Birth"
        type="date"
        register={register("dateOfBirth", {
          required: "Date of birth is required",
        })}
        error={errors?.dateOfBirth}
      />
      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        className="font-normal text-white text-center cursor-pointer transition-transform duration-300 no-underline w-full py-3 px-12 rounded-[10px] my-2 bg-[#1e9ef4] mt-2"
        onClick={step}
      >
        Next
      </motion.button>
    </FormContent>
  );
};
