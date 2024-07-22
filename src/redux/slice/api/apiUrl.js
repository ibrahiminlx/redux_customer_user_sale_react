export const BASE_URL='http://localhost:3999/api'

export const AUTH={
    CREATE:'/user',
    LOGIN:'/user/login',
}
export const SALES={
    ALL:'/sale',
    CREATE:'/sale',
    UPDATE:(id)=>`/sale/${id}`,
    DELETE:(id)=>`/sale/${id}`,
}
export const CUSTOMERS={
    ALL:'/customer',
    CREATE:'/customer',
    UPDATE:(id)=>`/customer/${id}`,
    DELETE:(id)=>`/customer/${id}`,
}

