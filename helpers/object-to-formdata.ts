export function objectToFormData(obj: any): FormData {
  const formData = new FormData();

  function appendFormData(data: any, path: string): void {
    if (Array.isArray(data)) {
      data.forEach((value, index) => {
        appendFormData(value, `${path}[${index}]`);
      });
    } else if (typeof data === 'object' && data !== null) {
      Object.keys(data).forEach((key) => {
        if (data[key] instanceof File) {
          formData.append(`${path}[${key}]`, data[key]);
        } else {
          appendFormData(data[key], path ? `${path}.${key}` : key);
        }
      });
    } else {
      formData.append(path, data);
    }
  }

  appendFormData(obj, '');

  return formData;
}
