// components/ResetButton.tsx
interface ResetButtonProps {
  onReset: () => void;
  hasFilters: boolean;
}

export function ResetButton({ onReset, hasFilters }: ResetButtonProps) {
  if (!hasFilters) return null;

  return (
    <button
      onClick={onReset}
      className="text-sm text-[#2D5A3F] hover:text-[#3D7A55] underline underline-offset-2 transition-colors font-medium"
    >
      Reset All Filters
    </button>
  );
}