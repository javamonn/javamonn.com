import * as React from "react";
import Sidebar from "../components/sidebar";

import Head from "next/head";

const Index = () => (
  <>
    <Head>
      <title>javamonn</title>
    </Head>
    <div className="bg-white sans-serif vh-100 vw-100 relative">
      <Sidebar />
    </div>
  </>
);

export default Index;
