import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import React, { type ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: string };

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      {...rest}
      // @ts-ignore
      href={href}
      onPress={async (event) => {
        event.preventDefault();
        await openBrowserAsync(href);
      }}
    />
  );
}
