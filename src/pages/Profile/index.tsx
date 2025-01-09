import { FiSettings } from "react-icons/fi";
import Title from "../../components/Title";
// import { useAuthStore } from "../../store/auth";

export default function Profile() {
  // const { signOut } = useAuthStore();
  // function handleLogout() {
  //   signOut();
  // }
  return (
    <div>
      <Title icon={<FiSettings size={25} />}>Meu Perfil</Title>
    </div>
  );
}
