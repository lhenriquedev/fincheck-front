import { categoriesService } from '../services/categoriesService'
import { useQuery } from '@tanstack/react-query'

export const useCategories = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: categoriesService.getAll,
  })

  return {
    categories: data ?? [],
    isLoadingCategories: isLoading,
  }
}
