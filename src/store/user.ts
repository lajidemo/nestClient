import { createModel } from 'hox';
import { useState } from 'react';

function useUser() {
  const [userInfo, setUserInfo] = useState({});
  return {
    userInfo,
    setUserInfo,
  };
}

export default createModel(useUser);
