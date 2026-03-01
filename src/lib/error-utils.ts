import axios from "axios";

interface NestJSValidationError {
  statusCode: number;
  message: string | string[];
  error: string;
}

interface PrismaError {
  code: string;
  meta?: {
    target?: string[];
    [key: string]: unknown;
  };
  message?: string;
}

export function extractErrorMessage(error: unknown): string {
  if (!error) {
    return "Terjadi kesalahan yang tidak diketahui";
  }

  if (typeof error === "string") {
    return error;
  }

  if (axios.isAxiosError(error)) {
    if (error.response?.data) {
      return extractErrorMessage(error.response.data);
    }
  }

  if (typeof error === "object") {
    const err = error as Record<string, unknown>;

    if ("statusCode" in err && "message" in err) {
      const nestError = err as unknown as NestJSValidationError;

      if (Array.isArray(nestError.message)) {
        return nestError.message[0] || "Validasi gagal";
      }

      return nestError.message || "Terjadi kesalahan validasi";
    }

    if ("code" in err && typeof err.code === "string") {
      const prismaError = err as unknown as PrismaError;
      return getPrismaErrorMessage(prismaError);
    }

    if ("message" in err && typeof err.message === "string") {
      return err.message;
    }

    if ("response" in err && typeof err.response === "object" && err.response) {
      const response = err.response as Record<string, unknown>;
      if ("data" in response) {
        return extractErrorMessage(response.data);
      }
    }

    if ("data" in err && typeof err.data === "object" && err.data) {
      return extractErrorMessage(err.data);
    }
  }

  if (error instanceof Error) {
    return error.message || "Terjadi kesalahan";
  }

  return "Terjadi kesalahan yang tidak diketahui";
}

function getPrismaErrorMessage(error: PrismaError): string {
  const { code, meta, message } = error;

  switch (code) {
    case "P2002":
      const target = meta?.target?.[0] || "field";
      return `${target} sudah digunakan`;

    case "P2025":
      return "Data tidak ditemukan";

    case "P2003":
      return "Data terkait tidak ditemukan";

    case "P2014":
      return "Relasi data tidak valid";

    case "P2000":
      return "Nilai terlalu panjang";

    case "P2001":
      return "Data tidak ada";

    case "P2015":
      return "Data terkait tidak ditemukan";

    default:
      return message || "Terjadi kesalahan database";
  }
}

export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.message.includes("network") ||
      error.message.includes("fetch") ||
      error.message.includes("Network")
    );
  }

  if (typeof error === "object" && error !== null) {
    const err = error as Record<string, unknown>;
    return (
      err.code === "NETWORK_ERROR" ||
      err.code === "ECONNREFUSED" ||
      err.code === "ETIMEDOUT"
    );
  }

  return false;
}

export function getErrorMessage(
  error: unknown,
  fallback: string = "Terjadi kesalahan",
): string {
  if (isNetworkError(error)) {
    return "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.";
  }

  const message = extractErrorMessage(error);
  return message || fallback;
}
