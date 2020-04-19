import * as React from "react";
import Sidebar from "../../components/sidebar";
import Content, { A, P, SectionHeader, Ref } from "../../components/content";

import Head from "next/head";

export const title = "Automatic Product Analytics";
export const description =
  "Analytics within early stage products, like the product itself, are necessarily iterative. What if you could scaffold event reporting from the core business logic?";
export const date = "April 14 2020";

const code1 = `ApolloLink.make((operation, forward) => {
  forward(operation)
  ->ApolloLink.Observable.map(data => {
      onOperation(operation, data);
      data;
    })
  ->Js.Option.some
})`;

const AutomaticAnalytics = () => (
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
            Analytics within early stage products can present a complex
            cost-benefit analysis.
          </P>
          <P>
            The benefits of an analytics implementation are numerous and already
            written about at length. In short, Although not a substitute for
            direct user feedback or decisive vision, analytics can inform the
            most valuable next steps to take with a product in identifying what
            and how features are being used and where "drop off" occurs.
            Additionally, analytics can serve as a rudimentary "sanity check"
            for core user flows in absense of sophisticated QA processes or
            integration tests <Ref id="1" />.
          </P>
          <P>
            The costs of analytics implementatons are less widely acknoledged.
            Implementations tend to be underfined, fragile, and iterative.
            Business owners understandably approach the problem at a high level,
            while engineering is often left on its own and derive dozen of
            individual events with specific properties. If the product is later
            stage, there might be a product manager in the middle that can
            successfully extract or otherwise formulate the scope of what should
            be tracked. In either case, the initial implementation will have to
            change in response to product change or recalibration in what or how
            user behavior should betracked. Maintenence is error-prone, as
            events requiring specific data must be triggered at specific times,
            while remaining historically consistent as the code base and product
            changes around the implementation.
          </P>
          <P>
            I've repeatedly encountered issues of the kind detailed above when
            building and maintaining analytics implementations within early
            stage products. Instead of manually defining and reporting events,
            what if we could automatically derive a tracking scheme from the
            business logic and implementation details of the application itself?
          </P>
          <SectionHeader title={"GraphQL Autotrack"} />
          <P>
            "Autotrack" analytics implementations are not a new idea. The most
            widespread approach is to derive events from user interactions with
            the application interface. The problems with an autotrack
            implementation of this type include reliability, data integrity, and
            security concerns <Ref id="2" />. Instead of driving "autotrack"
            logic at the user interface level, we can leverage GraphQL, a
            structured API query framework used within modern web applications,
            in order to drive "autotrack" at the level of core application
            logic.
          </P>
          <P>
            In context of analytics, leveraging the existing GraphQL
            implementation within a codebase has several advantages. GraphQL is
            declarative. User actions are modeled as independent operations that
            closely match how a user is interacting with your application. For
            example, when a user views their homescreen, the application will
            trigger something like a <code>Query HomeScreen_v1</code>. When the
            user takes an action that updates some state, the application will
            trigger something like a <code>Mutation CreateNote_v1</code>.
            Capturing, transforming, and reporting these operations as analytics
            events appoximates a comprehensive tracking plan with little effort.
            By extending your applications core network layer logic, analytics
            events are always synchronized with product functionality.
          </P>
          <P>
            Nothing in this world is a "silver bullet", however. Not all user
            actions are captured as GraphQL operations, e.g. input focus events.
            This means you will have to either manually track these exceptions,
            or introduce a complementary UI-based autotrack approach.
          </P>
          <SectionHeader title={"Implementation"} />
          <P>
            At its core,{" "}
            <A href="https://github.com/javamonn/trashed/tree/master/packages/apollo-link-analytics">
              the implementation today
            </A>{" "}
            is a simple Apollo middleware component that looks like the
            following:
          </P>
          <pre className="overflow-x-auto">{code1}</pre>
          <P>
            This is combined with logic in the consumer to optionally transform
            the GraphQL operations before delivering them to your product
            analytics provider of choice.
          </P>
          <P>
            The approach has worked well within the couple of projects I've
            integrated it into, and I intend to add more functionality to it
            over the coming months. In particular, I'd like to add support for a
            client-side only resolver
            <Ref id="3" /> for a <code>Mutation CreateEvent</code> operation,
            with the goal being to enable manual instrumentation through a
            unified interface for events that you want to track that are not
            otherwise coupled to GraphQL operations.
          </P>
          <aside>
            <SectionHeader title={"Notes"} />
            <ol>
              <li id="note-1">
                For example, if your analytics tell you that your daily new user
                conversions have dropped by 30%, it is worth checking
                exhaustively in order to ensure that the flow is not broken.
              </li>
              <li id="note-2">
                <A href="https://mixpanel.com/blog/2019/03/05/codeless-analytics-problems/">
                  https://mixpanel.com/blog/2019/03/05/codeless-analytics-problems/
                </A>
              </li>
              <li id="note-3">
                Apollo's support for{" "}
                <A href="https://www.apollographql.com/docs/react/data/local-state/#local-resolvers">
                  client-side resolvers
                </A>{" "}
                is greatly under-appreciated. Most commonly used for mocking
                when writing automated tests for data-connected components, they
                can be used for everything from complex local-state management
                (like React Context or Redux) to providing an abstracted
                interface over foreign APIs. In one application I was working
                in, the team eventually went as far as to{" "}
                <A href="https://github.com/Zimbra/zm-api-js-client">
                  write a local resolver to abstract a SOAP API
                </A>
                .
              </li>
            </ol>
            <P>
              If you have thoughts, feedback, or comments about this post,
              please contribute to the discussion{" "}
              <A href="https://github.com/javamonn/javamonn.com/issues/1">
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

export default AutomaticAnalytics;
