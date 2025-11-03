export interface SmsProvider {
  sendSms(phone: string, message: string): Promise<void>;
}

export const noopSmsProvider: SmsProvider = {
  async sendSms(phone: string, message: string) {
    console.log(`[SMS MOCK] to=${phone} message=${message}`);
  },
};
