import React from "react";
import { HR } from "flowbite-react";
import { Text } from "@/components/typograph/Text";
import { Title } from "@/components/typograph/Title";

export default async function Page() {
  return (
    <div>
      <h1 className="text-3xl text-center pb-4">Terms of Service for Skin Collection</h1>
      <Title>Last Updated: July 31, 2024</Title>
      <Text>
        Skin Collection ({"Skin Collection"}, {"we"}, {"us"}, {"our"}, or {"Sponsor"})
        offers a platform designed to enhance user experiences through expert analytics
        and tools. This platform includes check which skins the account collected, review
        and rate skins. (collectively, the {"Services"}). Please read these Terms of
        Service (the {"Terms"}) and our Privacy Policy carefully as they govern your use
        of our Services.
      </Text>
      <HR />
      <Title>Acceptance of Terms</Title>
      <Text>
        By accessing or using our Services, you agree to be bound by these Terms and our
        Privacy Policy. If you do not agree to these Terms, you may not use the Services.
        We may update these Terms from time to time. Continued use of the Services after
        such updates constitutes your acceptance of the changes.
      </Text>
      <HR />
      <Title>Intellectual Property</Title>
      <Text>
        All content and materials provided through the Services are owned by Skin
        Collection and/or its licensors and are protected by intellectual property laws.
        You may not reproduce, distribute, or create derivative works from any part of the
        Services without express permission from Skin Collection.
      </Text>
      <HR />
      <Title>Use License</Title>
      <Text>
        We grant you a limited, non-exclusive, non-transferable license to access and use
        the Services for personal, non-commercial use. This license is subject to these
        Terms and does not allow: Modification or copying of the materials; Use for
        commercial purposes or public display; Reverse engineering or decompiling any
        software; Removing proprietary notices from materials. This license may be
        terminated by Skin Collection at any time for any reason.
      </Text>
      <HR />
      <Title>Registration and Account Information</Title>
      <Text>
        Some parts of the Services may require registration. You agree to provide accurate
        and current information during registration and to update it as necessary. You are
        responsible for safeguarding your account credentials and agree to notify us
        immediately of any unauthorized use.
      </Text>
      <HR />
      <Title>Paid Services</Title>
      <Text>
        Certain features of the Services may require a paid subscription. By subscribing,
        you agree to the payment terms and any auto-renewal conditions. Subscription fees
        are non-refundable, and cancellation does not entitle you to a refund but will
        allow access until the end of the subscription term.
      </Text>
      <HR />
      <Title>Competitions</Title>
      <Text>
        If Skin Collection offers competitions, additional terms will apply. You must
        agree to these additional terms to participate. Skin Collection reserves the right
        to modify or cancel any competition at its discretion.
      </Text>
      <HR />
      <Title>Disclaimers and Limitation of Liability</Title>
      <Text>
        The Services are provided {"as is"} without warranties of any kind. Skin
        Collection does not guarantee the accuracy, reliability, or availability of the
        Services. To the maximum extent permitted by law, Skin Collection is not liable
        for any damages arising from your use of the Services.
      </Text>
      <HR />
      <Title>Indemnification</Title>
      <Text>
        You agree to indemnify and hold Skin Collection harmless from any claims, damages,
        or expenses arising from your use of the Services or violation of these Terms.
      </Text>
      <HR />
      <Title>Binding Arbitration and Class Action Waiver</Title>
      <Text>
        All disputes arising from or relating to these Terms shall be resolved through
        binding arbitration, not in court. You waive your right to participate in a class
        action lawsuit or class-wide arbitration.
      </Text>
      <HR />
      <Title>Miscellaneous</Title>
      <Text>
        Entire Agreement: These Terms, along with any additional terms we may provide,
        constitute the entire agreement between you and Skin Collection. Waiver and
        Severability: If any provision of these Terms is found invalid, the remaining
        provisions will continue in effect. Governing Law: These Terms are governed by the
        laws of Brazil.
      </Text>
    </div>
  );
}
