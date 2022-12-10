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
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijg1MTYyZjAzYzcxNzU1ZDYxMjlkYjZlYWQ1ZDE0MjA1ZGY0ZDUzYjZjZTM1YTU3YjRmYjgxYWM1NTI5MThjNzk5ZGNlMGU5ZDg4ZDZkN2U0In0.eyJhdWQiOiIxIiwianRpIjoiODUxNjJmMDNjNzE3NTVkNjEyOWRiNmVhZDVkMTQyMDVkZjRkNTNiNmNlMzVhNTdiNGZiODFhYzU1MjkxOGM3OTlkY2UwZTlkODhkNmQ3ZTQiLCJpYXQiOjE2NzA2NTg1NjgsIm5iZiI6MTY3MDY1ODU2OCwiZXhwIjoxNjcwNjYyMTY4LCJzdWIiOiI5YmY2NjkyOS0xOWMxLTRiOWUtODFiNS03Y2Y5OThiN2I0YjIiLCJzY29wZXMiOlsiYmFzaWMiLCJteTphZG1pbiJdfQ.thH9AJ0ALy31itd14-Y-l9SdxbuHSQxiMeUXMoPQ__TTEdkcG1sbhWUrmaTGWaVm1-apKgLHdnyGF4jSLEQOcDShkHHYfwtF_IrwH3TXvU6_ca_ULLc4iWV11P6vUUiLaycoLXI_X__FmUiP6iAs-Ka8mT8Ii4RRAiXXZiHyfTLmwzcli0A_GAzwsVAxYxPE6RrbCqHhxlFCFYeH4AFQu9bZWf2ofvd7d495zaIcv19RYEG2GsEPTDc1dP_p7NDe2EmE2iRUQCm09u4z91GJFnqKVFH881FDrD5f_QhZaAO2uQSg2IGgnpyWdlXsMdqpReJht6fmZuHdw5LC4Ra9-g',
                  'x-api-key':
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6Ijc4ZGQ1MTRmMjNkYTk2NmUxZWQ4MmU3ZGFhNDU3NmU0OGIyNTA5Y2QyN2VlNWY3YTcyNGE1MDhhYTE0MDliYmI3YmU3ZTRlYjE4MTRiOTdlIn0.eyJhdWQiOiIxNDkiLCJqdGkiOiI3OGRkNTE0ZjIzZGE5NjZlMWVkODJlN2RhYTQ1NzZlNDhiMjUwOWNkMjdlZTVmN2E3MjRhNTA4YWExNDA5YmJiN2JlN2U0ZWIxODE0Yjk3ZSIsImlhdCI6MTYxNDY5MTAyMiwibmJmIjoxNjE0NjkxMDIyLCJleHAiOjE2MTcxOTMwMjIsInN1YiI6IiIsInNjb3BlcyI6WyJiYXNpYyJdfQ.nUJZ6yinVoYvi9ryiXwhgKsSBXoNiiSR_aR_z2-x0UMoVbdQhwJZFP7G4Kxu36qAlgypdDvuu0FBgig_m_N45f7P6APRfpfWgo1BUUzqCUCr0O47GsPz4TZw5UHtRtlEVTbVi7D3286i7uiG1xz7DhdgEQYUwexTY1XnTZEsZB2u6tTBQm9IYTsROyGUF_aMfZQdWAuxArhpGYTqAZdCed8m5mY1JtGX7W92yeFWDni08DmpWESmDB83b4I6yND_eNoaYZFQheXE3uI2XrHeWNnQX5Hctp8hY94y7xZmKajw1iV_GQbI4cSgmDm4g5f31-_wdIKkLQiTIgljlVYbSg',
                },
              };
            }
          },
        }}
        // locale="en"
        styleURL="https://my-dev.map.ir/share/6de632e8-631d-4bc1-83c0-0fc69f9f2515/api/mym/styles/data/style_9bf66929-19c1-4b9e-81b5-7cf998b7b4b2_8a79fbcd-0076-48be-a82f-ca9a84fb85c3.json"
        sprite="https://map.ir/vector/styles/main/sprite"
        title="تنظیمات استایل"
        columns={['city']}
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
