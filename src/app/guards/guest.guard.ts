import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { AuthService } from "../services/auth/auth-service"


export const GuestGuard=()=>{
    const auth=inject(AuthService)
    const router=inject(Router)

    if(auth.isLoggedIn()){
        router.navigate(["/envios"]
        )

        return false
    }

    return true
}