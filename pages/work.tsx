import * as React from "react";

import Sidebar from "../components/sidebar";
import Content from "../components/content";

const projectItems = [
  {
    title: "trashed",
    href: "https://trashed.today",
    description:
      "trashed is a free, decentralized, and efficient peer-to-peer recycling system - like the “free stuff” section on craigslist, but for things that have already been thrown out. Distributed as a Progressive Web Application, utilizes ReasonML, React, Tailwind CSS, GraphQL, and AWS Amplify.",
  },
  {
    title: "Borges",
    href: "https://github.com/literal-io",
    description:
      "Browser based PDF reader distributed as a WebExtension. Implements a reader interface with features like zoom and search, document library management, and document augmentation features like optical character recognition and annotations. Supports a number of paying users. Utilizes ReasonML, React, JavaScript, TypeScript, Node.js, Clojure, CouchDB, and Kubernetes.",
  },
];

const experienceItems = [
  {
    title: "Technical Lead, BigSpring",
    date: "Jan 2019 - Present",
    headline:
      "In leading software engineering at BigSpring, I am responsible for the ideation and implementation of technology in service of business initiatives as well as overseeing management and growth of the engineering department.",
    bullets: [
      "Architected and led development of a Progressive Web Application serving over 500,000 users globally. Utilized React, TypeScript, Node.js, PostgreSQL, GraphQL, Apollo, AWS (Lambda, ECS, RDS, API Gateway).",
      "Represented engineering and product internally and externally. Internally, worked with sales and success department heads to align product functionality to client requirements. Externally, worked with clients and prospects to solution and guide integration and implementation of our product.",
      "As the first U.S. team hire, I led the growth of the engineering, design, and product teams and played a foundational role in establishing the culture of the organization.",
    ],
  },
  {
    title: "Senior Software Engineer, Postlight",
    date: "July 2016 - June 2018",
    headline:
      "Collaborated with small multi-disciplinary teams in a fast paced agency environment to develop products for clients ranging from early stage startups to Fortune 500 companies.",
    bullets: [
      "Architected and led development of an Android mobile application targeting the Indian market and optimized for low end device hardware and network conditions. Utilized React Native, Firebase, and Google Cloud Functions.",
      "Augmented external team to assist in development of a web-based email suite including systems for calendaring, contacts, and note-taking. Utilized Preact and implemented an Apollo GraphQL API layer resolved client-side in order to integrate with legacy SOAP APIs.",
      "Hired as Software Engineer and promoted into a Senior Software Engineer position.",
    ],
  },
  {
    title: "Chief Information Officer, MyFyx",
    date: "Jan 2015 - July 2016",
    headline:
      "In leading engineering, I was responsible for end to end product architecture and implementation for an early stage social music startup.",
    bullets: [
      "Architected and led development of iOS and Android mobile applications utilizing React Native. Implemented complex user facing features such as a collaborative filtering music recommender system and real time user to user chat.",
      "Architected and led development of backend services supporting the mobile applications utilizing Node.js, Nginx, Elasticsearch, Redis, MongoDB and Kubernetes.",
      "Hired as a Web Developer and promoted into a Chief Information Officer position, leading engineering.",
    ],
  },
];

const Section = ({ className = "", title, items, renderItem }) => (
  <div className={className}>
    <h3 className="i f4 lh-copy ma0 mb3">{title}</h3>
    <hr className="b--black" />
    {items.map(renderItem)}
  </div>
);

const Resume = () => (
  <div className="bg-white sans-serif vh-100 vw-100 flex">
    <Sidebar />
    <Content>
      <Section
        title={"Projects"}
        items={projectItems}
        className="mb5"
        renderItem={({ title, href, description }) => (
          <React.Fragment key={href}>
            <p className="f4 lh-copy">
              {title}
              <br />
              <a className="black" href={href}>
                {href}
              </a>
            </p>
            <p className="f4 lh-copy">{description}</p>
          </React.Fragment>
        )}
      />
      <Section
        title={"Experience"}
        items={experienceItems}
        renderItem={({ title, date, headline, bullets }) => (
          <React.Fragment key={title}>
            <p className="f4 lh-copy">
              {title}
              <br />
              {date}
            </p>
            <p className="f4 lh-copy">{headline}</p>
            <ul>
              {bullets.map((t) => (
                <li className="f4 lh-copy" key={t}>
                  {t}
                </li>
              ))}
            </ul>
          </React.Fragment>
        )}
      />
    </Content>
    <div />
  </div>
);

export default Resume;
