import { productsApi } from "@/core/api/productsApi";
import { User } from "../interface/user";

export interface AuthResponse {
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
  token: string;
  status?: number;
  message?: string;
}

const returnUserToken = (data: AuthResponse) => {
  const { id, email, fullName, isActive, roles, token } = data;

  const user: User = { id, email, fullName, isActive, roles };

  return {
    user,
    token,
  };
};

export const authLogin = async (email: string, password: string) => {
  email = email.toLocaleLowerCase();

  try {
    const { data } = await productsApi.post<AuthResponse>("/auth/login", {
      email,
      password,
    });
    return returnUserToken(data);
  } catch (error) {
    console.log(`AuthLogin error: ${error}`);
    //throw new Error("User and/or password not valid");
    return null;
  }
};

export const authCheckStatus = async () => {
  try {
    const { data } = await productsApi.get<AuthResponse>("/auth/check-status");

    return returnUserToken(data);
  } catch (error) {
    null;
  }
};

export const authRegister = async (
  fullName: string,
  email: string,
  password: string
) => {
  email = email.toLocaleLowerCase();

  try {
    const { data } = await productsApi.post<AuthResponse>("/auth/register", {
      fullName,
      email,
      password,
    });

    return data;
  } catch (error: any) {
    // Error de respuesta de la API
    if (error.response) {
      const status = error.response.status;
      const message =
        error.response.data?.message || "Error al autenticar usuario.";
      return { status, message };
    }

    // Error de red
    if (error.request) {
      return {
        status: 0,
        message:
          "No se pudo conectar con el servidor. Verifica tu conexión a internet.",
      };
    }

    // Error interno
    console.error("AuthLogin error:", error);
    return {
      status: 500,
      message: "Ocurrió un error inesperado. Por favor, inténtalo nuevamente.",
    };
  }
};
