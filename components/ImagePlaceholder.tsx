import { ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImagePlaceholderProps {
  label: string;
  aspectRatio?: string;
  src?: string;
  className?: string;
}

export function ImagePlaceholder({
  label,
  aspectRatio = "16/9",
  src,
  className,
}: ImagePlaceholderProps) {
  return (
    <div
      className={`image-placeholder-wrapper relative overflow-hidden bg-[var(--accent-warm)] ${className ?? ""}`}
      style={{ aspectRatio }}
    >
      {src ? (
        <Image
          src={src}
          alt={label}
          fill
          className="image-content object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <div className="image-placeholder-inner absolute inset-0 flex flex-col items-center justify-center gap-3 text-[var(--foreground-subtle)]">
          <ImageIcon className="size-8 opacity-40" aria-hidden="true" />
          <span className="image-label text-xs font-medium text-center px-4 opacity-60 leading-relaxed">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
