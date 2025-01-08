import { Link, LinkProps, useLocation } from "react-router-dom";
import "./styles-header.css";

type HeaderLinkProps = LinkProps;

export default function HeaderLink({ to, children, ...rest }: HeaderLinkProps) {
  const { pathname } = useLocation();

  return (
    <Link
      to={to}
      className={`sidebar-link ${to === pathname && "active"} `}
      {...rest}
    >
      {children}
    </Link>
  );
}
