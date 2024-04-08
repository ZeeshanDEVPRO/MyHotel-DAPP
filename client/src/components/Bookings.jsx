import React, { useEffect } from 'react';

const Bookings = ({ account, contractIns, connectContract }) => {

  useEffect(() => {
    if (!account) {
      connectContract();
    }
  }, [account, connectContract]);

  return (
    <div className='mt-[14vh] '>

      {/* div1 */}
      <div>
        <div>All Bookings</div>
      </div>

      {/* div2 */}
      <div>
        <div>Check Availability</div>
      </div>

    </div>
  );
};

export default Bookings;
