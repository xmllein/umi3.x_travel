import { Toast } from 'antd-mobile';

export default function Http({
  url,
  method = 'post',
  headers,
  body = {},
  setLoading,
  setResult,
}) {
  setLoading && setLoading(true);

  const defaultHeader = {
    'Content-Type': 'application/json',
  };

  let params;
  if (method.toUpperCase() === 'GET') {
    params = undefined;
  } else {
    params = {
      headers: {
        ...defaultHeader,
        headers,
      },
      method,
      body: JSON.stringify(body),
    };
  }

  return new Promise((resolve, reject) => {
    fetch('/api' + url, params)
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          setResult && setResult(res.data);
          resolve(res.data);
        } else {
          Toast.fail(res.errMsg);
          reject(res.errMsg);
        }
      })
      .catch((err) => {
        Toast.fail(err);
        reject(err);
      })
      .finally(() => {
        setLoading && setLoading(false);
      });
  });
}
