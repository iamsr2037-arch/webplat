import crypto from "crypto";

interface SSLCommerzInitiatePaymentParams {
  store_id: string;
  store_passwd: string;
  total_amount: number;
  currency: string;
  tran_id: string;
  success_url: string;
  fail_url: string;
  cancel_url: string;
  ipn_url: string;
  cus_name: string;
  cus_email: string;
  cus_phone?: string;
  cus_add1?: string;
  cus_city?: string;
  cus_state?: string;
  cus_postcode?: string;
  cus_country?: string;
  shipping_method?: string;
  product_name: string;
  product_category?: string;
  product_profile?: string;
}

export function generateTransactionId(): string {
  return `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function generateDownloadToken(): string {
  return crypto.randomUUID();
}

export function initiateSslcommerzPayment(
  params: SSLCommerzInitiatePaymentParams
): string {
  const apiUrl = process.env.SSLCOMMERZ_API_URL || "https://sandbox.sslcommerz.com";

  const queryString = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      queryString.append(key, String(value));
    }
  });

  return `${apiUrl}/gwprocess/v4/api.php?${queryString.toString()}`;
}

export function verifySSLcommerzSignature(
  data: Record<string, string>,
  signature: string
): boolean {
  const storePassword = process.env.SSLCOMMERZ_STORE_PASSWORD || "";

  // Create a string from the data
  const hashString = Object.keys(data)
    .sort()
    .map((key) => `${key}=${data[key]}`)
    .join("&");

  // Generate SHA256 hash
  const hash = crypto
    .createHash("sha256")
    .update(hashString + storePassword)
    .digest("hex");

  return hash === signature;
}

export function calculateTokenExpiry(daysFromNow: number = 30): Date {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + daysFromNow);
  return expiry;
}
