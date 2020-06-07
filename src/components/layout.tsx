/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import clsx from 'clsx';
import Shortcut from './shortcut';

import './reset.css';
import './theme.css';

import styles from './layout.module.css';
import SEO from './seo';
import Badge from './badge';

const shortcodes = { Shortcut };

const Nav: FunctionComponent = () => {
  return (
    <nav className={clsx(styles.block, styles.nav)}>
      <ul className={styles.navList}>
        <li>
          <Link to="/">home</Link>
        </li>
        <li>
          <Link to="/work">work</Link>
        </li>
        <li>
          <Link to="/posts">posts</Link>
        </li>
      </ul>
    </nav>
  );
};

interface PageProps {
  path: string;
  pageContext: {
    frontmatter: {
      type: 'post' | 'page';
      title: string;
      status?: 'draft' | 'published';
    };
  };
}

const Layout: FunctionComponent<PageProps> = ({
  children,
  path,
  pageContext,
}) => {
  const { frontmatter } = pageContext || {};

  const isPost = frontmatter?.type === 'post';
  const isDraft = isPost && frontmatter?.status !== 'published';

  return (
    <div>
      <SEO title={frontmatter?.title} />

      <Nav />

      <header className={clsx(styles.block, styles.header)}>
        <h1>{`~${path}`}</h1>

        {isDraft && <Badge style="warning">{frontmatter?.status}</Badge>}
      </header>

      <main className={clsx(styles.block, styles.main)}>
        <MDXProvider components={shortcodes}>{children}</MDXProvider>
      </main>

      {isPost && (
        <section className={clsx(styles.block, styles.postFooter)}>
          <ul>
            <li>
              Did I make a mistake? Submit a{' '}
              <a href="https://github.com/blake-mealey/chimerical-garden/tree/master/content/posts">
                Pull Request
              </a>{' '}
              to make an edit!
            </li>

            <li>
              Question or comment? Let me know on{' '}
              <a href="https://twitter.com/blakemdev">Twitter</a>!
            </li>
          </ul>
        </section>
      )}
    </div>
  );
};

export default Layout;
