import React from 'react';

/**
 * @example
import React from 'react';
import {
  ToastBar, RQWrapper, ToastCustomWrapper,
  CustomUndoContent, toast,
} from 'react-query-manager';
import List from './List';

const ToastWrapper: ToastCustomWrapper = (toastProps) => {
  return (
    <ToastBar toast={toastProps} position={toastProps.position}>
      {({ icon, message }) => {
        return (
          <>
            {icon}
            {message}

            <svg
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                cursor: 'pointer',
              }}
              viewBox="0 0 24 24"
              width="15"
              height="15"
              onClick={() => {
                toast.dismiss(toastProps.id);
              }}
            >
              <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </>
        );
      }}
    </ToastBar>
  );
};

const customUndoContent: CustomUndoContent = ({ message, type, onUndo }) => {
  const buttonText = (() => {
    switch (type) {
      case 'delete-many': {
        return 'Cancel delete-many';
      }

      case 'delete-one': {
        return 'Cancel delete-one';
      }

      case 'update-many': {
        return 'Cancel update-many';
      }

      case 'update-one': {
        return 'Cancel update-one';
      }

      default: {
        return 'Undo';
      }
    }
  })();

  return (
    <div>
      <span>{message}</span>
      <button type="button" onClick={onUndo}>{buttonText}</button>
    </div>
  );
};

export default function App() {
  return (
    <RQWrapper
      isDevTools
      devToolsOptions={{
        buttonPosition: 'bottom-left',
      }}
      apiUrl="https://jsonplaceholder.typicode.com"
      apiAuthorization={() => 'Bearer 12345'}
      apiOnSuccess={(...args) => {
        console.log('apiOnSuccess: ', args);
      }}
      apiOnError={(...args) => {
        console.log('apiOnError: ', args);
      }}
      toast={{
        globalProps: {
          position: 'bottom-center',
        },
        wrapper: ToastWrapper,
        customUndoContent,
      }}
    >
      <List />
    </RQWrapper>
  );
}

* @example
import React, { useState } from 'react';
import  {
  useGetList, useGetOne, useGetInfiniteList,
  useUpdateMany, useUpdateOne,
  useDeleteMany, useDeleteOne,
} from 'react-query-manager';

const API_POSTS_RESOURCE_PATH = 'posts';

type TPost = {
  userId: string;
  id: string;
  title: string;
  body: string;
}

export default function List() {
  const [selectedPostId, setSelectedPostId] = useState<string>('');

  const queryPosts = useGetList<typeof API_POSTS_RESOURCE_PATH, TPost>({
    resource: { path: API_POSTS_RESOURCE_PATH, params: {} },
    params: { _page: 1, _limit: 5 },
  });

  const queryPost = useGetOne<typeof API_POSTS_RESOURCE_PATH, TPost>({
    resource: { path: API_POSTS_RESOURCE_PATH, params: {} },
    id: selectedPostId,
    queryOptions: { enabled: !!selectedPostId },
  });

  const updatePost = useUpdateOne<typeof API_POSTS_RESOURCE_PATH, TPost>({
    resourcePath: API_POSTS_RESOURCE_PATH,
  });

  const updatePosts = useUpdateMany<typeof API_POSTS_RESOURCE_PATH, TPost>({
    resourcePath: API_POSTS_RESOURCE_PATH,
  });

  const deletePost = useDeleteOne<typeof API_POSTS_RESOURCE_PATH, TPost>({
    resourcePath: API_POSTS_RESOURCE_PATH,
  });

  const deletePosts = useDeleteMany<typeof API_POSTS_RESOURCE_PATH, TPost>({
    resourcePath: API_POSTS_RESOURCE_PATH,
  });

  const infiniteQueryPosts = useGetInfiniteList<typeof API_POSTS_RESOURCE_PATH, TPost>({
    resource: { path: API_POSTS_RESOURCE_PATH, params: {} },
    pagination: { page: ['_page'], per_page: ['_limit', 10] },
  });

  return (
    <div
      style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}
    >
      {queryPosts.isLoading ? (
        <div>Loading List...</div>
      ) : (
        <div>
          <button
            type="button"
            onClick={() => {
              updatePosts.update({
                resourceParams: {},
                ids: [1, 2, 3],
                data: { title: 'Upd many title', body: 'Upd many body' },
              });
            }}
          >
            Update Many
          </button>

          <span style={{ display: 'inline-block', width: '15px' }} />

          <button
            type="button"
            onClick={() => {
              deletePosts.delete({
                ids: [1, 2, 3],
                resourceParams: {},
              });
            }}
          >
            Delete Many
          </button>

          {queryPosts?.data?.data?.map((post) => (
            <div
              style={{
                background: 'purple',
                padding: '5px',
                margin: '10px 0',
                color: 'white',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              key={post.id}
              onClick={() => {
                setSelectedPostId(post.id);
              }}
              role="button"
              tabIndex={0}
              onKeyPress={() => setSelectedPostId(post.id)}
            >
              {post.title}

              <button
                type="button"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();

                  deletePost.delete({
                    id: post.id,
                    resourceParams: {},
                  });
                }}
              >
                Delete
              </button>
            </div>
          ))}

          <div>
            <h1>Selected Post</h1>
            {queryPost.isLoading ? (
              <div>Loading...</div>
            ) : (
              <div>
                {queryPost.data && (
                <form
                  onSubmit={(event) => {
                    event.preventDefault();

                    const form = event.target as HTMLFormElement;
                    const title = (form.elements[0] as HTMLInputElement).value;
                    const body = (form.elements[1] as HTMLInputElement).value;

                    updatePost.update({
                      resourceParams: {},
                      id: selectedPostId,
                      data: { title, body },
                    });
                  }}
                >
                  <input
                    key={queryPost.data?.data.title}
                    defaultValue={queryPost.data?.data.title}
                    style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
                  />

                  <br />
                  <br />

                  <input
                    key={queryPost.data?.data.body}
                    defaultValue={queryPost.data?.data.body}
                    style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
                  />

                  <br />
                  <br />

                  <button
                    style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
                    type="submit"
                  >
                    Update
                  </button>
                </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {infiniteQueryPosts.isLoading ? (
        <div>Loading Infinite List...</div>
      ) : (
        <div>
          <button
            type="button"
            onClick={() => {
              infiniteQueryPosts.fetchNextPage();
            }}
            disabled={infiniteQueryPosts.isFetching}
          >
            {infiniteQueryPosts.isFetching ? 'Loading...' : 'next'}
          </button>

          <div
            style={{
              maxHeight: '420px',
              overflow: 'auto',
            }}
          >
            {infiniteQueryPosts?.data?.pages.map((page) => (
              page.data.map((post) => (
                <div
                  key={post.id}
                  style={{
                    background: 'purple',
                    padding: '5px',
                    margin: '10px 0',
                    color: 'white',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  {post.title}

                  <button
                    type="button"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();

                      deletePost.delete({
                        id: post.id,
                        resourceParams: {},
                      });
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
 */
export const Example = () => {
  return <div />;
};
