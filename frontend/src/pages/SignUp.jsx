import React from 'react';
import bg from "../assets/image.png"

function SignUp() {
  return (
    <div
      className="w-full h-[100vh] bg-cover flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
      
    >
      <from className='w-[90%] h-[600px] max-w-[500px] bg-[black] backdrop-blur-md'></from>
    </div>
  );
}
export default SignUp;