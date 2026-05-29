import Menu from "lucide-react/dist/esm/icons/menu.js";
import { getToolNavigationItems, type ToolSlug } from "../../features/mail/toolPages";
import type { LanguageCode } from "../../features/mail/i18n";

type ToolsMenuProps = {
  currentLanguage: LanguageCode;
  currentSlug?: ToolSlug;
  hrefFor: (slug: ToolSlug) => string;
};

export function ToolsMenu({ currentLanguage, currentSlug, hrefFor }: ToolsMenuProps) {
  const items = getToolNavigationItems(currentLanguage);

  return (
    <details className="tools-menu relative">
      <summary
        aria-label="Open tools menu"
        className="inline-flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
      >
        <Menu aria-hidden="true" size={20} />
      </summary>
      <div className="absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-sm">
        {items.map((item) => {
          const isCurrent = item.slug === currentSlug;

          return (
            <a
              aria-current={isCurrent ? "page" : undefined}
              className={`block px-3 py-2 text-sm transition ${
                isCurrent
                  ? "bg-brand-50 font-semibold text-brand-700"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
              href={hrefFor(item.slug)}
              key={item.slug}
            >
              {item.label}
            </a>
          );
        })}
      </div>
    </details>
  );
}
