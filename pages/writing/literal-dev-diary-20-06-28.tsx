import * as React from "react";
import Sidebar from "../../components/sidebar";
import Content, { A, P, SectionHeader, Ref } from "../../components/content";

import Head from "next/head";

export const title = "Literal Dev Diary - June 28th, 2020";
export const description = "DOTADIW and the roadmap to MVP.";
export const date = "June 28 2020";

const DevDiary = () => (
  <>
    <Head>
      <title>{title} ■ javamonn</title>
      <meta key="description" name="description" content={description} />
    </Head>
    <div className="bg-white sans-serif vh-100 vw-100 flex">
      <Sidebar />
      <Content>
        <header className="flex flex-column flex-row-l justify-between-l items-center-l">
          <h3 className="i f3 mb2 mb0-l ma0">{title}</h3>
          <time className="f5">{date}</time>
        </header>
        <hr className="b--black" />
        <article className="f4 lh-copy">
          <P>
            This week my focus was to resolve several issues within what is
            currently the core feature in Literal - creating an annotation from
            a screenshot. There remain several improvements that I'd like to
            make, but the bugs fixed this week include:
          </P>
          <ul>
            <li>tag editor broken on android</li>
            <li>
              when an annotation is created, display the annotation with the
              final edited text, rather than the initial text we parsed from the
              screenshot
            </li>
            <li>
              do not display a notification if the annotation was deleted as
              part of the creation flow
            </li>
            <li>
              improvements to loading: increased speed, display splash screen on
              boot and skeletons when loading data
            </li>
            <li>in tag autocomplete, do not display duplicates</li>
            <li>
              when associating a tag, check if it's in cache to determine if we
              need to create it
            </li>
            <li>
              improvements to error handling: if an image cannot be parsed to an
              annotation (a more common error case currently than I'd like),
              route to the annotation text editor and display an error message
            </li>
          </ul>
          <P>
            I want Literal to do one thing and do it well - textual annotation
            management. In this, I will continue to invest time over the coming
            weeks to polish the core flows. I do not perceive this need for
            depth as mutually exclusive with conventional startup philosophy of
            shipping a minimum viable product (MVP) and iterating, but I do feel
            that far too many make the mistake of ignoring the "viable" (and in
            some cases, even the "product" <Ref id="1" />) part of a "minimum
            viable product".
          </P>
          <P>
            I will codify this directly within Github, but the high-level
            roadmap I perceive as to what needs to happen to bring Literal to an
            MVP and initial release is as follows:
          </P>
          <ul>
            <li>
              Improve the screenshot parser. Currently the implementation is
              heavily biased towards the relatively limited diversity of
              training set data, and frequently misapplies crops in screenshots
              made within PDF readers.
            </li>
            <li>
              Implement the W3C Web Annotations specification as the core API.
            </li>
            <li>
              Implement a targeted set of tag contextualization functionality:
              view annotations organized by tag and related tags.
            </li>
          </ul>
          <P>
            Of course there is functionality I intend to support beyond what's
            indicated above, but this list captures what I think needs to happen
            to have a minimum viable product and something that's worth
            circulating and soliciting feedback on.
          </P>
          <P>
            Finally, here's a short video that shows the core creation flow as
            it exists today, and some of the potential areas of improvement:
          </P>
          <div className="flex flex-row items-center justify-center">
            <video
              className="mw6 flex-none"
              src="/literal-dev-diary-20-06-28/screenshare-1.mp4"
              controls
            />
          </div>
          <aside>
            <SectionHeader title="Notes" />
            <ol>
              <li id="note-1">
                There's too much thought-leadership and analysis of this
                already, but{" "}
                <A href="https://xn--mp8hai.fm/">https://xn--mp8hai.fm/</A> is
                the logical end-state of traditional MVP culture meets venture
                capital meets hype cycles on social media. This specific case
                was very well intentioned, but there are plenty of others that
                are not, whether explicitly (e.g. Theranos) or implicitly (e.g.
                vaporware in general).
              </li>
            </ol>
            <P>
              If you have thoughts, feedback, or comments about this post,
              please contribute to the discussion{" "}
              <A href="https://github.com/javamonn/javamonn.com/issues/6">
                here
              </A>
              .
            </P>
          </aside>
        </article>
      </Content>
    </div>
  </>
);

export default DevDiary;
