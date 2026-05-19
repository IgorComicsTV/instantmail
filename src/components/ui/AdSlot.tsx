import { BadgeDollarSign } from "lucide-react";

type AdSlotProps = {
  label: string;
  className?: string;
};

export function AdSlot({ label, className = "" }: AdSlotProps) {
  return (
    <aside
      aria-label={`Reserved ad space: ${label}`}
      className={`rounded-[24px] border-2 border-dashed border-blue-400/30 bg-white/80 p-5 text-center text-slate-500 shadow-[0_18px_45px_rgba(15,23,42,0.12)] backdrop-blur-xl ${className}`}
    >
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-sky-400 text-white shadow-[0_14px_34px_rgba(37,99,235,0.35)]">
        <BadgeDollarSign aria-hidden="true" size={22} />
      </div>
      <p className="font-bold text-slate-950" style={{ fontFamily: "Nunito, sans-serif" }}>
        {label}
      </p>
      <p className="mt-1 text-sm font-medium">Ad placeholder</p>
    </aside>
  );
}
