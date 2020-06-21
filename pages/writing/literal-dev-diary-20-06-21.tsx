import * as React from "react";
import Sidebar from "../../components/sidebar";
import Content, {
  A,
  P,
  SectionHeader,
  Ref,
  Blockquote,
} from "../../components/content";

import Head from "next/head";

export const title = "Literal Dev Diary - June 21st, 2020";
export const description =
  "Initial tags release and next steps. Cleaning up orphaned tags. W3C Web Annotations.";
export const date = "June 21 2020";

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
            This week I cut a{" "}
            <A href="https://github.com/javamonn/literal/releases/tag/v1.0.0-alpha.2">
              release
            </A>{" "}
            adding tagging support to highlights. What is currently implemented
            is basic tag management functionality. The next item on the roadmap
            is an interface for actually <i>making use</i> of the tags - seeing
            highlights within the same tag and visualizing relationships between
            tags.
          </P>

          <P>
            In terms of the product manifesto and vision as stated on the{" "}
            <A href="https://literal.io">landing page</A>, tags are
            fundamental:
          </P>

          <Blockquote>
            Contextualize and associate.
            <br />
            <br />
            Ideas do not exist in isolation. Ideas are threads that span
            otherwise disparate contexts. Annotations organized strictly by
            their original source is an artificial limitation. Create bridges,
            not silos.
          </Blockquote>

          <P>
            I want to touch up the visual design of the current tag management
            functionality, and I still have a couple of issues with the user
            experience as implemented, but I want to move on to getting some of
            the broader contextualization functionality in place in the coming
            weeks for now. On this front in the coming weeks I anticipate that
            I'll be moving into working more on design and evaluation rather
            than code itself.
          </P>

          <SectionHeader title="Cleaning up orphaned Tags" />

          <P>
            Tags have a many-to-many relationship with highlights. When a tag is
            removed from a highlight, we want to remove it if it no longer
            associated with any highlights. From a product perspective,
            anticipating some of the future tag-centric functionality I
            mentioned above, "orphaned" tags should be excluded for obvious
            reasons.
          </P>

          <P>
            As I mentioned{" "}
            <A href="https://javamonn.com/writing/literal-dev-diary-20-06-14">
              last week
            </A>{" "}
            , highlight and tag updates are transactional. The client issues a
            single <code>Mutation</code> describing the set of changes that it
            wants to apply to the highlight and associated tags, and AppSync
            performs a <code>TransactionWriteItems</code> operation to fulfill
            it. In the course of this update mutation, we may end up
            disassociating one or more tags from a highlight, causing those tags
            to potentially become orphaned unless we delete the tag as well.
          </P>

          <P>
            In moving to implement this clean-up behavior, I found that there
            wasn't a way to accomplish this directly within AppSync. The problem
            is as follows:
          </P>

          <ul>
            <li>
              AppSync has "linear" resolvers. An incoming GraphQL Mutation or
              Query is mapped to one of a set of{" "}
              <A href="https://docs.aws.amazon.com/appsync/latest/devguide/resolver-mapping-template-reference-dynamodb.html">
                DynamoDB operations
              </A>{" "}
              (in this case at least <Ref id="1" />
              ). There's also a{" "}
              <A href="https://docs.aws.amazon.com/appsync/latest/devguide/pipeline-resolvers.html">
                pipeline resolver
              </A>{" "}
              , which executes several individual "linear" resolvers chained in
              a series. Both of these resolver types are statically configured
              (via CloudFormation, in the case of Amplify).
            </li>
            <li>
              In order to identify if a Tag is associated with any Highlights,
              we need to issue a <code>Query</code> against DynamoDB. If several
              Tags are removed from a Highlight in a single Mutation, we will
              need to issue more than one <code>Query</code>.
            </li>
            <li>
              AppSync has a <code>Query</code> request mapping document, but no
              way to issue more than one. <code>TransactGetItems</code> and{" "}
              <code>BatchGetItems</code> , although they both allow bulk get
              operations, do not allow for issuing query operations.
              Additionally, because pipeline resolvers are configured ahead of
              time, we can't add stages for each of the removed tags we want to
              issue a query for.
            </li>
          </ul>

          <P>
            AppSync seems to try very hard to keep resolvers performant and I
            feel like many of the constraints and apparent design shortcomings
            I've come across are direct results of this philosophy. In a way,
            AppSync feels like a logical evolution of "Serverless". Within
            AppSync, the developer is really only responsible for the business
            logic - you are no longer operating at the level of the HTTP request
            and response, or managing service connections, or even thinking
            about the run-time at all. <Ref id="2" /> On of the trade-offs with
            an environment like this is that the pasture continues to get
            smaller and smaller - something that may be possible in other
            lower-level back-end environments is no longer possible within
            AppSync.
          </P>

          <P>
            I ended up implemented the Tag cleanup behavior by subscribing a
            Lambda function to a DynamoDB stream, watching for remove operations
            on the appropriate association table, and executing some logic to
            check if the disassociated tag still had at least on association and
            if not remove it. You can see the Lambda function{" "}
            <A href="https://github.com/javamonn/literal/blob/64551e78f71a8f198ed054b10a1216840f24ccae/packages/backend/amplify/backend/function/DynamoDBStream/src/src/Index.re">
              here
            </A>
            . This is conceptually very similar to a trigger on a SQL table, and
            comes with a similar set of trade-offs.
          </P>

          <SectionHeader title="GraphQL clients on the server" />

          <P>
            Literal has a couple of Lambda functions that interface with
            DynamoDB via GraphQL, instead of directly issuing operations with
            the AWS SDK. In general, I'm a strong advocate for this approach,
            for reasons including keeping logic centralized and data consistent
            among others. Surprisingly, the Amplify JS SDK does not support
            interfacing with the AppSync GraphQL API from Lambda. The
            documentation shows examples of issuing requests against AppSync
            with lower level Node HTTP libraries, and the non-support is
            mentioned in some issues opened against the repository.
          </P>

          <P>
            I remember coming across a tweet (which I can no longer find) with a
            horror story of someone running Apollo client on a server, and
            debugging an issue they were observing down to Apollo's in-memory
            cache being utilized across connections, resulting in a combination
            of returning stale data as well as a potential security issue. I'm
            not sure if this at all affects Amplify's GraphQL client, but it's a
            highlight of the potential issues that can arise with porting a
            project designed for clients onto the server.
          </P>

          <P>
            In Literal's case, building off of the docs, it was relatively
            simple to{" "}
            <A href="https://github.com/javamonn/literal/blob/64551e78f71a8f198ed054b10a1216840f24ccae/packages/backend/amplify/backend/function/DynamoDBStream/src/src/Service/GraphQL.re">
              implement a client
            </A>
            . I'll have to revisit this if server-side rendering becomes
            prioritized.
          </P>

          <SectionHeader title="W3C Web Annotations" />

          <P>
            I came across the{" "}
            <A href="https://www.w3.org/annotation/">Web Annotation spec</A>{" "}
            this week. I had come across the spec once before, when working on
            the previous incarnation of Literal Reader <Ref id="3" />, but it
            had since fallen off of my radar.
          </P>

          <P>
            In short, Literal is an annotation management system and it will
            implement the Web Annotation spec.
          </P>

          <P>
            There are aspects of the spec that describe functionality or
            products outside of the current scope of the project, but
            regardless, building on a well thought-out and standardized data
            model is more than worth the work to back-track a bit and refactor
            the Literal data-model to be compliant, especially when the project
            is as early stage as it currently is. I'm aiming for close
            compatibility with the spec, with small changes to better support
            GraphQL (e.g. making the full object available in all cases, instead
            of just the ID) and support for DynamoDB index and query patterns.
          </P>

          <P>
            I'll probably spend some time writing about the spec in more detail
            as I start implementing it within Literal.
          </P>

          <aside>
            <SectionHeader title="Notes" />
            <ol>
              <li id="note-1">
                AppSync also supports resolvers backed by various other services
                - ElasticSearch, Lambda, HTTP, RDS.
              </li>
              <li id="note-2">
                AppSync resolvers are written in{" "}
                <A href="https://velocity.apache.org/">Apache Velocity</A>,
                which AWS executes in Java, but you don't need to think about
                that.
              </li>
              <li id="note-3">
                I'll write about Literal Reader and what I think went wrong with
                the project some other time. In short, I was trying to solve a
                similar problem to what I am working on now, but approached it
                from a bottom up perspective in building the PDF reader itself
                before building the annotation management system on top of it.
              </li>
            </ol>
            <P>
              If you have thoughts, feedback, or comments about this post,
              please contribute to the discussion{" "}
              <A href="https://github.com/javamonn/javamonn.com/issues/4">
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
