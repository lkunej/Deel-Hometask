import './styles/Navbar.css';

const Navbar = ({onSelectedChange, currentProfile, profiles}) => {

  var renderedProfiles = []

  if(profiles){
    renderedProfiles = profiles.map((profile,idx) => {
      return (
        <a key={idx} onClick={(e) => onSelectedChange(profile)} className="dropdown-item" href="#nowhere">{profile.firstName} {profile.lastName} ({profile.type})</a>
      );
    });
  }

  var currentUserLable = "";
  var balanceLable = "";
  if(currentProfile){
    currentUserLable += currentProfile.firstName +" "+ currentProfile.lastName +" ("+ currentProfile.type +")";
    balanceLable = "Balance: " + Math.round((currentProfile.balance + Number.EPSILON) * 100) / 100;
  } else {
    currentUserLable = "Choose Profile";
  }

  return(
    <nav className="navbar navbar-fixed-top navbar-expand-lg navbar-light bg-light">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="profileDropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {currentUserLable}
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {renderedProfiles}
          </div>
        </div>
        <h2 className="pl-3">
         {balanceLable}$
        </h2>
        <ul className="navbar-nav ml-auto navbar-right">
          <li className="nav-item dropdown">

          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
