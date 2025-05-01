import NavBar from "../components/Navbar";

type NavBarProps = {
  onSignOut: () => void;
};

const NavigationBar = (props: NavBarProps) => {
  return (
    <div>
      <NavBar onSignOut={props?.onSignOut} />
    </div>
  );
};

export default NavigationBar;
