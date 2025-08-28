import Constants from "expo-constants";

type Extra = {
  apiUrl?: string;
};

class ApiConfig {
  private readonly baseUrl: string;

  constructor() {
    const extra = (Constants.expoConfig?.extra || {}) as Extra;
    if (!extra.apiUrl) {
      throw new Error(
        "API URL não configurada. Defina 'extra.apiUrl' no app.json."
      );
    }
    this.baseUrl = this.normalizeBase(extra.apiUrl);
  }

  private normalizeBase(url: string) {
    return url.replace(/\/+$/, ""); // tira barra no final
  }

  public getApiBaseUrl() {
    return this.baseUrl;
  }

  public auth = {
    login: () => `${this.baseUrl}/Authentication/Login`,
  };
}

export default new ApiConfig();
