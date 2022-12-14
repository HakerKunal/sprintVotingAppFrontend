import React  from "react";
import { useNavigate } from "react-router-dom";
import "./menu.css"
import { connect } from "react-redux";

const Menu=({is_superUser})=>{
    const navigate=useNavigate();

    return(
    <div className="menu--outter">
        <div className="menu--vote" onClick={()=>navigate("/dashboard")}>Vote</div>
        <div className="menu--result" onClick={()=>navigate("/result")}>Result</div>
        {is_superUser && <div className="menu--admin" onClick={()=>navigate("/admin")}>Admin Panel</div>}
        <div className="menu--view-past" onClick={()=>navigate("/past-results")}>View Past Results</div>

    </div>
    )
}
const mapStateToProps = (state) => {
    return {
      is_superUser: state.user.userObj.is_superuser,
    };
  };
export default connect(mapStateToProps)(Menu)