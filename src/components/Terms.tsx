import { useTranslations } from "next-intl";
import { Text } from "./typograph/Text";
import { Title } from "./typograph/Title";
import { memo } from "react";
import { HR } from "flowbite-react";

export const Terms = memo(function Privacy() {
  const translate = useTranslations("Terms");
  return (
    <div className="pt-8">
      <h1 className="text-3xl text-center pb-4">{translate("title")}</h1>
      <Title>{translate("lastUpdated")}</Title>
      <Text>{translate("intro")}</Text>
      <HR />
      <Title>{translate("acceptance")}</Title>
      <Text>{translate("acceptanceText")}</Text>
      <HR />
      <Title>{translate("intellectualProperty")}</Title>
      <Text>{translate("intellectualPropertyText")}</Text>
      <HR />
      <Title>{translate("useLicense")}</Title>
      <Text>{translate("useLicenseText")}</Text>
      <HR />
      <Title>{translate("registration")}</Title>
      <Text>{translate("registrationText")}</Text>
      <HR />
      <Title>{translate("paidServices")}</Title>
      <Text>{translate("paidServicesText")}</Text>
      <HR />
      <Title>{translate("competitions")}</Title>
      <Text>{translate("competitionsText")}</Text>
      <HR />
      <Title>{translate("disclaimers")}</Title>
      <Text>{translate("disclaimersText")}</Text>
      <HR />
      <Title>{translate("indemnification")}</Title>
      <Text>{translate("indemnificationText")}</Text>
      <HR />
      <Title>{translate("arbitration")}</Title>
      <Text>{translate("arbitrationText")}</Text>
      <HR />
      <Title>{translate("miscellaneous")}</Title>
      <Text>{translate("miscellaneousText")}</Text>
    </div>
  );
});
