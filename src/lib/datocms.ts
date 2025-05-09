import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { print } from 'graphql';

export default async function queryDatoCMS<
  TResult = unknown,
  TVariables = Record<string, any>,
>(
  document: TypedDocumentNode<TResult, TVariables>,
  isDraft?: boolean,
): Promise<TResult> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Exclude-Invalid': 'true',
    Authorization: `Bearer ${process.env.DATOCMS_API_TOKEN}`,
  };

  if (isDraft) headers['X-Include-Drafts'] = 'true';

  const { data } = await (
    await fetch('https://graphql.datocms.com/', {
      cache:
        process.env.ENVIRONMENT === 'Development' ? 'no-store' : 'force-cache',
      next: { tags: ['datocms'] },
      method: 'POST',
      headers,
      body: JSON.stringify({ query: print(document) }),
    })
  ).json();

  return data;
}
