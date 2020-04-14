import * as React from 'react'
import Sidebar from "../../components/sidebar";
import Content from "../../components/content";

export const title = "Automatic Analytics"
export const description = "Analytics within early stage products, like the product itself, are necessarily iterative. What if you could scaffold event reporting from the core business logic?"
export const date = "April 14 2020"

const AutomaticAnalytics = () => (
  <div className="flex flex-column justify-end pl5 pb5 h-100 z-1">
    <Sidebar />
    <Content className="pv5">
      
    </Content>
  </div>
)

export default AutomaticAnalytics
