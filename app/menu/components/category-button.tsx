import { Button } from "@/components/ui/button";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  title: string;
  selected: boolean;
  action: () => void;
}

export default function CategoryButton({
  action,
  selected,
  title,
}: ButtonProps) {
  return (
    <Button
      variant="outline"
      className={twMerge(
        "border p-3 rounded-lg justify-center items-center",
        selected ? "border-mainGreen" : null
      )}
      onClick={action}
    >
      <span className="font-medium text-sm">{title}</span>
    </Button>
  );
}
