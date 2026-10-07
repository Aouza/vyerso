import {
  FinalCta,
  Footer,
  Invite,
  Objections,
} from "@/components/marketing/nos/closing";
import { Header, Hero } from "@/components/marketing/nos/hero";
import {
  Different,
  HowItWorks,
  Privacy,
} from "@/components/marketing/nos/how-privacy";
import { Mirror, Reframe } from "@/components/marketing/nos/mirror-reframe";
import {
  Discoveries,
  Mechanism,
  Preview,
} from "@/components/marketing/nos/preview";

// Ordem das 12 seções, cada uma com uma missão comercial:
// 01 hero · 02 espelho · 03 mensagem isolada · 04 mecanismo · 05 demonstração
// · 06 descobertas · 07 por que é diferente · 08 como funciona · 09 privacidade
// · 10 convite · 11 objeções · 12 fechamento.
// O teste de headline (variant "variacao") fica fora do ar até a OD-21.
export default function NosPage() {
  return (
    <main>
      <Header />
      <Hero />
      <Mirror />
      <Reframe />
      <Mechanism />
      <Preview />
      <Discoveries />
      <Different />
      <HowItWorks />
      <Privacy />
      <Invite />
      <Objections />
      <FinalCta />
      <Footer />
    </main>
  );
}
