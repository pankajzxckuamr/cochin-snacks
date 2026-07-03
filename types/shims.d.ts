declare module '@next/third-parties/google' {
  import * as React from 'react';
  export const GoogleAnalytics: React.ComponentType<{ gaId: string }>;
}

declare module '@sanity/image-url' {
  export default function imageUrlBuilder(client: any): {
    image(source: any): {
      width(w: number): any;
      format(f: string): any;
      url(): string;
    };
  };
}
