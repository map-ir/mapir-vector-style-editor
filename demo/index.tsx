import React from 'react';
import ReactDOM from 'react-dom/client';

import MapirStyleEditor from '../dist';

function App() {
  return (
    <main
      style={{
        width: '100vw',
        height: '100vh',
        padding: '1em',
        overflow: 'hidden',
      }}
    >
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
        styleURL="https://my-dev.map.ir/share/fab8d10d-c32a-4da8-823f-43647a0997c5/api/mym/styles/data/style_9bf66929-19c1-4b9e-81b5-7cf998b7b4b2_afc78483-3eb5-4d8f-9a56-91374d46adc2.json"
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
        }}
        onSubmit={(style) => {
          console.log('🚀 ~ file: index.tsx ~ line 46 ~ App ~ style', style);
        }}
        onCancel={(style) => {
          console.log('🚀 ~ file: index.tsx ~ line 49 ~ App ~ style', style);
        }}
      />
    </main>
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

const token =
  'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImU0MWVhMWZmMjZiMDE4YmI1ZTZlODE2NTA5ZGQ3NWZiNzI3MWRjYjVlZmNiNWVlNTBhMjk2YWM3MTQyNTQ5NzZmMDdjNmMwNDVjNmUxZmNmIn0.eyJhdWQiOiIxIiwianRpIjoiZTQxZWExZmYyNmIwMThiYjVlNmU4MTY1MDlkZDc1ZmI3MjcxZGNiNWVmY2I1ZWU1MGEyOTZhYzcxNDI1NDk3NmYwN2M2YzA0NWM2ZTFmY2YiLCJpYXQiOjE2NzMxODgxMTUsIm5iZiI6MTY3MzE4ODExNSwiZXhwIjoxNjczMTkxNzE1LCJzdWIiOiI5YmY2NjkyOS0xOWMxLTRiOWUtODFiNS03Y2Y5OThiN2I0YjIiLCJzY29wZXMiOlsiYmFzaWMiLCJteTphZG1pbiJdfQ.fuBI5g_BNm1hOPV8m_2pM-bXqGzvykh7_tlv0mpCz5VOAjsctsofKEpVSA_jIVqDlPrWPMPw1nCdlhsFeL6n7sv1EZLVJhtuQMCf-6fCEXOXBSihvFwfofDcAe4QE64l3FYKZ8dPR7BBncO3a9yu9KFaLFlLQaSFvQmZY2GHCwrb9RpMs16pZS6sYnKknFddz1GwxIH61KM56cbXDONeyGXoTHmNSlOUyXAZeWBpm7Rr6317s_Slv5BFsd7r_oji9aq3f5G_eX_HrLNLP-OKEOK-AjiatQDJCBVz-YQNgaBdT3eC_Nhqw4Xd9eohqekZmLTQ5ko83LfpJcRZE6bIgA';
