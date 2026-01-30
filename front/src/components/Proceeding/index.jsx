import React from 'react';
import Navbar from '../Common/Navbar';
import Itempanel from '../Common/Itempanel';

const index = () => {
  return (
    <div className="page_section">
      <Navbar />
      <Itempanel pageTitle="Incompleted Items" />
    </div>
  );
};

export default index;
