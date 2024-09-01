import React, { useState } from 'react';
import { useGetList, useGetOne } from '../../src';
import { useUpdateMany, useUpdateOne } from '../../src/hooks/use-update';
import { useDeleteMany, useDeleteOne } from '../../src/hooks/use-delete';
import { useGetInfiniteList } from '../../src/hooks/use-get-infinite-list';

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
