import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button } from 'antd';
import { useRoutes } from 'react-router-dom';

import routerConfig from './routers';
const Msg = styled.div`
  background-color: skyblue;
`;
function App() {
  const useRoutesRouterConfig = useRoutes(routerConfig);
  return (
    <div
      css={css`
        background-color: rebeccapurple;
      `}
    >
      {useRoutesRouterConfig}
    </div>
  );
}

export default App;
