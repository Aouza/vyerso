import {
  Footer,
  FinalCta,
  Objections,
  Offer,
} from "@/components/marketing/nos/closing";
import { Header, Hero } from "@/components/marketing/nos/hero";
import {
  HowItWorks,
  NotATest,
  Privacy,
} from "@/components/marketing/nos/how-privacy";
import { Mirror, Reframe } from "@/components/marketing/nos/mirror-reframe";
import {
  Discoveries,
  Mechanism,
  Preview,
} from "@/components/marketing/nos/preview";

// Ordem das 12 seções: hero, espelho, reframe, prévia, descobertas, mecanismo,
// como funciona, anti-promessa, privacidade, objeções, oferta, CTA final.
// O teste de headline (variant "variacao") fica fora do ar até a OD-21.
export default function NosPage() {
  return (
    <main>
      <Header />
      <Hero />
      <Mirror />
      <Reframe />
      <Preview />
      <Discoveries />
      <Mechanism />
      <HowItWorks />
      <NotATest />
      <Privacy />
      <Objections />
      <Offer />
      <FinalCta />
      <Footer />
    </main>
  );
}
