import React, {Suspense} from "react";

function App() {
  //ensures the application performance
  const EngagementMessagesOverTime = React.lazy(() => import('./EngagementMessagesOverTime'));

  return (
    <div className="App">
      <Suspense fallback={'Graph is getting ready'}>
        <EngagementMessagesOverTime />
      </Suspense>
    </div>
  );
}

export default App;
