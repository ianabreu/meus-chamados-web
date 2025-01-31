import "./styles-pagination.css";
import { BsSortAlphaDown, BsSortAlphaUp } from "react-icons/bs";

type Order = "asc" | "desc";

interface ToggleButtonProps {
  order: Order;
  onChangeOrder: (newOrder: Order) => void;
}
export function ToggleButton(props: ToggleButtonProps) {
  const toggleOrder = () => {
    props.onChangeOrder(props.order === "asc" ? "desc" : "asc");
  };
  return (
    <button className="toggle" onClick={toggleOrder}>
      {props.order === "asc" ? <BsSortAlphaDown /> : <BsSortAlphaUp />}
    </button>
  );
}
