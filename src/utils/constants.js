// export const BASEURL = "http://192.168.1.254:9091"

// export const 
export const BASEURL = "http://192.168.1.8:9091"
export const ImageURLAPI = "/api/admin/image-upload";

export const LoginAPI = {
    login: "/api/admin/login",
    resend_login_otp:"/api/admin/resend-otp",
    reset_Password_otp: "/api/admin/reset-password-otp",
    request_Password: "/api/admin/request-reset-otp",
    resend_reset_otp: "/api/admin/resend-reset-otp-pass",
}

export const DashboardAPI = {
    registeredPlayers: "/api/player/registered-count",
    totalWinningCoins: "/api/admin/game-winning-total-coins",
    onlinePlayers: "/api/player/online",
    recentRegistrations: "/api/player/latest-registrations",
    leaguePlayers: "/api/admin/league",
};

export const UserAPI={
    create_player:"/api/player/create",
    search_player:"/api/player/all?full_name=",
    get_all_players:"/api/player/all"
}

export const AssetAPI={
    create_asset:"/api/admin/assets/create",
    get_all_assets:"/api/admin/assets/all"
}

export const NotificationAPI={
    create_Notification:"/api/admin/notification/create",
    reuse_Notification:"/api/admin/notification/reuse/",
    get_all_notifications:"/api/admin/notification/all"
}

export const GameRulesAPI = {
    get_all: "/api/admin/game-management/all",
    update_game: "/api/admin/game-management/update"
}


export const ShopsAPI={
    get_all: "/api/admin/shop-package/all",

}


export const SettingsAPI={
    get_chest_reward:"/api/admin/chest-box",
    get_daily_reward:"/api/admin/daily-booster-reward/all",
    update_chest_reward: "/api/admin/chest-box/update",
    Update_daily_reward:"/api/admin/daily-booster-reward/update"
}


export const AdminProfileAPI={
    get_profile: "/api/admin",
    update_password:"/api/admin/change-password",
    update_admin:"/api/admin/update"
}