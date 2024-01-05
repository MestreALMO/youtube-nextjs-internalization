import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

export const LocaleSwitcher = () => {
  const t = useTranslations("LocaleSwitcher");
  const router = useRouter();

  const selectedOption = router.locale;

  const handleSwitchLocale = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const { pathname, query } = router;

    const newLocale = e.target.value;

    router.push({ pathname, query }, undefined, { locale: newLocale });
  };

  return (
    <>
      <select value={selectedOption} onChange={handleSwitchLocale}>
        <option value="en">en-us</option>
        <option value="pt">pt-br</option>
        <option value="fr">fr-fr</option>
      </select>
    </>
  );
};
