import React from "react";
import { HR } from "flowbite-react";
import { Text } from "@/components/typograph/Text";
import { Title } from "@/components/typograph/Title";

export default async function Page() {
  return (
    <div>
      <h1 className="text-3xl text-center pb-4">Privacy Policy for Skin Collection</h1>
      <Title>Information We Collect</Title>
      <Text>
        When using the SkinCollection app, we collect your account ID through the Riot
        Sign On authentication system. This ID is used to associate information about
        acquired skins and user reviews. We do not collect additional personal information
        such as name, email, or payment data.
      </Text>
      <HR />
      <Title>Use of Information</Title>
      <Text>
        The information collected is used to: Catalog skins acquired by users in the game
        League of Legends. Allow users to rate and review skins. Personalize the user
        experience within the app.
      </Text>
      <HR />
      <Title>Use of Cookies The Skin</Title>
      <Text>
        Collection app may use cookies to enhance the user experience by remembering
        preferences and sessions.
      </Text>
      <HR />
      <Title>Protection of Information</Title>
      <Text>
        The Skin Collection app may use cookies to enhance the user experience by
        remembering preferences and sessions.
      </Text>
      <HR />
      <Title>Sharing of Information</Title>
      <Text>
        We do not sell, trade, or transfer personally identifiable information to third
        parties. Information may only be shared to comply with the law, enforce our
        policies, or protect our rights, property, or safety.
      </Text>
      <HR />
      <Title>GDPR Compliance</Title>
      <Text>
        For users in the European Economic Area (EEA), we adhere to the General Data
        Protection Regulation (GDPR). You have the right to access, correct, or delete
        your personal data. To exercise these rights, please contact us.
      </Text>
      <HR />
      <Title> {"Children"}s Privacy</Title>
      <Text>
        We do not knowingly collect information from anyone under the age of 13. Our app
        is directed to people who are at least 13 years old.
      </Text>
      <HR />
      <Title> Online Privacy Policy </Title>
      <Text>
        Only This online privacy policy applies only to information collected through our
        app and not to information collected offline.
      </Text>
      <HR />
      <Title> Consent </Title>
      <Text>By using our app, you consent to our privacy policy.</Text>
      <HR />
      <Title> Changes to Our Privacy Policy </Title>
      <Text>
        If we decide to change our privacy policy, we will post those changes on this
        page. This policy was last modified on July 31, October
      </Text>
      <HR />
      <Title>Contact Us</Title>
      <Text>
        If you have any questions regarding this privacy policy, you may contact us at
        [insert contact information].
      </Text>
    </div>
  );
}
