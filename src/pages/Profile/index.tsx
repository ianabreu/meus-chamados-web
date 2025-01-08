import { Button } from "../../components/Button";
import { useAuthStore } from "../../store/auth";

export default function Profile() {
  const { signOut } = useAuthStore();
  function handleLogout() {
    signOut();
  }
  return (
    <div>
      <Button onClick={handleLogout}>Sair Profile</Button>
    </div>
  );
}
