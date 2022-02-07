import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, MenuItem } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem, faHeart, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';


function React_sidebar(){
    return(
        <div>
            <ProSidebar>
                <SidebarHeader>
                    <FontAwesomeIcon icon={faExclamationTriangle}/>
                </SidebarHeader>
                <SidebarContent>
                    <MenuItem><FontAwesomeIcon icon={faGem}/> Dashboard</MenuItem>
                </SidebarContent>
                <SidebarFooter>
                    <p><small>Foother</small></p>
                </SidebarFooter>
            </ProSidebar>
        </div>
    )
}
export default React_sidebar;