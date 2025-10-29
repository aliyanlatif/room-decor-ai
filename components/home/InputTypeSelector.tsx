import { InputType } from "@/types";
import { INPUT_TYPES } from "@/constants";
import { cn } from "@/lib/utils";

interface InputTypeSelectorProps {
  selectedInput: InputType;
  onSelectInput: (type: InputType) => void;
}

export default function InputTypeSelector({
  selectedInput,
  onSelectInput,
}: InputTypeSelectorProps) {
  return (
    <div className="flex gap-3 justify-center">
      {INPUT_TYPES.map(({ type, label, icon }) => (
        <button
          key={type}
          onClick={() => onSelectInput(type)}
          className={cn(
            "flex items-center justify-center px-18 py-4 backdrop-blur-sm rounded-full shadow-md border-2 transition-all duration-300",
            selectedInput === type
              ? "bg-white/90 border-transparent text-gray-700"
              : "bg-transparent border-white text-white hover:bg-white/90 hover:border-transparent hover:text-gray-700"
          )}
        >
          <span className="font-medium text-base">
            {icon} {label}
          </span>
        </button>
      ))}
    </div>
  );
}
