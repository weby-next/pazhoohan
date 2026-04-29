import { PhoneAccordion } from "@/shared/components/form/phone-accordion";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="text-center justify-center">{children}</div>
      <footer className="mt-8 text-text-secondary-light dark:text-text-secondary-dark text-sm">
        <PhoneAccordion />
      </footer>
    </section>
  );
}
