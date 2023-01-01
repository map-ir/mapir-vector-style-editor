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
                  token:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQ2OWMxOTEyNjMzNGUwMGQ2NGIwNmQ3NDY4M2JlNGEzNjNiMDc3MjhlNDhiNjE4YWU2ZGI5Y2Q1YWYxOTI2NTU4MDNhY2EwN2M1ZDFlMzM4In0.eyJhdWQiOiIxIiwianRpIjoiNDY5YzE5MTI2MzM0ZTAwZDY0YjA2ZDc0NjgzYmU0YTM2M2IwNzcyOGU0OGI2MThhZTZkYjljZDVhZjE5MjY1NTgwM2FjYTA3YzVkMWUzMzgiLCJpYXQiOjE2NzI1OTc5OTEsIm5iZiI6MTY3MjU5Nzk5MSwiZXhwIjoxNjcyNjAxNTkxLCJzdWIiOiJjNjRlNDA5Zi1iYmUxLTQ2MjEtOTExOS01YzQ2YjgzMjVhNDYiLCJzY29wZXMiOlsiYmFzaWMiLCJteTptYW5hZ2VyIl19.HM95BpUGCtBA8AwHUgaE1MsoaG0K6rqo8UKrbBww59VAbutVJB6ERMxBJgg2989G2yolMfRcaslLOL42gLZDH33urrUiTYYITTolIMzl2BQ3aZalXANpCAM68ycNNN-w0ICUD5n6LhISpnb39MxtsoCZH76WsweNVmwMzJggpp1VYKfvPchmDfc-5T-GZHkLE6EiN_foMqp-21Qb3aWzyOPGyzBEBmkTsu8DADggWOpG1_qv9dnBv_HudyTBT6YsxAL79guUOBSg70yLB2tXhCRiv1a3ojgdHeDcb5PkWs9FRIM95lmSwSB30WPulsaMo8OaFOqrtobqVKweNQdpGw',
                  'x-api-key':
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijc4ZGQ1MTRmMjNkYTk2NmUxZWQ4MmU3ZGFhNDU3NmU0OGIyNTA5Y2QyN2VlNWY3YTcyNGE1MDhhYTE0MDliYmI3YmU3ZTRlYjE4MTRiOTdlIn0.eyJhdWQiOiIxNDkiLCJqdGkiOiI3OGRkNTE0ZjIzZGE5NjZlMWVkODJlN2RhYTQ1NzZlNDhiMjUwOWNkMjdlZTVmN2E3MjRhNTA4YWExNDA5YmJiN2JlN2U0ZWIxODE0Yjk3ZSIsImlhdCI6MTYxNDY5MTAyMiwibmJmIjoxNjE0NjkxMDIyLCJleHAiOjE2MTcxOTMwMjIsInN1YiI6IiIsInNjb3BlcyI6WyJiYXNpYyJdfQ.nUJZ6yinVoYvi9ryiXwhgKsSBXoNiiSR_aR_z2-x0UMoVbdQhwJZFP7G4Kxu36qAlgypdDvuu0FBgig_m_N45f7P6APRfpfWgo1BUUzqCUCr0O47GsPz4TZw5UHtRtlEVTbVi7D3286i7uiG1xz7DhdgEQYUwexTY1XnTZEsZB2u6tTBQm9IYTsROyGUF_aMfZQdWAuxArhpGYTqAZdCed8m5mY1JtGX7W92yeFWDni08DmpWESmDB83b4I6yND_eNoaYZFQheXE3uI2XrHeWNnQX5Hctp8hY94y7xZmKajw1iV_GQbI4cSgmDm4g5f31-_wdIKkLQiTIgljlVYbSg',
                },
              };
            }
          },
        }}
        // locale="en"
        styleURL="https://my-dev.map.ir/share/9b18700b-b0e3-4f8d-ab03-f5f4bc2b9449/api/mym/styles/data/style_c64e409f-bbe1-4621-9119-5c46b8325a46_64f5088b-4212-4dcf-b256-91d07202121c.json"
        sprite="https://map.ir/vector/styles/main/sprite"
        title="تنظیمات استایل"
        columns={['province_name', 'city']}
        getDistinctValues={(column_name) => {
          if (column_name)
            return fetch(
              `https://my-dev.map.ir/editor/tables/b19d4092-5090-4f3d-a58a-f836320b5646/rows?$top=100&$apply=distinct(${column_name})`,
              {
                headers: {
                  'content-type': 'application/json',
                  token:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQ2OWMxOTEyNjMzNGUwMGQ2NGIwNmQ3NDY4M2JlNGEzNjNiMDc3MjhlNDhiNjE4YWU2ZGI5Y2Q1YWYxOTI2NTU4MDNhY2EwN2M1ZDFlMzM4In0.eyJhdWQiOiIxIiwianRpIjoiNDY5YzE5MTI2MzM0ZTAwZDY0YjA2ZDc0NjgzYmU0YTM2M2IwNzcyOGU0OGI2MThhZTZkYjljZDVhZjE5MjY1NTgwM2FjYTA3YzVkMWUzMzgiLCJpYXQiOjE2NzI1OTc5OTEsIm5iZiI6MTY3MjU5Nzk5MSwiZXhwIjoxNjcyNjAxNTkxLCJzdWIiOiJjNjRlNDA5Zi1iYmUxLTQ2MjEtOTExOS01YzQ2YjgzMjVhNDYiLCJzY29wZXMiOlsiYmFzaWMiLCJteTptYW5hZ2VyIl19.HM95BpUGCtBA8AwHUgaE1MsoaG0K6rqo8UKrbBww59VAbutVJB6ERMxBJgg2989G2yolMfRcaslLOL42gLZDH33urrUiTYYITTolIMzl2BQ3aZalXANpCAM68ycNNN-w0ICUD5n6LhISpnb39MxtsoCZH76WsweNVmwMzJggpp1VYKfvPchmDfc-5T-GZHkLE6EiN_foMqp-21Qb3aWzyOPGyzBEBmkTsu8DADggWOpG1_qv9dnBv_HudyTBT6YsxAL79guUOBSg70yLB2tXhCRiv1a3ojgdHeDcb5PkWs9FRIM95lmSwSB30WPulsaMo8OaFOqrtobqVKweNQdpGw',
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
