import { SERVER_API } from '../config'; 

 

export async function fetchCategories ( ) { 
    const response = await fetch(`${SERVER_API}/categories`);
    return response.json();    
}
