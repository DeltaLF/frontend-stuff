import LoadingWrapper from '../LoadingWrapper';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

describe('test LoadingWrapper component', () => {
  it('successfully fetched string data and then rendered it', async () => {
    const strData = 'data';
    render(
      <LoadingWrapper<string>
        loadData={() =>
          new Promise((res) => {
            setTimeout(() => {
              res(strData);
            }, 1);
          })
        }
        renderData={(data: string) => {
          return <div>{data}</div>;
        }}
      />
    );
    expect(screen.getByText('loading effect')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('loading effect')).not.toBeInTheDocument();
      expect(screen.getByText(strData)).toBeInTheDocument();
    });
  });
  it('successfully fetched number data and then rendered it', async () => {
    const numData = 1000;
    render(
      <LoadingWrapper<number>
        loadData={() =>
          new Promise((res) => {
            setTimeout(() => {
              res(numData);
            }, 1);
          })
        }
        renderData={(data: number) => {
          return <div>{data}</div>;
        }}
      />
    );
    expect(screen.getByText('loading effect')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.queryByText('loading effect')).not.toBeInTheDocument();
      expect(screen.getByText(numData)).toBeInTheDocument();
    });
  });

  it('failed to fetch data and then rendered the error message ', async () => {
    const strError = 'something went wrong';
    render(
      <LoadingWrapper<string>
        loadData={() =>
          new Promise((_, rej) => {
            setTimeout(() => {
              rej(strError);
            }, 1);
          })
        }
        renderData={(data: string) => {
          return <div>{data}</div>;
        }}
      />
    );
    await waitFor(() => {
      expect(screen.queryByText('loading effect')).not.toBeInTheDocument();
      expect(screen.getByText(strError)).toBeInTheDocument();
    });
  });
});
