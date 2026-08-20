import { PortableText } from "@portabletext/react"
import type { PortableTextBlock } from "sanity"
import type { PortableTextComponents } from "@portabletext/react"

const components: Partial<PortableTextComponents> = {
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }: { children?: React.ReactNode }) => <em className="italic">{children}</em>,
    link: ({ value, children }: any) => (
      <a href={value?.href} className="text-[#C2542D] underline" target="_blank" rel="noreferrer">
        {children}
      </a>
    ),
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => <h2 className="oh-headline text-2xl mb-3">{children}</h2>,
    h3: ({ children }: { children?: React.ReactNode }) => <h3 className="oh-headline text-xl mb-2">{children}</h3>,
    normal: ({ children }: { children?: React.ReactNode }) => <p className="oh-body mb-4">{children}</p>,
  } as any,
}

export function PortableTextRenderer({ value }: { value: PortableTextBlock[] | undefined }) {
  if (!value || value.length === 0) return null
  return <PortableText value={value} components={components} />
}



