import React from 'react';

interface NextLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string | { pathname?: string };
  replace?: boolean;
  scroll?: boolean;
  prefetch?: boolean;
  children?: React.ReactNode;
}

export default function Link({
  href,
  replace: _replace,
  scroll: _scroll,
  prefetch: _prefetch,
  children,
  ...rest
}: NextLinkProps) {
  const resolvedHref = typeof href === 'string' ? href : href?.pathname || '#';
  return (
    <a href={resolvedHref} {...rest}>
      {children}
    </a>
  );
}
