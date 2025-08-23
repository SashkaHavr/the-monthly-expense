import { useTranslations } from 'use-intl';

export function SplashScreeen() {
  const t = useTranslations();
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-1 pb-20">
      <p className="text-lg">{t('defaultComponents.loading')}</p>
    </div>
  );
}
