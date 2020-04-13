import * as React from 'react'

const Content = ({ children }) => (
  <div className="overflow-y-scroll absolute absolute--fill flex-auto flex justify-center">
    <div className="mw7">
      {children}
    </div>
  </div>
)

export default Content
