import React from "react";

export function FormContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-[90%] bg-[aliceblue] flex flex-col justify-center items-center p-4 rounded-[10px] h-full max-w-[600px]">
      {children}
    </div>
  );
}
