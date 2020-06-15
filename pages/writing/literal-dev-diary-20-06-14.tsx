import * as React from "react";
import Sidebar from "../../components/sidebar";
import Content, { A, P, SectionHeader, Ref } from "../../components/content";
import Code from "../../components/code";

import Head from "next/head";

export const title = "Literal Dev Diary - June 14th, 2020";
export const description =
  "My decision to write weekly updates. Project context. New annotation flow and tag transactions.";
export const date = "June 14 2020";

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
            I want to take a step back every so often from the day to day work I
            do on Literal in order to reflect on what got done during the week
            and evaluate the direction I want to move things. On one hand this
            furthers the{" "}
            <A href="https://github.com/javamonn/literal">
              open source approach
            </A>{" "}
            I'm taking with the project in general, but on the other hand at
            this early stage, the primary function of these posts will be as a
            place for me to log progress. In this, I am clearly inspired by the
            similar{" "}
            <A href="https://pioneer.app/tournament">Pioneer framework</A>, and
            though I have no immediate plans to participate, I think the
            practice of weekly "updates" is a beneficial one to adopt for
            myself. I intend for these to be written in a relatively informal
            voice, relatively quick to write, and cover both the technical and
            non-technical aspects of product development.
          </P>
          <SectionHeader title="Context" />
          <P>
            First, as this is my first time writing about Literal, it's worth
            establishing some context. Literal is a textual annotation
            management system. Literal is <i>not</i> a general purpose
            note-taking application, and instead is specifically designed for
            capturing, organizing, and contextualizing textual annotations.
          </P>
          <P>
            As Literal is a side-project that scratches a very personal itch, my
            personal user story is as follows:
          </P>
          <ol>
            <li>
              I am reading text on my phone. In the "time before COVID-19", this
              usually took the form of reading a PDF document (currently,{" "}
              <A href="https://www.amazon.com/Civilization-Capitalism-15th-18th-Century-Vol/dp/0520081145">
                Braudel's "Civilization and Capitalism"
              </A>
              ) during my 45 minute subway commute to and from my real job.
              Lately, this has instead taken the form of reading on my phone in
              bed.
            </li>
            <li>
              A sentence or paragraph is important to me, so I highlight it.
            </li>
            <li>
              I take a screenshot of the highlight and use the Android share
              action menu to share it to Literal. Literal parses the text from
              the image and creates an annotation. I can further organize and
              contextualize the annotation by tagging it.
            </li>
            <li>
              Later, I can search for a specific annotation by text or source,
              or browse related ideas (i.e. annotations) across contexts (i.e.
              sources) through tags.
            </li>
          </ol>
          <P>
            I will spend more time elaborating goals and non-goals of the
            project as I further develop it — the project itself should serve as
            the manifesto — but hopefully this user story serves as useful
            context while the house is still being built. Additionally, the{" "}
            <A href="https://literal.io/">landing page</A> and{" "}
            <A href="https://github.com/javamonn/literal">README</A> have more
            words. Finally, it's worth mentioning that Literal is strictly a
            personal side project, and that the pace of development reflects
            that. Currently, I'm lucky if I get in 15 hours per week of work in
            across mornings and weekends. In the coming weeks I will transition
            out of my current role in favor of part-time contract work (get in
            touch!) and will have more time to spend on Literal. With this
            context in mind, my notes and thoughts for the week follow.
          </P>
          <SectionHeader title="New Annotation Flow" />
          <P>
            The first flow I built into Literal was the flow for creating an
            annotation via the Android share action. This handles what I imagine
            to be the most common scenario, where a user is reading text in an
            external application and wants to record it into Literal. This week,
            I extended the functionality so that there's also a flow for
            creating new annotations from <i>within</i> Literal:
          </P>
          <div className="flex flex-row flex-wrap items-center justify-center">
            <img
              className="mw5 flex-none mh3 mv3"
              src="/literal-dev-diary-20-06-14/screenshot-1.png"
            />
            <img
              className="mw5 flex-none mh3 mv3"
              src="/literal-dev-diary-20-06-14/screenshot-2.png"
            />
            <img
              className="mw5 flex-none mh3 mv3"
              src="/literal-dev-diary-20-06-14/screenshot-3.png"
            />
          </div>
          <SectionHeader title="Tag Transactions" />
          <P>
            I am currently working on the tagging system for annotations. An
            annotation (i.e. the highlighted piece of text from a source
            document) has a many to many relationship with tags. Tags are not a
            new user experience and Literal's initial version does not re-invent
            any significant wheels. I'm still in the weeds with backend and data
            plumbing, but expect some screenshots of the flow in the next week
            or so.
          </P>
          <P>
            Literal is built with{" "}
            <A href="https://aws.amazon.com/amplify/">AWS Amplify</A>. It's my
            second time using Amplify (
            <A href="https://trashed.today/">trashed</A>, a previous
            side-project, being the first), and I have many thoughts about it
            that I'll save for a dedicated post, but the primary thing to be
            aware of here is how Amplify treats the API and database. Amplify
            exposes a GraphQL API for your front-end application. As the
            developer, you write the GraphQL SDL that defines the type, shape,
            and access patterns of data that you want to expose in your API, and
            Amplify automatically generates the required set of GraphQL
            resolvers for that API against DynamoDB. Literal's SDL can be seen{" "}
            <A href="https://github.com/javamonn/literal/blob/0a4ad4e744e0b69f5e8762ce181e07982ff61f28/packages/backend/amplify/backend/api/literal/schema.graphql">
              here
            </A>
            .
          </P>
          <P>
            The vast majority of the time, this framework works without
            intervention, e.g. I can add a new top level model type to the
            GraphQL SDL, and Amplify generates the required set of permissioned
            CRUD resolvers along with all the CloudFormation templates necessary
            for the DynamoDB table, AppSync configuration, IAM policies, etc. In
            particular cases, as was the case this week with tags, I have to
            pull the curtain back and write some of this logic myself.
          </P>
          <P>
            The many to many relationship associating tags with annotations
            involves managing 3 different DynamoDB tables - Tag, Highlight, and
            HighlightTag <Ref id="1" />, the join table in the middle. I wanted
            to be sure that the relationships between the tables was properly
            constrained as records were added and removed as the result of
            user-level edits.
          </P>
          <P>
            DynamoDB supports{" "}
            <A href="https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_TransactWriteItems.html">
              write transactions
            </A>
            , but there's currently no "native" support for leveraging the
            functionality within Amplify. To add a GraphQL mutation backed by a
            TransactWriteItems to the appropriate DynamoDB tables, I had to do
            the following:
          </P>
          <ol>
            <li>
              <A href="https://github.com/javamonn/literal/blob/0a4ad4e744e0b69f5e8762ce181e07982ff61f28/packages/backend/amplify/backend/api/literal/schema.graphql#L197-L199">
                Add the Mutation field to the SDL
              </A>
              .
            </li>
            <li>
              <A href="https://github.com/javamonn/literal/blob/0a4ad4e744e0b69f5e8762ce181e07982ff61f28/packages/backend/amplify/backend/api/literal/stacks/CustomResources.json#L30-L236">
                Add CloudFormation resources for the custom AppSync resolver and
                IAM policy to grant access to all of the required tables
              </A>
              .
            </li>
            <li>
              Add the AppSync resolver{" "}
              <A href="https://github.com/javamonn/literal/blob/0a4ad4e744e0b69f5e8762ce181e07982ff61f28/packages/backend/amplify/backend/api/literal/resolvers/Mutation.updateHighlightAndTags.req.vtl">
                request
              </A>{" "}
              and{" "}
              <A href="https://github.com/javamonn/literal/blob/0a4ad4e744e0b69f5e8762ce181e07982ff61f28/packages/backend/amplify/backend/api/literal/resolvers/Mutation.updateHighlightAndTags.req.vtl">
                response
              </A>{" "}
              templates, which do the bulk of the work in getting GraphQL and
              DynamoDB to speak to eachother.
            </li>
          </ol>
          <P>
            I did similar work for a couple of other custom mutation fields I
            required. It's important to recognize that "pulling back the
            curtain" or "unwrapping the black box" is even possible in Amplify.
            It's a little painful to be sure (Automatically generated
            CloudFormation templates? A restricted template language for
            business logic?) but it's <i>possible</i>. Highly managed services
            like Amplify commonly lock the developer into a particular level of
            abstraction that is completely opaque - Firebase is an example of
            such a service.
          </P>
          <SectionHeader title="Wrapping Up" />
          <P>
            That's all for this week. Next week, I hope to share some
            screenshots of what the application currently looks like, handling
            DynamoDB change streams in Lambda, and the beginning of the tags as
            contexts user experience.
          </P>
          <aside>
            <SectionHeader title="Notes" />
            <ol>
              <li id="note-1">
                In the code, "annotations" are called "highlights" but I'll
                invariably use the former when writing about it in English. I'm
                not sure which makes more sense.
              </li>
            </ol>
            <P>
              If you have thoughts, feedback, or comments about this post,
              please contribute to the discussion{" "}
              <A href="https://github.com/javamonn/javamonn.com/issues/2">
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
