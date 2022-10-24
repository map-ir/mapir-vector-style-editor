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
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjhmNjRkYzk4MmI3ZjRiOWI1MzMyMGUwYjFiZWNlMmQwMWI2YjdlYzA2ZThlNDMyMTY1MGUzM2FjZGU2MGMzODZjMTdlNjNjY2U1NGYxYjliIn0.eyJhdWQiOiIxIiwianRpIjoiOGY2NGRjOTgyYjdmNGI5YjUzMzIwZTBiMWJlY2UyZDAxYjZiN2VjMDZlOGU0MzIxNjUwZTMzYWNkZTYwYzM4NmMxN2U2M2NjZTU0ZjFiOWIiLCJpYXQiOjE2NjY2Mjc0MjIsIm5iZiI6MTY2NjYyNzQyMiwiZXhwIjoxNjY2NjMxMDIyLCJzdWIiOiI5YmY2NjkyOS0xOWMxLTRiOWUtODFiNS03Y2Y5OThiN2I0YjIiLCJzY29wZXMiOlsiYmFzaWMiLCJteTphZG1pbiJdfQ.pCw6Ll6aldRrlRILe324TL6AjoPBhKh54sbrHW9ntLhR3yHPAsohlTq2vOf-FH1mX7cT85nWgHyRRjCGdn_5U_pgirGyoq0CZZtPUN4vEDQg0DtFu-mtMFHumwCx_axBuJ7-s4_uUscDd2-nFFo6GSl-o-o42kgwWeumYEbfPeTQ5dIvwvy62QJbgwDIVOsnS1zcVPyzivjMs6ZtgPeJOzJ0FO15csmIEZLu8MSijLOy4oLUFPXnqG1-dxlVhKCcB7QSj1HquYaAJ7biTlqmCqQmNkpVl9Hq_aRxGYEfJbYL3_jLdRJmN2a6TxSq9bMMq26QVv9nHvDDeHdz84RPBA',
                  'x-api-key':
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijc4ZGQ1MTRmMjNkYTk2NmUxZWQ4MmU3ZGFhNDU3NmU0OGIyNTA5Y2QyN2VlNWY3YTcyNGE1MDhhYTE0MDliYmI3YmU3ZTRlYjE4MTRiOTdlIn0.eyJhdWQiOiIxNDkiLCJqdGkiOiI3OGRkNTE0ZjIzZGE5NjZlMWVkODJlN2RhYTQ1NzZlNDhiMjUwOWNkMjdlZTVmN2E3MjRhNTA4YWExNDA5YmJiN2JlN2U0ZWIxODE0Yjk3ZSIsImlhdCI6MTYxNDY5MTAyMiwibmJmIjoxNjE0NjkxMDIyLCJleHAiOjE2MTcxOTMwMjIsInN1YiI6IiIsInNjb3BlcyI6WyJiYXNpYyJdfQ.nUJZ6yinVoYvi9ryiXwhgKsSBXoNiiSR_aR_z2-x0UMoVbdQhwJZFP7G4Kxu36qAlgypdDvuu0FBgig_m_N45f7P6APRfpfWgo1BUUzqCUCr0O47GsPz4TZw5UHtRtlEVTbVi7D3286i7uiG1xz7DhdgEQYUwexTY1XnTZEsZB2u6tTBQm9IYTsROyGUF_aMfZQdWAuxArhpGYTqAZdCed8m5mY1JtGX7W92yeFWDni08DmpWESmDB83b4I6yND_eNoaYZFQheXE3uI2XrHeWNnQX5Hctp8hY94y7xZmKajw1iV_GQbI4cSgmDm4g5f31-_wdIKkLQiTIgljlVYbSg',
                },
              };
            }
          },
        }}
        // locale="en"
        styleURL="https://my-dev.map.ir/share/d2093721-e89d-4549-a65d-db7039a0d60a/api/mym/styles/data/style_9bf66929-19c1-4b9e-81b5-7cf998b7b4b2_80125ac0-7c52-45b9-a671-f02b2f3e8f3e.json"
        sprite="https://map.ir/vector/styles/main/sprite"
        title="تنظیمات استایل"
        columns={['نام استانا', 'random']}
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
