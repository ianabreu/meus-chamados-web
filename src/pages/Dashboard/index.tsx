import { Button } from "../../components/Button";
import { useAuthStore } from "../../store/auth";

export default function Dashboard() {
  const { user, signOut } = useAuthStore();
  console.log(user);
  function handleLogout() {
    signOut();
  }
  return (
    <div>
      {user?.name}
      <Button onClick={handleLogout}>Sair</Button>
    </div>
  );
}
