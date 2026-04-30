import { OtpForm } from "@/features/auth/components/otp-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تایید شماره تماس",
};

export default function AuthOtpPage() {
  return (
    <div>
      <h1 className="mb-4 text-5xl font-bold">لومینه</h1>
      <OtpForm />
    </div>
  );
}
