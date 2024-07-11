import { useToast as useToastShadcn } from "@/components/ui/use-toast";

export const useToast = () => {
  const { toast } = useToastShadcn();

  const showToast = (title, description, variant = "default") => {
    toast({
      title,
      description,
      variant,
    });
  };

  return { showToast };
};

export default useToast;