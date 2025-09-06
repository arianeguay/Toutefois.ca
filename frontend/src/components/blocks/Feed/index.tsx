import React from 'react';

const FEED_PAGE_ID = 'https://www.facebook.com/profile.php?id=100094501037202';
const Feed = React.memo((props) => {
  React.useEffect(() => {
    const script = document.createElement('script');

    script.src =
      'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v9.0&appId=your-app-id&autoLogAppEvents=1';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <React.Fragment>
      <div id="fb-root"></div>
      <div
        className="fb-page"
        data-href={FEED_PAGE_ID}
        data-tabs="timeline"
        data-width=""
        data-height=""
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="true"
        data-show-facepile="true"
      >
        <blockquote cite={FEED_PAGE_ID} className="fb-xfbml-parse-ignore">
          <a href={FEED_PAGE_ID}>Your Page</a>
        </blockquote>
      </div>
    </React.Fragment>
  );
});

export default Feed;
