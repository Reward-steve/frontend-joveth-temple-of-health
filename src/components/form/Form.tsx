export default function Form({
  handleOnSubmit,
  children,
}: {
  handleOnSubmit: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
}) {
  return (
    <form
      className="w-full h-auto min-h-screen bg-white flex flex-col items-center animate-fade"
      onSubmit={handleOnSubmit}
    >
      {children}
    </form>
  );
}
