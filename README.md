# Calculadora de Preço EX - React Native

Este é um aplicativo desenvolvido em React Native para calcular o preço de tonelada em reais, com base na cotação atual do dólar. O aplicativo utiliza a navegação por pilha (stack navigation) e faz requisições para um backend para obter a cotação do dólar e calcular o preço.

## Funcionalidades

- **Exibe a cotação do dólar**: O aplicativo busca a cotação do dólar em tempo real através de uma API.
- **Cálculo de preço**: O usuário insere o valor da tonelada em dólares, e o aplicativo retorna o preço total em reais com base na cotação atual do dólar.
- **Navegação entre telas**: O aplicativo permite a navegação entre a tela principal e uma tela de venda (ainda não implementada completamente).
- **Uso de navegação por pilha**: O aplicativo utiliza a biblioteca `@react-navigation` para navegação entre telas.

## Tecnologias Utilizadas

- **React Native**: Framework para construir aplicativos móveis nativos.
- **Axios**: Biblioteca para realizar requisições HTTP.
- **React Navigation**: Biblioteca para navegação entre telas.
- **UseState e UseEffect**: React Hooks para gerenciar o estado do componente e realizar efeitos colaterais.

## Como Funciona

1. O usuário insere o valor da tonelada (em dólares).
2. O aplicativo obtém a cotação atual do dólar de uma API.
3. O preço total por quilograma é calculado com base no valor da tonelada e a cotação do dólar.
4. O resultado é exibido na tela.
5. O usuário pode navegar entre a tela inicial e uma tela de "Venda" (que ainda não foi completamente implementada).
