import React, { useEffect } from 'react';

const GoogleAd = ({ slotId }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsbygoogle error", e);
    }
  }, []); // Empty dependency array ensures it runs once on mount

  return (
    <ins className="adsbygoogle"
         style={{ display: 'block' }}
         data-ad-client="ca-pub-XXXXXXXXXXXXXXX"
         data-ad-slot={slotId}
         data-ad-format="auto"
         data-full-width-responsive="true">
    </ins>
  );
};
