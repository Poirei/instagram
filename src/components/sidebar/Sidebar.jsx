import { useUser } from '../../hooks/use-user';
import Suggestions from './Suggestions';
import User from './User';

const Sidebar = () => {
  const {
    user: { fullName, username, userId },
  } = useUser();

  return (
    <div className="p-4">
      <User />
      <Suggestions />
    </div>
  );
};

export default Sidebar;
