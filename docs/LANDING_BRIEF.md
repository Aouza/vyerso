# Vyerso — Briefs de landing: `/nos`, Brand Home e `/nossa-historia`

**Status:** STRATEGIC DIRECTION / DRAFT (a copy exige validação com `PRIVACY.md` e `MONETIZATION.md`)  
**Owner:** Product / Growth  
**Última atualização:** 2026-10-07

## Agent rules
- Não inventar prova social, números de usuários, avaliações ou depoimentos. Placeholders visíveis até haver dado real.
- Não prometer funcionalidade que o produto ainda não entrega.
- Não derivar comportamento de produto a partir da copy (regra do `PRODUCT.md`).
- Respeitar `MARKETING.md`: nada de promessa de traição, perda de interesse, manipulação ou descoberta negativa.

## 1. Objetivo
Este brief cobre principalmente a landing do **Nós (`/nos`)**. A Brand Home e a landing de Nossa História estão em §7 e §8 (ADR-021). O design em revisão é a /nos, não a Home.
Validar demanda pelo **Nós** com uma **fake door** (ainda não há importação nem análise no produto). Fluxo (decisão do dono do produto, 2026-10-07): a página de vendas **não mostra preço nem pede e-mail**; todo CTA leva à tela de interesse (`/nos/interesse`), que diz com clareza que o produto ainda não está disponível e que nada foi cobrado, e só ali pede o e-mail. Métrica de sucesso: visita → clique no CTA → e-mail, por origem (UTM) e por gancho.

## 2. Posicionamento
- **Produto:** Nós ("A relação de vocês, vista pelas conversas").
- **Gancho da página:** "Sentiu que algo mudou? Descubra quando." É gancho de aquisição, não o nome do produto (`PRODUCT.md` §5).
- **Diferencial:** visibilidade longitudinal e evidência, **sem veredito nem nota de compatibilidade**. A linguagem separa medição de interpretação (`ANALYTICS_ENGINE.md` §7).
- **Público e canal:** brasileiro, mobile-first, TikTok/Reels.

## 3. Estrutura da página (referência de design: artifact "Vyerso Landing", versão clara, desktop e mobile)
1. Hero: eyebrow emocional, título em paralelismo, subtítulo com momentos reconhecíveis, CTA único, microcopy de privacidade, prova social (placeholder), card de relatório inclinado com insight como manchete, e o arco de dados no fundo.
2. Chips de dúvidas ("Quando começou? Quem passou a iniciar mais? Foi fase ou oscilação?").
3. Prévia gratuita (formato do Free Reveal, `FREE_REVEAL.md`): prova de processamento, **uma** observação neutra, a contagem de períodos importantes e o restante bloqueado. Não mostra o que mudou, quando, o quanto, por quanto tempo, evidências nem a linha do tempo.
4. Antes e depois: um ponto de virada, sinais lado a lado, "durou?", "já aconteceu antes?", evidências, e a frase "Agora você tem uma data para lembrar o que estava acontecendo naquela época."
5. Como funciona (3 passos).
6. Princípio "Menos julgamento. Mais trajetória." (não dizemos / dizemos).
7. Privacidade: jornada do arquivo, o que fica e o que nunca fica, controle do usuário.
8. Lista de espera, FAQ e rodapé com disclaimer ("leitura de trajetória, não veredito; não substitui terapia").

Todo dado visual é fictício e rotulado "Exemplo ilustrativo". Os sinais mostrados (iniciativa, tempo de resposta, mensagens por dia, mensagens de madrugada) são **candidatos** do `ANALYTICS_ENGINE.md`, não a lista final.

## 4. Afirmações: o que pode e o que não pode

| Afirmação | Situação |
|---|---|
| Mostramos o que mudou, quando e com evidências; sem nota de compatibilidade ou diagnóstico | **Pode** (`PRODUCT.md`, `ANALYTICS_ENGINE.md`) |
| O arquivo original é apagado depois da análise | **Pode** (direção do `PRIVACY.md`) |
| "Em até 7 dias" para envio abandonado | **Só como placeholder** ("[X] dias") até o `PRIVACY.md` fechar o prazo |
| Guardamos resultados derivados e trechos curtos; nunca a conversa inteira | **Pode** (ADR-020), sem números de limite e sem detalhar o snapshot |
| Você pode excluir uma conexão ou a conta | **Pode como intenção**; comportamento final de exclusão é OD-03 |
| Prévia gratuita, relatório completo depois | **Pode**, sem preço (`MONETIZATION.md`: TBD) |
| "Sem assinatura" | **Não afirmar** até OD-09 |
| Instagram, áudio ou outras fontes | **Não afirmar** (OD-10); a página diz só WhatsApp |
| "Nunca treina IA", "mascaramos seus dados no navegador" | **Não afirmar** (provedor de LLM indefinido; a redação no navegador é só direção a investigar, `PRIVACY.md` §8) |
| Free Reveal: mostrar o formato, não o valor central | **Só o formato** (`FREE_REVEAL.md`); conteúdos exatos são NEEDS DEFINITION. A landing não entrega de graça o que o Reveal reserva ao premium (C-09) |
| Nossa História disponível | **Não afirmar** até existir spec (OD-19); na Home, só "em breve" |
| Nota, avaliações, número de pessoas na lista | **Placeholder** até haver dado real |

## 5. Interesse e lista de espera (tela `/nos/interesse`)
- A tela é a única que pede e-mail, e antes disso afirma: o produto ainda não está disponível, nada foi cobrado, nenhuma conversa foi enviada.
- Pergunta opcional de um toque ("o que você mais quer descobrir?"), sem dado de conversa.
- A visita à tela é o sinal de intenção (contável no servidor); a ferramenta de analytics segue na OD-21.
- E-mail apenas para avisar da abertura; aceite explícito e link para a política.
- Captura de origem (UTM) sem nenhum dado de conversa.
- Armazenamento e base legal: OD-11 (decisão pendente).

## 6. O que não fazer
- Prometer "relatório grátis" real antes do produto existir.
- Mostrar preço ou desconto (preços TBD).
- Usar contagem regressiva ou escassez falsa (`MONETIZATION.md` §4).
- Chamar "O Que Mudou?" de produto.

## 7. Brand Home (`vyerso.com.br`) — brief
- **Função:** vender a tese do Vyerso (não um relatório) e deixar quem não tem intenção definida escolher uma experiência. Recebe tráfego sem intenção (bio, busca, indicação, domínio digitado).
- **Estrutura:** tese da marca → como o Vyerso funciona, em breve → cartões das experiências (Nós / ENTENDER; Nossa História / REVIVER, "em breve" até haver spec) → confiança e privacidade → CTA para o produto.
- **Não deve:** replicar as páginas de produto, nem fazer cross-sell agressivo.
- **Pendências:** formulação da tese (OD-18); Nossa História só como "em breve" (OD-19).
- **Medir:** bio/perfil → home → produto escolhido → landing do produto (dimensão Brand, `MONETIZATION.md` §6).

## 8. `/nossa-historia` — brief (BLOQUEADO)
- **Território:** nostalgia, afeto, memória, história construída, presente, compartilhamento.
- **Bloqueio:** a experiência, o teaser e o momento do pagamento não estão especificados (OD-19, `NOSSA_HISTORIA_SPEC.md`). **Não inventar funcionalidades** para preencher a página.
- **Regra de entrada:** conteúdo de Nossa História vai direto a esta landing; ela não introduz dúvidas analíticas do Nós.
