import { useTranslations } from "next-intl";
import { Text } from "./typograph/Text";
import { Title } from "./typograph/Title";
import { memo } from "react";
import { HR } from "flowbite-react";

export const Privacy = memo(function Privacy() {
  const translate = useTranslations("Privacy");
  return (
    <div className="pt-8">
      <h1 className="text-3xl text-center pb-4">{translate("title")}</h1>
      <Title>{translate("informationCollection")}</Title>
      <Text>{translate("informationCollectionText")}</Text>
      <HR />
      <Title>{translate("useOfInformation")}</Title>
      <Text>{translate("useOfInformationText")}</Text>
      <HR />
      <Title>{translate("useOfCookies")}</Title>
      <Text>{translate("useOfCookiesText")}</Text>
      <HR />
      <Title>{translate("protectionOfInformation")}</Title>
      <Text>{translate("protectionOfInformationText")}</Text>
      <HR />
      <Title>{translate("sharingOfInformation")}</Title>
      <Text>{translate("sharingOfInformationText")}</Text>
      <HR />
      <Title>{translate("gdprCompliance")}</Title>
      <Text>{translate("gdprComplianceText")}</Text>
      <HR />
      <Title>{translate("childrensPrivacy")}</Title>
      <Text>{translate("childrensPrivacyText")}</Text>
      <HR />
      <Title>{translate("onlinePrivacyPolicy")}</Title>
      <Text>{translate("onlinePrivacyPolicyText")}</Text>
      <HR />
      <Title>{translate("consent")}</Title>
      <Text>{translate("consentText")}</Text>
      <HR />
      <Title>{translate("changesToPrivacyPolicy")}</Title>
      <Text>{translate("changesToPrivacyPolicyText")}</Text>
      <HR />
      <Title>{translate("contactUs")}</Title>
      <Text>{translate("contactUsText")}</Text>
    </div>
  );
});
