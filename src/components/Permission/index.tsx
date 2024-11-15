import { Navigate } from 'react-router-dom'
const Permission: React.FC<{
    children: React.ReactNode,
    permissionCode: string
}> = ({
    children,
    permissionCode
}) => {
        const roles: string[] = []
        if (!roles.includes(permissionCode)) {
            return <Navigate to="/login" />
        }
        return children;
    };

export default Permission