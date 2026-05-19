type SiteLogoProps = {
  className?: string;
  size?: number;
};

export function SiteLogo({ className = "h-9 w-9", size = 36 }: SiteLogoProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        alt=""
        aria-hidden="true"
        className="h-full w-full object-contain"
        height={size}
        src="/instant-mail-icon.png"
        width={size}
      />
    </span>
  );
}
