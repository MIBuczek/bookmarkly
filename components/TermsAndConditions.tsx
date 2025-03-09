import React from 'react';
import { ThemedText } from '@/components/ui/ThemedText';
import { ScrollView, View } from 'react-native';
import { Button } from '@/components/ui/Button';

interface TermsAndConditionsProps {
  onPress: () => void;
}

export const TermsAndConditions = ({ onPress }: Readonly<TermsAndConditionsProps>) => (
  <ScrollView>
    <View className="flex-1 items-start justify-start gap-2 p-4">
      <ThemedText type="title" className="text-base">
        1. Introduction
      </ThemedText>
      <ThemedText>
        By accessing and using Bookmarkly (the "App"), you agree to be bound by the following Terms and Conditions. If
        you do not agree to these terms, please do not use the App. These Terms and Conditions govern your use of the
        App, which is designed to store personal information (such as email addresses, phone numbers, and usernames) as
        well as links provided by the users.
      </ThemedText>
      <ThemedText type="subtitle" className="text-base">
        2. User Information Collected
      </ThemedText>
      <ThemedText>
        In order to use the App, you will be required to provide certain personal information, which may include:
        {`\n`}
        {`\n`}
        {`\u2022`} Email Address
        {`\n`}
        {`\u2022`} Phone Number
        {`\n`}
        {`\u2022`} Name or Nickname
        {`\n`}
        {`\n`}
        Additionally, the App will store links that you provide. We take your privacy seriously and are committed to
        safeguarding your personal data.
      </ThemedText>
      <ThemedText type="subtitle" className="text-base">
        3. Use of Your Data
      </ThemedText>
      <ThemedText>
        The personal information and links you provide will be used solely for the following purposes: Storing and
        organizing your account information (such as email, phone number, and username). Storing and accessing the links
        that you provide through the App. Sending you notifications or updates regarding the App, if necessary. Your
        data will not be sold to third parties. However, we may share your data with third-party service providers that
        help us operate the App and perform services on our behalf. These third parties are obligated to maintain the
        confidentiality of your data.
      </ThemedText>
      <ThemedText type="subtitle" className="text-base">
        4. Data Retention and Security
      </ThemedText>
      <ThemedText>
        Your personal information and links will be stored in our secure database for as long as you continue to use the
        App. You can delete your account and data at any time by contacting us through the contact information provided
        in the App. We implement reasonable security measures to protect your data from unauthorized access, alteration,
        or destruction. However, please note that no data transmission or storage system is completely secure, and we
        cannot guarantee the absolute security of your information.
      </ThemedText>
      <ThemedText type="subtitle" className="text-base">
        5. User Responsibilities
      </ThemedText>
      <ThemedText>
        As a user, you are responsible for the accuracy of the information you provide to the App. You agree not to
        upload or share any harmful, unlawful, or inappropriate links or content. You are also responsible for
        maintaining the confidentiality of your account and login information. You should immediately notify us if you
        suspect unauthorized access to your account.
      </ThemedText>
      <ThemedText type="subtitle" className="text-base">
        6. Prohibited Use
      </ThemedText>
      <ThemedText>
        You agree not to use the App for any unlawful purpose, including but not limited to: {`\n`}
        Violating any local, state, or international law. Uploading or sharing malware, viruses, or other harmful
        content. Engaging in activities that disrupt or harm the functionality of the App.
      </ThemedText>
      <ThemedText type="subtitle" className="text-base">
        7. Changes to These Terms
      </ThemedText>
      <ThemedText>
        We may update or modify these Terms and Conditions at any time. If we make any changes, we will notify you
        through the App or by email. Continued use of the App after changes to these terms constitutes your acceptance
        of the new terms.
      </ThemedText>
      <ThemedText type="subtitle" className="text-base">
        8. Limitation of Liability
      </ThemedText>
      <ThemedText>
        To the extent permitted by law, Bookmarkly and its affiliates will not be liable for any indirect, incidental,
        special, or consequential damages arising from the use or inability to use the App.
      </ThemedText>
      <ThemedText type="subtitle" className="text-base">
        9. Privacy Policy
      </ThemedText>
      <ThemedText>
        Your use of the App is also governed by our Privacy Policy, which can be accessed separately. The Privacy Policy
        explains how we collect, use, and protect your personal data.
      </ThemedText>
      <ThemedText type="subtitle" className="text-base">
        10. Termination of Service
      </ThemedText>
      <ThemedText>
        We reserve the right to suspend or terminate your access to the App at any time, without notice, for any reason,
        including but not limited to violations of these Terms and Conditions.
      </ThemedText>
      <ThemedText type="subtitle" className="text-base">
        11. Governing Law
      </ThemedText>
      <ThemedText>
        These Terms and Conditions will be governed by and construed in accordance with the laws of [Country], without
        regard to its conflict of law principles.
      </ThemedText>
      <ThemedText type="subtitle" className="text-base">
        12. Contact Us
      </ThemedText>
      <ThemedText>
        If you have any questions or concerns about these Terms and Conditions, please contact us at: Email:
        [email@example.com] Address: [Company Address]
      </ThemedText>
    </View>
    <View className="px-4">
      <Button type={'primary'} title={'close'} onPress={onPress} />
    </View>
  </ScrollView>
);
