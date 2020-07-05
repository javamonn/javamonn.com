import * as React from "react";
import Sidebar from "../../components/sidebar";
import Content, { A, P, SectionHeader, Ref } from "../../components/content";

import Head from "next/head";

export const title = "Literal Dev Diary - July 5th, 2020";
export const description = "Web Annotations from a product and implementation perspective.";
export const date = "July 5 2020";

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
            This week, I began re-implementing Literal's data model to use the{" "}
            <A href="https://www.w3.org/annotation/">
              W3C Web Annotation specification
            </A>
            .
          </P>
          <SectionHeader title="Web Annotations from a product perspective" />
          <P>
            To be clear, my intention is to have Literal support the
            specification in a first-class way, i.e. the core GraphQL API always
            supports at least the data models as specified, and may evolve into
            a super-set of functionality as necessary. From a product
            perspective, supporting the Web Annotation spec in a first class way
            offers clear advantages. As a textual annotation management system,
            Literal's desired functionality clearly falls within the scope of
            the specification and as such can take advantage of a standardized
            data model that is explicitly designed for the problem space.
          </P>
          <P>
            Philosophically, Literal is a bridge, not a silo. Literal enables
            the creation, management, and organization of textual annotations
            and the individual should retain ownership over the annotation data
            itself. Supporting the prevailing standard for annotation data will
            enable this ownership, as individuals will be able to export data
            from Literal in an established and documented format, and import Web
            Annotation compliant data from other systems <Ref id="1" />.
          </P>
          <SectionHeader title="Web Annotations from an implementation perspective" />
          <P>
            The initial version of the GraphQL schema derived from the spec can
            be seen{" "}
            <A href="https://github.com/javamonn/literal/blob/500e57e26088e2f232ffc2a5d7a3d0cce42822a7/packages/backend/amplify/backend/api/literal/schema.graphql">
              here
            </A>
            . Currently I'm at a stage where all data models illustrated in the
            spec are captured within the schema. Next, I'll work on implementing
            custom Mutation resolvers for the core data models.
          </P>

          <P>
            It's early days as far as my overall familiarity with the spec, but
            some of my thoughts from this week are as follows:
          </P>
          <ul>
            <li>
              Models have some degree of normalization. An example of this is
              several core types (e.g. <code>Resource</code>, <code>Agent</code>
              ) can be represented as a globally-unique IRI or inlined directly
              into their referencing context. I think this makes sense when
              thinking about data as it exists outside of a DBMS, as references
              to denormalized data are difficult to resolve. In the context of
              Literal, this normalization results in the need for custom
              mutation resolvers to propagate data changes atomically.
              Additionally, in the GraphQL schema, where fields are technically
              union types of <code>ExternalIRI | InlinedResource</code>, I've
              opted to represent as the latter always, with the consumer always
              being able to request just the IRI field of the{" "}
              <code>InlinedResource</code> node if that's all they need.
            </li>
            <li>
              The core data model spec intermixes concerns around transport of
              the data. The primary example of this is within the fields on
              <code>AnnotationCollection</code> and <code>AnnotationPage</code>{" "}
              classes that support pagination. This strikes me as odd,
              especially considering that there's a separate specification for a{" "}
              <A href="https://www.w3.org/TR/annotation-protocol/">
                Web Annotation
              </A>{" "}
              that is REST-centric and would be a better place to capture or
              model these concerns. Instead, JSON-LD for transport is baked into
              the data model spec itself. In the context of Literal, and GraphQL
              APIs more broadly, there are{" "}
              <A href="https://relay.dev/graphql/connections.htm">
                established pagination specifications
              </A>{" "}
              that are competing. For Literal I'm planning to follow the fields
              and classes outlined in the Web Annotations spec in order to
              remain compliant, but never create more than one{" "}
              <code>AnnotationPage</code> for a given{" "}
              <code>AnnotationCollection</code>, and instead utilize the Relay
              connections spec in order to paginate the <code>items</code> field
              within an
              <code>AnnotationPage</code>.
            </li>
            <li>
              The spec's modeling of <code>SpecificResource</code> is neat and
              solves several problems with referencing and interfacing with
              externally hosted resources. Specifically, the{" "}
              <code>HttpRequestState</code> class stood out to me, as this
              attempts to solve a particular problem I frequently ran into with
              Literal PDF Reader i.e. how you encode the parameters required for
              accessing an external resource again in the future.
            </li>
          </ul>
          <SectionHeader title="Going Forward" />
          <P>
            I intend to continue to move forward on implementing the Web
            Annotation spec. My progress (and length of these weekly updates)
            will slow down for the next couple of weeks, as I'm in the middle of
            a cross-state move.
          </P>
          <aside>
            <SectionHeader title="Notes" />
            <ol>
              <li id="note-1">
                I'm actually not aware of other products that support the
                specification in a core way. It's a relatively recent spec
                (finalized in early 2017), but even the established products in
                the general space (e.g.{" "}
                <A href="https://web.hypothes.is/">hypothes.is</A> and{" "}
                <A href="https://www.are.na/">are.na</A>) do not appear to be
                compliant. In this case, Literal supporting the spec may be a
                product differentiator rather than enabling compatibility with
                an existing ecosystem.
              </li>
            </ol>
            <P>
              If you have thoughts, feedback, or comments about this post,
              please contribute to the discussion{" "}
              <A href="https://github.com/javamonn/javamonn.com/issues/7">
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
