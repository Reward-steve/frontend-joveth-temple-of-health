import { BsFillCheckCircleFill } from "react-icons/bs";

export default function RegistrationSuccess() {
  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-white">
      <main className="h-[455px] max-w-md flex flex-col justify-evenly items-center text-center px-4 border-1">
        <div
          style={{ boxShadow: "#00ff68 0px 0px 35px -3px" }}
          className="rounded-full flex items-center justify-center"
        >
          <BsFillCheckCircleFill
            size={90}
            className="text-green-500 w-full h-full rounded-full"
          />
        </div>
        <header>
          <h1 className="text-3xl font-bold mb-2 text-[#0c5460]">
            Registration Complete!
          </h1>
          <p className="text-[#155724] mb-2">
            Thank you for signing up. A verification email has been sent to your
            inbox.
          </p>
          <p className="text-[#155724] mb-6">
            Verify the email to activate your account.
          </p>
        </header>
      </main>
    </div>
  );
}
