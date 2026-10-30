# TC-RF01-01 — Busca de missões filtrando por uma base lunar via formulário da página inicial

## Requisito relacionado
Funcionalidade: **Busca de Missões**
Requisito: **RF-01 — Buscar missões por base lunar**

> Fonte: `docs/storefront.md`
> - Deve ser possível selecionar uma ou mais bases lunares como filtro da busca.
> - A busca pode ser iniciada tanto pelo formulário da página inicial quanto pelo destaque de uma base lunar específica.
> - As missões que atendem às bases selecionadas devem ser apresentadas junto com a quantidade de resultados encontrados.
> - Os resultados devem indicar quais bases estão sendo usadas como filtro.

## Pré-condições
- Aplicação Lunar Pass disponível e acessível em `http://localhost:3000/`.
- Viajante está na página inicial, sem nenhuma base lunar previamente selecionada no formulário de busca.

## Dados de entrada / massa de teste
| Campo               | Valor                                  |
|----------------------|-----------------------------------------|
| Base lunar filtrada  | Base Lunar Alpha (única base marcada)   |
| Ordenação            | Não alterada (mantida no padrão)        |

## Passos

| # | Ação | Resultado esperado |
|---|------|----------------------|
| 1 | Acessar `http://localhost:3000/` | Página inicial é carregada, exibindo o formulário de busca com os checkboxes das 4 bases lunares do catálogo (Alpha, Orion, Aurora e Selene), o campo de ordenação e o botão "Buscar missões". |
| 2 | Marcar o checkbox "Base Lunar Alpha", mantendo as demais bases desmarcadas | Apenas o checkbox "Base Lunar Alpha" passa para o estado marcado. |
| 3 | Clicar no botão "Buscar missões" | A aplicação navega para a página de resultados de missões. |
| 4 | Observar o cabeçalho da página de resultados | É exibida a quantidade de missões encontradas e uma indicação de que a busca está filtrada pela "Base Lunar Alpha". |
| 5 | Observar a lista de missões retornada | São listadas apenas missões com destino à Base Lunar Alpha. |

## Resultado obtido
Todos os passos foram executados via Playwright MCP interagindo com a interface (sem uso de curl ou chamadas diretas à API):

1. A página inicial (`http://localhost:3000/`, título "Lunar Pass — Passagens para a Lua") carregou corretamente com o formulário de busca, exibindo os 4 checkboxes de bases lunares (Alpha, Orion, Aurora, Selene), o combobox "Ordenar por" (com "Missão mais próxima" selecionado por padrão) e o botão "Buscar missões".
2. O checkbox "Base Lunar Alpha" foi marcado com sucesso (estado `checked`), permanecendo os demais desmarcados.
3. Ao clicar em "Buscar missões", a aplicação navegou para `http://localhost:3000/missions?base=alpha` (título "Missões disponíveis · Lunar Pass").
4. O cabeçalho da página de resultados exibiu o texto "1 missão disponível" (quantidade de resultados) e o texto "Base Base Lunar Alpha" logo abaixo, além de um botão/chip de filtro com o rótulo "Base Lunar Alpha" na área de refinamento — ambos indicando a base usada como filtro.
5. A lista de resultados exibiu exatamente 1 missão (código LP-0127A, Foguete Starship, destino Base Lunar Alpha, Mar da Tranquilidade, período 10 de jan. de 2027 → 17 de jan. de 2027, estadia de 7 dias, "4 / 4 assentos", preço "a partir de USD 1,000.00 por passageiro"), condizente com o filtro aplicado.

Screenshots capturados durante a execução: `.playwright-mcp/01-home.png`, `.playwright-mcp/02-home-alpha-selected.png`, `.playwright-mcp/03-results-alpha.png`.

## Status
**Passou com observação**

## Observações
- O texto de subtítulo dos resultados exibiu a palavra "Base" duplicada: "Base Base Lunar Alpha" (esperado seria apenas "Base Lunar Alpha"). Não está claro na documentação se esse é o texto pretendido; registrado como possível divergência de texto na interface, sem correção da documentação por conta própria.
- A única missão retornada para a Base Lunar Alpha já estava com todos os assentos ocupados ("4 / 4 assentos"), porém a interface ainda exibia o link/ação "Reservar" habilitado para essa missão. A regra de negócio da funcionalidade "Busca de Missões" prevê que missões esgotadas permaneçam visíveis, porém identificadas como "Esgotado" e sem possibilidade de reserva (RF-04). Nenhum rótulo "Esgotado" foi observado nesta execução. Como o escopo deste caso de teste é apenas o fluxo principal do RF-01, esse ponto não foi aprofundado aqui, mas fica como atenção prioritária para o caso de teste de RF-04.
- Este caso de teste cobriu apenas o caminho pelo formulário da página inicial, com uma única base selecionada. O caminho alternativo citado no RF-01 (busca iniciada pelo destaque de uma base lunar específica) e a seleção de múltiplas bases não foram exercitados e ficam para casos de teste futuros.
