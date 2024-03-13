import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks"

export const useAuth = () => {
 let navigate = useNavigate();
 const auth = useAppSelector((state) => state.auth.user);

 useEffect(() => {
    const checkAuth = () => {
        if(!auth) {
            navigate('/')
        } else {
            navigate('/dashboard')
        }
    }
    checkAuth()
 }, [auth])
}