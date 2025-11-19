import { useEffect, useState } from 'react';
import { ZDiet, dietSchema } from '@/zod/diets/diet.schema';
import { z } from 'zod';
import { dietsResponseSchema } from '@/zod/diets/api.diets.schema';

export function useGetAllDiets() {
  const [dietsData, setDietsData] = useState<ZDiet[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDiets() {
      try {
        const res = await fetch('/api/diets');
        if (!res.ok) {
          throw new Error('Failed to fetch diets');
        }

        const json = await res.json();

        const data = dietsResponseSchema.parse(json);
        setDietsData(data.diets);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    }

    fetchDiets();
  }, []);

  return { dietsData, isLoading, error };
}
