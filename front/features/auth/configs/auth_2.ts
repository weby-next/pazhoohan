import { FieldConfig } from "@/shared/types/form/form-builder";

export const auth_2FieldConfig: FieldConfig[] = [
  {
    name: "basic-info_firstname",
    label: "نام",
    type: "text",
    placeholder: "هستی",
    required: true,
  },
  {
    name: "basic-info_lastname",
    label: "نام خانوادگی",
    type: "text",
    placeholder: "اثنی عشری",
    required: true,
  },
  {
    name: "basic-info_gender",
    label: "جنسیت",
    type: "radio",
    options: [
      { label: "مرد", value: "male" },
      { label: "زن", value: "female" },
    ],
    required: true,
  },
  {
    name: "basic-info_birth-day",
    type: "date",
    label: "تاریخ تولد",
    required: true,
  },
  {
    name: "basic-info_national",
    label: "ملیت",
    type: "radio",
    options: [
      { label: "ایرانی", value: "irani" },
      { label: "اتباع", value: "kardo" },
    ],
    required: true,
  },
  {
    name: "basic-info_identifier",
    type: "text",
    label: "شناسه",
    numericOnly: true,

    dynamicIdentifier: {
      dependsOn: "basic-info_national",

      defaultLabel: "کد ملی / کد فراگیر",
      defaultPlaceholder: "ابتدا ملیت را انتخاب کنید",

      map: {
        irani: {
          label: "کد ملی",
          placeholder: "0123456789",
          maxLength: 10,
        },
        kardo: {
          label: "کد فراگیر",
          placeholder: "123456789012",
          maxLength: 12,
        },
      },
    },
    required: true,
  },
];
