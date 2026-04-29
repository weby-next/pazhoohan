import { Handset } from "@gravity-ui/icons";
import { Accordion, Chip, Surface } from "@heroui/react";

export const PhoneAccordion = () => {
  return (
    <Accordion variant="surface">
      <Accordion.Item>
        <Accordion.Heading>
          <Accordion.Trigger>
            در صورت بروز هرگونه مشکل یا سوال تماس بگیرید
            <Accordion.Indicator className="mr-4" />
          </Accordion.Trigger>
        </Accordion.Heading>
        <Accordion.Panel>
          <Accordion.Body>
            <Surface
              variant="secondary"
              className="rounded-3xl p-4 flex justify-between items-center"
            >
              <div className="flex items-center gap-2">
                <Handset />
                <p>(+98)9333352650</p>
              </div>
              <div className="flex gap-2">
                <Chip variant="soft" color="success">
                  24/7
                </Chip>
                <p>شماره تماس</p>
              </div>
            </Surface>
          </Accordion.Body>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  );
};
