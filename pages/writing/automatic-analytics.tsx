import * as React from "react";
import Sidebar from "../../components/sidebar";
import Content from "../../components/content";

export const title = "Automatic Analytics";
export const description =
  "Analytics within early stage products, like the product itself, are necessarily iterative. What if you could scaffold event reporting from the core business logic?";
export const date = "April 14 2020";

/**
- introduce graphql autotrack, done is better than perfect
- historical attempts at ui-based autotrack, tradeoffs with a network-based approach
- next steps with graphql autotrack
 */
const code1 = `ApolloLink.make((operation, forward) => {
  forward(operation)
  ->ApolloLink.Observable.map(data => {
      onOperation(operation, data);
      data;
    })
  ->Js.Option.some
})`;

const AutomaticAnalytics = () => (
  <div className="bg-white sans-serif vh-100 vw-100 flex">
    <Sidebar />
    <Content className="pv5 f4">
      <p>
        Product analytics are essential, especially within an early stage
        product. In these circumstances, analytics can serve several purporses.
        In conjunction with direct user feedback, analytics can inform the most
        valuable next steps to take with a product in identifying what and how
        features are being used, and where drop off occurs. Analytics can serve
        as a rudimentary "sanity check" for core user flows in absense of
        sophisticated QA processes or integration tests. For example, if your
        analytics tell you that your daily new user conversions have dropped by
        30%, it is worth checking exhaustively in order to ensure that the flow
        is not broken.
      </p>
      <p>
        Like the early stage product itself, analytics implementations tend to
        be underfined, fragile, and iterative. Business owners understandably
        approach the problem at a high level, and just "want to measure how the
        app is being used", while engineering is often left on its own and
        derive dozen of individual events with specific properties. If the
        product is later stage, there might be a product manager in the middle
        that can successfully extract or otherwise formulate the scope of what
        should be tracked. In both cases, the initial implementation will likely
        change due to either recalibrations on what or how to track, or to adapt
        to changes in the product. Maintenence is error-prone, as events
        requiring specific data must be triggered at specific times, while
        remaining historically consistent as the code base and product changes
        around the implementation. In the context of engineering and QA, the
        product continues to visibly work even if the tracking has been broken
        or accidentally changed. Often times, that 30% drop in new user
        conversions is traced to an issue in the event reporting, rather than an
        issue in the flow.
      </p>
      <p>
        In my experience building analytics implementations within early stage
        products, I've repeatedly encountered issues of the kind detailed above.
        I opted to explore a different approach within the last several projects
        I've worked on, including <a href="https://trashed.today">trashed</a>{" "}
        and <a href="https://literal.io">Literal</a>.
      </p>
      <p>
        At its core, the idea is to take advantage of the existing GraphQL
        operations (i.e. Queries and Mutations) used to drive the product to
        scaffold a set of derivative analytics events. Although "autotrack"
        analytics implementations are not a new idea, most that I'm aware of are
        derive events from user interactions with the application interface,
        rather than application logic. Applications built on GraphQL provide us
        a structured interface into the latter.
      </p>
      <p>
        To enumerate some of the tradeoffs of this approach:
        <ul>
          <li>
            GraphQL is declarative. User actions are modeled as independent
            operations that closely match how a user is interacting with your
            application. For example, when a user views their homescreen, the
            application will trigger something like a{" "}
            <pre className="di">Query HomeScreen_v1</pre>. When the user takes
            an action that updates some state, the application will trigger
            something like a <pre className="di">Mutation NoteCreated_v1</pre>.
            Capturing, transforming, and reporting these operations as analytics
            events brings us close to a comprehensive tracking plan with little
            effort.
          </li>
          <li>
            By extending your applications core network layer logic, analytics
            events are always synchronized with product functionality. You can't
            break the analytics for a flow without breaking the flow itself.
          </li>
          <li>
            Not all user actions are captured as GraphQL operations, e.g. input
            focus events. This means you will have to either manually track
            these exceptions, or introduce a complementary typical UI-based
            autotrack approach.
          </li>
        </ul>
      </p>
      <p>
        The implementation today is a simple Apollo middleware component that
        looks like the following:
        <pre>{code1}</pre>
        This is combined with logic in the consumer to optionally transform the
        GraphQL operations before delivering them to your product analytics
        provider of choice.
      </p>
      <p>
        early results, next steps
      </p>
    </Content>
  </div>
);

export default AutomaticAnalytics;
