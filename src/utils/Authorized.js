import RenderAuthorized from '../components/Authorized';
import { getAuthority } from './authority';

// getAuthority() 方法时从localstorage中获取保存的权限
let Authorized = RenderAuthorized(getAuthority()); // eslint-disable-line

// Reload the rights component
const reloadAuthorized = () => {
    Authorized = RenderAuthorized(getAuthority());
};

export { reloadAuthorized };
export default Authorized;
