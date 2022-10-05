import React from 'react';
import ReactDOM from 'react-dom/client';

import MapirStyleEditor from '../src';

function App() {
  return (
    <div
      style={{
        width: '95vw',
        height: '95vh',
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
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjVkNmVmYWQ5MTFkNjhhNThjNmQ5YjBiMjczZjM0NGZmMzU3YTJlOWRiODhiZjdlM2JlZjdmZjYyN2Y3OTFjY2MxMGU4MmE4OTBmYjc4NDJiIn0.eyJhdWQiOiIxIiwianRpIjoiNWQ2ZWZhZDkxMWQ2OGE1OGM2ZDliMGIyNzNmMzQ0ZmYzNTdhMmU5ZGI4OGJmN2UzYmVmN2ZmNjI3Zjc5MWNjYzEwZTgyYTg5MGZiNzg0MmIiLCJpYXQiOjE2NjQ5NjQ3MDUsIm5iZiI6MTY2NDk2NDcwNSwiZXhwIjoxNjY0OTY4MzA1LCJzdWIiOiI5YmY2NjkyOS0xOWMxLTRiOWUtODFiNS03Y2Y5OThiN2I0YjIiLCJzY29wZXMiOlsiYmFzaWMiLCJteTphZG1pbiJdfQ.OmyhfXHeDZEPqWsDtAsG0oUjG0H-dY9KVKxc4xyu3vcZK1DkMLjalHnRk9hbdnC3xKY0IvXmU3RNY8iipqq7PiO-wqp_wRvmxNjlLPY1ReeSyvDWI4YbNzoo8AbfZXPwgc2xh6U0igdvYNnYd-apLAGz5HInsYAeO_W-Tbq455u4zBkPaG8gFLxemAT2Tq3uF6aSaZRWNgKPBOF45E0tztwx9aNoG1n2XpmWeCYE038kJcIRDKlji1I707jclldes7g0xp7ojxcJMekFEv9zrpsphdV3EixXAOfkm8Eelf8dFfrdTGSruhEHXpCBC6HbZPnAWB1QwA6YOZxVkj8Z4A',
                  'x-api-key':
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijc4ZGQ1MTRmMjNkYTk2NmUxZWQ4MmU3ZGFhNDU3NmU0OGIyNTA5Y2QyN2VlNWY3YTcyNGE1MDhhYTE0MDliYmI3YmU3ZTRlYjE4MTRiOTdlIn0.eyJhdWQiOiIxNDkiLCJqdGkiOiI3OGRkNTE0ZjIzZGE5NjZlMWVkODJlN2RhYTQ1NzZlNDhiMjUwOWNkMjdlZTVmN2E3MjRhNTA4YWExNDA5YmJiN2JlN2U0ZWIxODE0Yjk3ZSIsImlhdCI6MTYxNDY5MTAyMiwibmJmIjoxNjE0NjkxMDIyLCJleHAiOjE2MTcxOTMwMjIsInN1YiI6IiIsInNjb3BlcyI6WyJiYXNpYyJdfQ.nUJZ6yinVoYvi9ryiXwhgKsSBXoNiiSR_aR_z2-x0UMoVbdQhwJZFP7G4Kxu36qAlgypdDvuu0FBgig_m_N45f7P6APRfpfWgo1BUUzqCUCr0O47GsPz4TZw5UHtRtlEVTbVi7D3286i7uiG1xz7DhdgEQYUwexTY1XnTZEsZB2u6tTBQm9IYTsROyGUF_aMfZQdWAuxArhpGYTqAZdCed8m5mY1JtGX7W92yeFWDni08DmpWESmDB83b4I6yND_eNoaYZFQheXE3uI2XrHeWNnQX5Hctp8hY94y7xZmKajw1iV_GQbI4cSgmDm4g5f31-_wdIKkLQiTIgljlVYbSg',
                },
              };
            }
          },
        }}
        styleURL="https://my-dev.map.ir/share/d2093721-e89d-4549-a65d-db7039a0d60a/api/mym/styles/data/style_9bf66929-19c1-4b9e-81b5-7cf998b7b4b2_80125ac0-7c52-45b9-a671-f02b2f3e8f3e.json"
        title="تنظیمات استایل"
      />
    </div>
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
