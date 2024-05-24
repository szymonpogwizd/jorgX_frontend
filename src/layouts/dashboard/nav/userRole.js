
import React, { useEffect, useState } from 'react';
import Nav from './Nav';

const ParentComponent = () => {
  const [userRole, setUserRole] = useState(null);
  const userId = 'your-user-id'; // Zastąp 'your-user-id' prawdziwym ID użytkownika

  useEffect(() => {
    fetch(`/dashboard/users/userTypes`)
      .then(response => response.json())
      .then(data => {
        setUserRole(data.role);
      });
  }, [userId]);

  return <Nav userRole={userRole} />;
};

export default ParentComponent;
