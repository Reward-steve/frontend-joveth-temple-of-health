import { motion } from "framer-motion";
import FormInput from "../form/FormInputs";
import { DetailsFormProps } from "../../types/SignupFormProps";
import { FormContent } from "../form/FormContent";

export const DetailsForm = ({
  register,
  errors,
  step,
  isLoading,
  value,
}: DetailsFormProps) => {
  return (
    <FormContent>
      <div className="w-full flex flex-col md:flex-row gap-4">
        <FormInput
          id="country"
          label="Country"
          type="text"
          placeholder="Nigeria"
          register={register("country", {
            required: "Country is required.",
          })}
          error={errors.country}
        />
        <FormInput
          id="state"
          label="State"
          type="text"
          placeholder="Lagos State"
          register={register("state", {
            required: "State is required.",
          })}
          error={errors.state}
        />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4">
        <FormInput
          id="city"
          label="City"
          type="text"
          placeholder="Lagos"
          register={register("city", {
            required: "City is required.",
          })}
          error={errors.city}
        />
        <FormInput
          id="street"
          label="Street"
          type="text"
          placeholder="No.3 Okoko miko"
          register={register("street", {
            required: "Street is required.",
          })}
          error={errors.street}
        />
      </div>
      <div className="w-full flex flex-col md:flex-row gap-4">
        <FormInput
          id="emergencyPhone"
          label="Emergency Number"
          type="tel"
          placeholder="+234 80 980 67 213"
          register={register("emergencyPhone", {
            required: "Emergency phone number is required.",
            pattern: {
              value: /^\+?\d{10,15}$/,
              message: "Please enter a valid phone number (10-15 digits).",
            },
          })}
          error={errors.emergencyPhone}
        />
        <FormInput
          id="emergencyName"
          label="Emergency Contact Name"
          type="text"
          placeholder="Dandison Evelyn"
          register={register("emergencyName", {
            required: "Emergency contact name is required.",
          })}
          error={errors.emergencyName}
        />
      </div>
      {errors.relationship && (
        <p className="text-red-600 mt-1">{errors.relationship.message}</p>
      )}
      <select
        {...register("relationship", {
          required: "Please select a relationship.",
        })}
        className="text-black border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full mt-2"
        defaultValue={value.relationship || ""}
      >
        <option disabled value="">
          Relationship
        </option>
        <option value="Parent">Parent</option>
        <option value="Sibling">Sibling</option>
        <option value="Spouse">Spouse</option>
        <option value="Friend">Friend</option>
        <option value="Other">Other</option>
      </select>

      <div className="flex gap-2.5 mt-4 w-full">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          className="font-normal text-white text-center cursor-pointer transition-transform transition-colors duration-300 no-underline w-1/2 py-3 px-12 rounded-[10px] my-2 bg-gray-500"
          onClick={step}
        >
          Prev
        </motion.button>
        <button
          type="submit"
          className="font-normal text-white text-center cursor-pointer transition-transform transition-colors duration-300 no-underline w-1/2 py-3 px-12 rounded-[10px] my-2 bg-[#1e9ef4]"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Sign Up"}
        </button>
      </div>
    </FormContent>
  );
};
