const BASE_URL = "/api";
interface Category {
  id: number;
  name: string;
}
export async function fetchCategories(): Promise<Category[]> {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await fetch(`${BASE_URL}/category`);
    const data: Category[] = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}
