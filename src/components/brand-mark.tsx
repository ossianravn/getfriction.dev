import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  compact?: boolean;
};

export function BrandMark({ className, compact = false }: BrandMarkProps) {
  return (
    <a
      aria-label="Friction home"
      className={cn("brand-mark", compact && "brand-mark--compact", className)}
      href="#top"
    >
      <span aria-hidden="true" className="brand-mark__prompt">
        &gt;
      </span>
      <span>Friction</span>
      <span aria-hidden="true" className="brand-mark__cursor" />
    </a>
  );
}
