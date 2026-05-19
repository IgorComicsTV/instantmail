import {
  languageOrder,
  languages,
  type LanguageCode,
} from "../../features/mail/i18n";

type LanguageMenuProps = {
  current: LanguageCode;
  hrefFor: (code: LanguageCode) => string;
};

export function LanguageMenu({ current, hrefFor }: LanguageMenuProps) {
  const currentLanguage = languages[current];

  return (
    <details className="language-menu relative">
      <summary className="inline-flex h-10 cursor-pointer list-none items-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50">
        <span aria-hidden="true">{currentLanguage.flag}</span>
        <span>Language</span>
      </summary>
      <div className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-lg border border-slate-200 bg-white py-1 shadow-sm">
        {languageOrder.map((code) => {
          const language = languages[code];
          const isCurrent = code === current;

          return (
            <a
              aria-current={isCurrent ? "page" : undefined}
              className={`flex items-center gap-3 px-3 py-2 text-sm transition ${
                isCurrent
                  ? "bg-brand-50 font-semibold text-brand-700"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
              href={hrefFor(code)}
              key={code}
            >
              <span aria-hidden="true" className="w-5 text-base">
                {language.flag}
              </span>
              <span>{language.name}</span>
            </a>
          );
        })}
      </div>
    </details>
  );
}
