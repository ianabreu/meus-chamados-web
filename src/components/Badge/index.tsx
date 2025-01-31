import "./styles-badge.css";
const BADGE_COLOR = {
  success: { text: "#0b3c1a", bg: "#b8dfc6" },
  warning: { text: "#5e400d", bg: "#fbffc7" },
  danger: { text: "#823127", bg: "#fee3de" },
  default: { text: "#254574", bg: "#c4e9fa" },
} as const;

export function Badge({
  children,
  action = "default",
}: {
  children?: string;
  action?: keyof typeof BADGE_COLOR;
}) {
  return (
    <span
      className="badge"
      style={{
        backgroundColor: BADGE_COLOR[action].bg,
        color: BADGE_COLOR[action].text,
      }}
    >
      {children}
    </span>
  );
}
