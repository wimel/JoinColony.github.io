/* @flow */

export type DocFields = {|
  locale: string,
  slug: string,
|};

export type HtmlAst = {|
  children?: Array<HtmlAst>,
  data?: {
    quirksMode: boolean,
  },
  properties?: Object,
  tagName?: string,
  type: string,
  value?: string,
|};

export type Doc = {|
  editUrl: string,
  fields: DocFields,
  frontmatter: {
    order: number,
    title: string,
    section: string,
  },
  htmlAst: HtmlAst,
  slug: string,
|};
