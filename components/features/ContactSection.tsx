import { FadeIn } from "@/components/ui/FadeIn";

// TODO: 実際の連絡先メールアドレスに差し替え
const email = "hello@example.com";

/**
 * Contact セクション。フォームは置かず、メールアドレスだけを大きく示す。
 */
export function ContactSection() {
  return (
    <section id="contact" className="border-t py-24 lg:py-32">
      <FadeIn>
        <h2 className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
          Contact
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-loose text-muted-foreground">
          お仕事のご相談・お見積りは、メールでお気軽にご連絡ください。
          NDA等で本サイトに掲載していない実績は、ご相談の際にご説明できます。
        </p>
        <a
          href={`mailto:${email}`}
          className="mt-8 inline-block text-lg font-medium tracking-tight underline underline-offset-8 transition-opacity hover:opacity-70"
        >
          {email}
        </a>
      </FadeIn>
    </section>
  );
}
