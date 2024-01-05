import { useRouter } from "next/router";
import ReactFlagsSelect from "react-flags-select";
import { useState, useEffect } from "react";

export const LocaleSwitcherFlags = () => {
  const router = useRouter();
  const initialLanguage = router.locale; //grabbing initial language

  //converting country in to language and vice versa
  const languageToCountry = (e: string | undefined) => {
    switch (e) {
      case "en":
        return "US";
      case "pt":
        return "BR";
      case "fr":
        return "FR";
      default:
        return "";
    }
  };
  const countryToLanguage = (e: string | undefined) => {
    switch (e) {
      case "US":
        return "en";
      case "BR":
        return "pt";
      case "FR":
        return "fr";
      default:
        return "";
    }
  };

  //change language function
  const handleSwitchLocale = (code: string) => {
    setSelected(code);

    const { pathname, query } = router;

    router.push({ pathname, query }, undefined, {
      locale: countryToLanguage(code),
    });
  };

  //grabbing initial language
  const [selected, setSelected] = useState(languageToCountry(initialLanguage));

  //refreshing page
  const refreshNumber = 700;
  const [windowSize, setWindowSize] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  useEffect(() => {
    const handleResize = () => {
      const newWindowSize = window.innerWidth;
      if (windowSize <= refreshNumber && newWindowSize > refreshNumber) {
        // reload when transition pass through "refreshNumber"
        window.location.reload();
      }
      setWindowSize(newWindowSize);
    };
    // Add listener to window resize at component load
    window.addEventListener("resize", handleResize);
    // Remove listener to window resize at component unload
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowSize]);

  return (
    <>
      <ReactFlagsSelect
        selected={selected}
        onSelect={handleSwitchLocale}
        countries={["US", "BR", "FR"]}
        showSelectedLabel={
          typeof window !== "undefined" && window.innerWidth >= refreshNumber
            ? true
            : false
        } //name of the country
        fullWidth={false}
      />
    </>
  );
};
