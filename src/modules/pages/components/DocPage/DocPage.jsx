/* @flow */

import React, { Component, createElement } from 'react';
import RehypeReact from 'rehype-react';
import { withProps } from 'recompose';
import { graphql } from 'gatsby';
import slugify from 'slugify';

import type { Doc, HtmlAst, Project } from '~types';
import type { Appearance as HeadingAppearance } from '~core/Heading';

import Heading from '~core/Heading';
import Image from '~core/Image';
import Link from '~core/Link';
import DeveloperPortalLayout from '~layouts/DeveloperPortalLayout';
import DevRelCta from '~parts/DevRelCta';
import SEO from '~parts/SEO';

import Content from './Content';
import Sidebar from './Sidebar';

import styles from './DocPage.module.css';

const commonHeadingAppearanceProps: HeadingAppearance = {
  theme: 'dark',
  weight: 'medium',
};

const headingWithSize = (size: string) =>
  withProps({
    appearance: { ...commonHeadingAppearanceProps, size },
  })(Heading);

type Props = {|
  data: {
    project: Project,
    doc: Doc,
    allProject: {
      edges: Array<{
        node: {
          name: string,
        },
      }>,
    },
  },
  pageContext: {
    slugPrefix: string,
  },
|};

class DocPage extends Component<Props> {
  renderAst: (node: Object) => void;

  static displayName = 'pages.DocPage';

  static hasClassname = (element: HtmlAst, className: string): boolean => {
    return (
      !!element.properties &&
      element.properties.className &&
      element.properties.className.includes(className)
    );
  };

  static isTagName = (element: HtmlAst, tagName: string): boolean => {
    return !!element.tagName && element.tagName === tagName;
  };

  static isMethodHeading = (section: HtmlAst) => {
    return (
      section.children &&
      section.children.length === 2 &&
      DocPage.isTagName(section.children[0], 'a') &&
      DocPage.isTagName(section.children[1], 'code')
    );
  };

  constructor(props: Props) {
    super(props);

    this.renderAst = new RehypeReact({
      createElement,
      components: {
        a: withProps({
          transformUrl: this.transformInternalUrls,
          persistLocale: false,
        })(Link),
        h1: headingWithSize('large'),
        h2: headingWithSize('medium'),
        h3: headingWithSize('normal'),
        h4: headingWithSize('small'),
        h5: headingWithSize('tiny'),
        img: withProps({ project: props.data.project.name })(Image),
        // remove toc from ast
        ul: ({ ...ulProps }) =>
          ulProps.className === 'md-toc' ? null : createElement('ul', ulProps),
      },
    }).Compiler;
  }

  getElementTextValue = (node?: HtmlAst) => {
    if (node && node.children && node.children.length > 0) {
      const textValues = node.children.map(child => {
        if (child.children && child.children.length > 0) {
          return this.getElementTextValue(child);
        }
        return child.value;
      });
      return textValues.join('');
    }
    return '';
  };

  getAllImages = (node: HtmlAst, imagePaths: Array<string> = []) => {
    if (DocPage.isTagName(node, 'img') && node.properties) {
      imagePaths.push(node.properties.src);
    } else if (node.children && node.children.length > 0) {
      node.children.map(child => this.getAllImages(child, imagePaths));
    }
    return imagePaths;
  };

  getToc = (node?: HtmlAst): HtmlAst => {
    const defaultReturn = { type: 'element', tagName: 'div' };
    if (node && node.children && node.children.length > 0) {
      return (
        node.children.find(
          element =>
            DocPage.isTagName(element, 'ul') &&
            DocPage.hasClassname(element, 'md-toc'),
        ) || defaultReturn
      );
    }
    return defaultReturn;
  };

  transformInternalUrls = (href: string): string => {
    const {
      data: {
        allProject: { edges: projectNodes },
      },
      pageContext: { slugPrefix },
    } = this.props;
    let url: string = href.toLowerCase();

    // Get possible project slugs (both camelCase & lowercase for each project)
    const projectNameSlugs: Array<string> = projectNodes.reduce(
      (names, { node }) => {
        names.push(slugify(node.name), slugify(node.name, { lower: true }));
        return names;
      },
      [],
    );

    // Get the non-empty url parts
    const urlParts: Array<string> = url.split('/').filter(part => !!part);

    /*
     * Docs links within the docs are written in 1 of 2 forms:
     *     1) With locale (non-default): `/locale/projectSlug/docPageSlug/`
     *     2) Without locale (default language): `/projectSlug/docPageSlug/`
     */
    const hasLocale: boolean = urlParts.length === 3;
    const localePrefix: string = hasLocale ? `/${urlParts[0]}` : '';
    const isDocPage: boolean = projectNameSlugs.some(projectName =>
      url.startsWith(`${localePrefix}/${projectName}/`),
    );
    if (isDocPage && hasLocale) {
      url = url.replace(localePrefix, '');
    }
    // If it's a doc page and a slug prefix is configured, add the prefix to the url
    return isDocPage && slugPrefix
      ? `${localePrefix}/${slugPrefix}${url}`
      : url;
  };

  render() {
    const {
      data: { project, doc },
    } = this.props;
    if (doc.htmlAst.children) {
      doc.htmlAst.children.forEach(section => {
        if (DocPage.isTagName(section, 'h3')) {
          if (DocPage.isMethodHeading(section) && section.properties) {
            if (
              section.properties.className &&
              Array.isArray(section.properties.className)
            ) {
              section.properties.className.push(styles.methodHeading);
            } else {
              // eslint-disable-next-line no-param-reassign
              section.properties.className = [styles.methodHeading];
            }
          }
        }
      });
    }

    const toc = this.getToc(doc.htmlAst);

    const metaTitle = `${doc.frontmatter.title} - ${project.name}`;

    const seoDescription =
      (doc.htmlAst.children &&
        doc.htmlAst.children.length > 0 &&
        this.getElementTextValue(
          doc.htmlAst.children.find(child => DocPage.isTagName(child, 'p')),
        )) ||
      metaTitle;

    const seoImages = this.getAllImages(doc.htmlAst, [project.logo]);
    return (
      <DeveloperPortalLayout>
        <SEO
          title={metaTitle}
          description={seoDescription}
          images={seoImages}
          project={project.name}
          isDocPage
        />
        <div className={styles.main}>
          <div className={styles.mainInnerContainer}>
            <div className={styles.sidebar}>
              <Sidebar
                project={project}
                tableOfContents={toc}
                title={doc.frontmatter.title}
              />
            </div>
            <main className={styles.content}>
              <Content
                commonHeadingAppearanceProps={commonHeadingAppearanceProps}
                doc={doc}
                project={project}
              >
                {this.renderAst(doc.htmlAst)}
              </Content>
              <DevRelCta editUrl={doc.editUrl} />
            </main>
          </div>
        </div>
      </DeveloperPortalLayout>
    );
  }
}

export const pageQuery = graphql`
  query projectAndDocQuery($docId: String!, $projectName: String!) {
    ...singleDocFragment
    ...singleProjectFragment
    ...allProjectNamesFragment
  }
`;

export default DocPage;
