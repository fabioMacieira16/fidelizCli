import React from 'react';

import { BoxAll, Main, Fidelizar, LogoFidelizar, FidelizarLink } from '../../styles/pattern/box-all';

import Logo from '../../assets/img/logo.png';
import { Img, TextByFidelizarMais } from '../../styles/byFidelizarMais/by-fidelizar-mais';
import FidelizarMais from '../../assets/img/fidelizarMais.png';

export default function ByFidelizarMais() {
  return (
    <Main marginBottom="2rem" top="4rem">
      <BoxAll
        flexDirection="column"
        alignItems="center"
        display="flex"
      >
        <TextByFidelizarMais
          margin="2em 1rem"
          align="center"
          size="1rem"
          height="1.5rem"
        >
          Programa de fidelidade desta loja é administrado por Fábio Macieira.
        </TextByFidelizarMais>
        <Img src={FidelizarMais} />
        <FidelizarLink
          href="https://google.com.br/"
          rel="noreferrer noopener"
          target="_blank"
        >
          Macieira Corporation
        </FidelizarLink>
        <TextByFidelizarMais margin="1rem" weight="bold" size=".9rem">
          Verão 1.0
        </TextByFidelizarMais>
        
        <TextByFidelizarMais weight="bold" size=".9rem">
          &#169; 2022 a 2022
        </TextByFidelizarMais>
        ]
        <TextByFidelizarMais weight="bold" size=".9rem">
          Todos os direitos reservados
          <FidelizarLink href="https://fidelizarmais.co/" rel="noreferrer noopener" target="_blank">
            <LogoFidelizar src={Logo} alt="Logo da Fidelizar Mais" />
            Macieira.com
          </FidelizarLink>
        </TextByFidelizarMais>
      </BoxAll>
    </Main>
  );
}