const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost/api'; // Укажите URL вашего бэкенда

interface ApiError {
  error: string;
  message?: string;
  statusCode?: number;
}

interface Application {
  id: string;
  // Add other application properties as needed
}

interface Material {
  id: string;
  name: string;
}

interface System {
  id: string;
  name: string;
  materialId: string;
}

interface WindowType {
  id: string;
  name: string;
  description: string;
}

interface WindowModelCharacteristics {
  profile: string;
  executions: string[];
  sealColors: string[];
  sealMaterial: string[];
  chambers: string;
  glassType: string;
  width: number;
  thermalResistance: number;
  falzHeight: number;
  frameSashHeight: number;
}

interface WindowModel {
  id: string;
  name: string;
  materialId: string;
  materialName: string;
  systemId: string;
  systemName: string;
  typeId: string;
  typeName: string;
  smallImagePath: string;
  mediumImagePath: string;
  largeImagePath: string;
  characteristics: WindowModelCharacteristics;
}

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Получаем токен из localStorage
    const token = localStorage.getItem('auth_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message || error.error || 'An error occurred');
    }

    return response.json();
  }

  // Аутентификация
  async login(email: string, password: string) {
    return this.request<{ token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  // Applications
  async getApplications() {
    return this.request<Application[]>('/application');
  }

  async deleteApplication(id: string) {
    return this.request(`/application/${id}`, {
      method: 'DELETE',
    });
  }

  // Materials
  async getMaterials() {
    return this.request<Material[]>('/materials');
  }

  async createMaterial(data: { name: string }) {
    return this.request<Material>('/materials', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deleteMaterial(id: string) {
    return this.request(`/materials/${id}`, {
      method: 'DELETE',
    });
  }

  // Systems
  async getSystems() {
    return this.request<System[]>('/systems');
  }

  async createSystem(data: { name: string; materialId: string }) {
    return this.request<{ id: string; name: string; materialId: string }>('/systems', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateSystem(id: string, data: { name: string; materialId: string }) {
    return this.request<{ id: string; name: string; materialId: string }>(`/systems/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteSystem(id: string) {
    return this.request(`/systems/${id}`, {
      method: 'DELETE',
    });
  }

  // Window Types
  async getWindowTypes() {
    return this.request<WindowType[]>('/window');
  }

  async createWindowType(data: { name: string; description: string }) {
    return this.request<WindowType>('/window', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateWindowType(id: string, data: { name: string; description: string }) {
    return this.request<WindowType>(`/window/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteWindowType(id: string) {
    return this.request(`/window/${id}`, {
      method: 'DELETE',
    });
  }

  // Window Models
  async getWindowModels() {
    return this.request<WindowModel[]>('/window/model');
  }

  async deleteWindowModel(id: string) {
    return this.request(`/window/model/${id}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiClient();