import { useTranslation } from 'react-i18next';

interface ComingSoonProps {
  title: string;
}

function ComingSoon({ title }: ComingSoonProps) {
  const { t } = useTranslation();

  return (
    <section className="coming-soon">
      <h3>{title}</h3>
      <p>{t('comingSoon.text')}</p>
    </section>
  );
}

export default ComingSoon;