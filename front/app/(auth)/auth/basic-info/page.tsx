import { BasicInfoForm } from "@/features/auth/components/basic_info-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "اطلاعات پایه",
};

export default function AuthBasicInfoPage() {
  return (
    <div>
      <h1 className="mb-4 text-5xl font-bold">لومینه</h1>
      <BasicInfoForm />
    </div>
  );
}
