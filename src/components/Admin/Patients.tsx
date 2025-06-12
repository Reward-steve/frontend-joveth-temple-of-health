import * as React from "react";
import { ComponentProps } from "../../components/Admin/AdminData";
import { FaUsers } from "react-icons/fa";
import PageTitle from "../../components/StyleComponent/PageTitle";
const Patients: React.FC<ComponentProps> = () => {
  return (
    <>
      <PageTitle Title={"Patients"} Icon={<FaUsers />} />
    </>
  );
};
export default Patients;
