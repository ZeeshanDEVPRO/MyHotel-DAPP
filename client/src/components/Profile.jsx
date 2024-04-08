import React,{useEffect,useState}  from 'react'

const Profile = ({ account, contractIns, connectContract }) => {
  useEffect(() => {
    if (!account) {
      connectContract();
    }
  }, [account, connectContract]);

  return (
    <div className='mt-[14vh]'>

      {/* div1 */}
      <div className=''>
        <div>Personal Details</div>
        <div>
          <div>Name</div>
          <div>Email</div>
          <div>Mobile Number</div>
          <div>{account}</div>
        </div>
      </div>

      {/* div2 */}
      <div className=''>
        <div>All previous Bookings</div>
        <div>

        </div>
      </div>
    </div>
  )
}

export default Profile