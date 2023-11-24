import BranchOrderList from "./branchOrderListPage"
import SuperOrderList from "./superOrderListPage"
import { useSelector } from "react-redux";




const AdminOrderList = () => {

    const role = useSelector((state) => state.users.role);

    console.log(role);

    return (
        <div>
            {role == "admin" ? <BranchOrderList /> : null}
            {role == "superadmin" ? <SuperOrderList /> : null}
        </div>
    )

}
export default AdminOrderList