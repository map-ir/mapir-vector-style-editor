import React from 'react';
import ReactDOM from 'react-dom/client';
import styled from 'styled-components';

import MapirStyleEditor from '../dist';

const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjdiNmRlZTA2ODk5MjgwODkyMjZmMWZlNGJiMmY1YjMzZWZlNDlhZjU0OWIwYmNmNjNlYmEzMWM3MWRjODYyNmRjYmViMGQxYjhiYWJmNGYwIn0.eyJhdWQiOiIxIiwianRpIjoiN2I2ZGVlMDY4OTkyODA4OTIyNmYxZmU0YmIyZjViMzNlZmU0OWFmNTQ5YjBiY2Y2M2ViYTMxYzcxZGM4NjI2ZGNiZWIwZDFiOGJhYmY0ZjAiLCJpYXQiOjE2NzY4MDQ1OTAsIm5iZiI6MTY3NjgwNDU5MCwiZXhwIjoxNjc2ODA4MTkwLCJzdWIiOiI5YmY2NjkyOS0xOWMxLTRiOWUtODFiNS03Y2Y5OThiN2I0YjIiLCJzY29wZXMiOlsiYmFzaWMiLCJteTphZG1pbiIsIm15OmNyZWF0b3IiXX0.OY1N_gAvMPKXMLvlwiZ8mzl8HrZUl4qxIu2f7Vjer-dYi6mBAgFNivfrH1AWy_OctEX8mcSLLcpTfw-09BCNqkSfusN803u3tzam5G0ou88Tx_9q4JelFOEh-2H-E0zD1I4e9r2WHHb3hESvN_bkgrsy4_KXflGQkgJvEFsWxZV82Hkyiq7mIYcFvjWze5JOcXfKHnCu0YV1IApiQc7TCbWKdLQtZohf2Kk_V0emD_kwTiIwbM4riSqlP167PycqwEB3GNn-hJ0fLgJDVo_N-xKYbC0pIACEC95E-6SEffP0iApdddzb9dbtZ_BybtO8izfW7BhL9eg_X3jNRGu5nQ';
function App() {
  return (
    <Container>
      <Header />
      <MapirStyleEditor
        map={{
          transformRequest: (url: string) => {
            if (url.startsWith('https://map.ir')) {
              return {
                url,
                headers: {
                  'x-api-key':
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBkZTBjZTQ5Njg2MTMwOTc0YWU2NDhkOGMwZjU5NWRhYzFlMTVhZTMzZDg1ODk1NTk2NDQwMjA4MmU3MjMzNTM5MTAyNGM5OGJmY2M3ZDU1In0.eyJhdWQiOiI5NTgxIiwianRpIjoiMGRlMGNlNDk2ODYxMzA5NzRhZTY0OGQ4YzBmNTk1ZGFjMWUxNWFlMzNkODU4OTU1OTY0NDAyMDgyZTcyMzM1MzkxMDI0Yzk4YmZjYzdkNTUiLCJpYXQiOjE1OTIyMDEyNTcsIm5iZiI6MTU5MjIwMTI1NywiZXhwIjoxNTk0NDQ3NjU3LCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.eG2UAq4zVsdnYkW7IMrJWWdXuxtT_EAVY-XiPPzgWJtMtG8vDnnsLQsajdgej1_u0bWzrZvdk2AzpQoABct9etvHTUbK8wBZn6CM7mzu3Uy5KzsR-0zbyDc0vqpfMcZekwXqgze6w8p8INlL4-ImpINrRstRDqsJWFsA2REnwUG-UUPRh6Sjz_lVbow4q975pI6ogt6P8nkcXXaJjmI3KCGXj-xtvvbnZiViUIw4Y12UDCNWb3ykzVfjVUnOcZ-Zbxi8591OZu_VKGfgt5VuNnNbUz654BQzpiiNdTcFhJdUTKsEvMJut0kU0YSX7EUwS50h_5EF32kR3abyJh7nIg',
                },
              };
            } else {
              return {
                url,
                headers: {
                  token,
                  'x-api-key':
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijc4ZGQ1MTRmMjNkYTk2NmUxZWQ4MmU3ZGFhNDU3NmU0OGIyNTA5Y2QyN2VlNWY3YTcyNGE1MDhhYTE0MDliYmI3YmU3ZTRlYjE4MTRiOTdlIn0.eyJhdWQiOiIxNDkiLCJqdGkiOiI3OGRkNTE0ZjIzZGE5NjZlMWVkODJlN2RhYTQ1NzZlNDhiMjUwOWNkMjdlZTVmN2E3MjRhNTA4YWExNDA5YmJiN2JlN2U0ZWIxODE0Yjk3ZSIsImlhdCI6MTYxNDY5MTAyMiwibmJmIjoxNjE0NjkxMDIyLCJleHAiOjE2MTcxOTMwMjIsInN1YiI6IiIsInNjb3BlcyI6WyJiYXNpYyJdfQ.nUJZ6yinVoYvi9ryiXwhgKsSBXoNiiSR_aR_z2-x0UMoVbdQhwJZFP7G4Kxu36qAlgypdDvuu0FBgig_m_N45f7P6APRfpfWgo1BUUzqCUCr0O47GsPz4TZw5UHtRtlEVTbVi7D3286i7uiG1xz7DhdgEQYUwexTY1XnTZEsZB2u6tTBQm9IYTsROyGUF_aMfZQdWAuxArhpGYTqAZdCed8m5mY1JtGX7W92yeFWDni08DmpWESmDB83b4I6yND_eNoaYZFQheXE3uI2XrHeWNnQX5Hctp8hY94y7xZmKajw1iV_GQbI4cSgmDm4g5f31-_wdIKkLQiTIgljlVYbSg',
                },
              };
            }
          },
        }}
        // locale="en"
        styleURL="https://my-dev.map.ir/share/5c0eff51-549d-4784-878f-dcd26930e8d2/api/mym/styles/data/style_9bf66929-19c1-4b9e-81b5-7cf998b7b4b2_daf888b5-1d1b-4125-8d20-04030d52fa19.json"
        sprite="https://map.ir/vector/styles/main/sprite"
        title="تنظیمات استایل"
        columns={['num', 'city']}
        getDistinctValues={(column_name) => {
          if (column_name)
            return fetch(
              `https://my-dev.map.ir/editor/tables/2ede04d2-3c8e-4c2d-bc09-2c1ab099bc4b/rows?$top=100&$apply=distinct(${column_name})`,
              {
                headers: {
                  'content-type': 'application/json',
                  token,
                  'x-api-key':
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQyY2MwNzNkNjdjOTYzMDg3NDkxYzdkNjc5NTIzNmNlZjc4NzI5MTMwZjUyYTgzN2VhMGUxZmI5MThjYTI0NTlhNWZlOTQ5OGRkYTg0YjUwIn0.eyJhdWQiOiIyMzkiLCJqdGkiOiI0MmNjMDczZDY3Yzk2MzA4NzQ5MWM3ZDY3OTUyMzZjZWY3ODcyOTEzMGY1MmE4MzdlYTBlMWZiOTE4Y2EyNDU5YTVmZTk0OThkZGE4NGI1MCIsImlhdCI6MTY1MjE2MDM3NSwibmJmIjoxNjUyMTYwMzc1LCJleHAiOjE2NTQ3NTIzNzUsInN1YiI6IiIsInNjb3BlcyI6WyJiYXNpYyJdfQ.hmnznwI4XLBwTOTQ8X4AjsTHyWt5oboR08NicRSuu8iWg3DjPOFINfVT1z4hJiLo9-E4y7yRJVup4QMAAnuX7i4-5SFz9XNzhzBcWvp2z_XNxZPD7t7IQb7IV5gp9y8QvxNPrpZI-PInam-f3wUhMnL4abUVq0Jbm2C_PBIfrYMNJvWkIwWZB_0nrB3dO34lzZUZcL_ZVml4WoSyGSSmIk-U_NxOXosRbGl7-jgXjCiYvvs21BO_5ySnCBpVU5M_RUOkGzC-5ydWr2QNxaPD3n1O5Fu-1dSuGpG8KptqtIkU44yAJXzbZN0XUCowOlt4AgfKU_ybcEzno-RbcixGFA',
                },
                method: 'GET',
              }
            )
              .then((res) => res.json())
              .then((res) => {
                return res?.value?.map((v) => v?.[column_name]).filter(Boolean);
              });
          else return Promise.resolve([]);
        }}
        onSubmit={(style) => {
          console.log('🚀 ~ file: index.tsx ~ line 46 ~ App ~ style', style);
        }}
        onCancel={(style) => {
          console.log('🚀 ~ file: index.tsx ~ line 49 ~ App ~ style', style);
        }}
      />
    </Container>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const Container = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 1em;
  overflow: hidden;
`;

const Header = styled.main`
  width: 100%;
`;
